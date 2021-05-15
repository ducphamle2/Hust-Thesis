package keeper

import (
	//"fmt"

	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	distr "github.com/cosmos/cosmos-sdk/x/distribution/types"
	"github.com/oraichain/orai/x/airesult/types"
	"github.com/oraichain/orai/x/provider"
	abci "github.com/tendermint/tendermint/abci/types"
)

// AllocateTokens allocates the tokens to the validators that participate in the AI request handling
func (k Keeper) AllocateTokens(ctx sdk.Context, prevVotes []abci.VoteInfo, blockHeight int64) {
	// get reward from the previous block
	rewardObj, err := k.GetReward(ctx, blockHeight-1)
	// If there's no reward in the previous block, then we do not handle
	if err != nil || rewardObj.BlockHeight == int64(-1) {
		return
	}

	// retrieve fee collector module account to prepare token allocation1
	feeCollector := k.authKeeper.GetModuleAccount(ctx, k.feeCollectorName)
	// collect fees from the provider and validator
	feesCollected, dsFees, tcFees, dsOwners, tcOwners := k.CollectProviderInformation(ctx, rewardObj)
	feesCollected = feesCollected.Add(rewardObj.ValidatorFees...)
	reward := sdk.NewDecCoinsFromCoins(feesCollected...)
	// append those coins into the fee collector to get ready allocating them to the distr module.
	err = k.bankKeeper.AddCoins(ctx, feeCollector.GetAddress(), feesCollected)
	if err != nil {
		k.Logger(ctx).Error(fmt.Sprintf("error adding coins using bank keeper: %v\n", err.Error()))
		return
	}
	remaining := reward
	hasNeg := false

	//Allocate non-community pool tokens to active validators weighted by voting power.
	// reward for test cases that contribute
	for i, tcFee := range tcFees {

		// safesub to prevent panic
		remaining, hasNeg = remaining.SafeSub(sdk.NewDecCoinsFromCoins(tcFee...))
		if hasNeg {
			k.Logger(ctx).Error(fmt.Sprintf("not enough balance to reward test case"))
			return
		}

		// send coins to test case owner addresses
		temp := k.bankKeeper.GetBalance(ctx, tcOwners[i], provider.Denom)
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, k.feeCollectorName, tcOwners[i], tcFee)
		rewardCollected := k.bankKeeper.GetBalance(ctx, tcOwners[i], provider.Denom).Sub(temp)
		k.Logger(ctx).Info(fmt.Sprintf("Reward collected for the following address %v - %v\n", tcOwners[i].String(), rewardCollected))
	}

	// reward for test cases that contribute
	for i, dsFee := range dsFees {

		// safesub to prevent panic
		remaining, hasNeg = remaining.SafeSub(sdk.NewDecCoinsFromCoins(dsFee...))
		if hasNeg {
			k.Logger(ctx).Error(fmt.Sprintf("not enough balance to reward data source"))
			return
		}

		// send coins to data source owner addresses
		temp := k.bankKeeper.GetBalance(ctx, dsOwners[i], provider.Denom)
		k.bankKeeper.SendCoinsFromModuleToAccount(ctx, k.feeCollectorName, dsOwners[i], dsFee)
		rewardCollected := k.bankKeeper.GetBalance(ctx, dsOwners[i], provider.Denom).Sub(temp)
		k.Logger(ctx).Info(fmt.Sprintf("Reward collected for the following address %v - %v\n", dsOwners[i].String(), rewardCollected))

	}
	// reward for the validators that contribute in the ai request test
	// transfer collected fees to the distribution module account to distribute the oracle rewards to the validators. Note that if we transfer all the transaction fees, then other modules won't be able to handle allocation

	decValLen := sdk.NewDec(int64(len(rewardObj.Validators)))
	var decTotalPower sdk.Dec
	for _, validator := range rewardObj.GetValidators() {
		decTotalPower = decTotalPower.Add(sdk.NewDec(validator.VotingPower))
	}

	// fix check division by zero, no validator or zero total power
	if decValLen.IsZero() || decValLen.IsZero() {
		k.Logger(ctx).Error(fmt.Sprintf("total power zero\n"))
		return
	}

	for _, val := range rewardObj.Validators {
		powerFraction := sdk.NewDec(val.GetVotingPower()).QuoTruncate(decTotalPower)
		// since validator fees here is the sum of all validator fees, so we need to divide with total number of validators to get fees for one validator.
		valRewardDec := sdk.NewDecCoinsFromCoins(rewardObj.ValidatorFees...).QuoDec(decValLen).MulDec(powerFraction)

		// safesub to prevent panic
		remaining, hasNeg = remaining.SafeSub(valRewardDec)
		if hasNeg {
			k.Logger(ctx).Error(fmt.Sprintf("not enough balance to reward validator :%v, \n", val.GetAddress()))
			return
		}

		valRewardInt, _ := valRewardDec.TruncateDecimal()
		err = k.bankKeeper.SendCoinsFromModuleToModule(ctx, k.feeCollectorName, distr.ModuleName, valRewardInt)
		if err != nil {
			k.Logger(ctx).Error(fmt.Sprintf("error in sending coins from fee collector to distrution module: %v\n", err.Error()))
			return
		}
		// allocate tokens to validator with a specific commission
		k.distrKeeper.AllocateTokensToValidator(ctx, k.stakingKeeper.Validator(ctx, val.GetAddress()), valRewardDec)
		k.Logger(ctx).Info(fmt.Sprintf("outstanding reward of validator %v - %v\n", val.GetAddress().String(), k.distrKeeper.GetValidatorAccumulatedCommission(ctx, val.GetAddress())))

	}

	// allocate community funding
	feePool := k.distrKeeper.GetFeePool(ctx)
	feePool.CommunityPool = feePool.CommunityPool.Add(remaining...)
	k.distrKeeper.SetFeePool(ctx, feePool)
	k.Logger(ctx).Info("finish allocating tokens")
}

func (k Keeper) CollectProviderInformation(ctx sdk.Context, reward *types.Reward) (sdk.Coins, []sdk.Coins, []sdk.Coins, []sdk.AccAddress, []sdk.AccAddress) {
	// collect data source fees
	var feesCollected sdk.Coins
	var dsFees, tcFees []sdk.Coins
	var dsOwners, tcOwners []sdk.AccAddress
	for i, dSourceName := range reward.GetDataSourceNames() {
		dSource, err := k.providerKeeper.GetAIDataSource(ctx, dSourceName)
		// if error then we skip this data source reward
		if err != nil {
			continue
		}
		dSourceFees, err := sdk.ParseCoinsNormalized(reward.GetDataSourceFees()[i])
		if err != nil {
			continue
		}
		feesCollected = feesCollected.Add(dSourceFees...)
		dsFees = append(dsFees, dSourceFees)
		dsOwners = append(dsOwners, dSource.GetOwner())
	}
	// collect data source fees
	for i, tCaseName := range reward.GetTestCaseNames() {
		tCase, err := k.providerKeeper.GetTestCase(ctx, tCaseName)
		// if error then we skip this test case reward
		if err != nil {
			continue
		}
		tCaseFees, err := sdk.ParseCoinsNormalized(reward.GetTestCaseFees()[i])
		if err != nil {
			continue
		}
		feesCollected = feesCollected.Add(tCaseFees...)
		tcFees = append(tcFees, tCaseFees)
		tcOwners = append(tcOwners, tCase.GetOwner())
	}
	return feesCollected, dsFees, tcFees, dsOwners, tcOwners
}
