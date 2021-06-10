package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	airequest "github.com/oraichain/orai/x/airequest/types"
	"github.com/oraichain/orai/x/airesult/types"
	websocket "github.com/oraichain/orai/x/websocket/types"
)

// ResolveRequestsFromReports handles the reports received in a block to group all the validators, data source owners and test case owners
func (k Keeper) ResolveRequestsFromReports(ctx sdk.Context, rep *websocket.Report, reward *types.Reward, blockHeight int64, rewardPercentage int64) (bool, int) {

	req, _ := k.aiRequestKeeper.GetAIRequest(ctx, rep.GetRequestId())
	validation := k.validateBasic(ctx, req, rep, blockHeight)
	// if the report cannot pass the validation basic then we skip the rest
	if !validation {
		return false, 0
	}

	var providerFees sdk.Coins

	// collect data source owners that have their data sources executed to reward
	for i, dataSourceResult := range rep.GetDataSourceResults() {
		if dataSourceResult.GetStatus() == k.webSocketKeeper.GetKeyResultSuccess() {
			reward.DataSourceNames = append(reward.DataSourceNames, dataSourceResult.GetName())
			dSourceFees := req.GetAiDataSources()[i].GetFees()
			reward.ListDSourceFees = append(reward.ListDSourceFees, &types.DataSourceFees{Fees: dSourceFees})
			providerFees.Add(req.GetAiDataSources()[i].GetFees()...)
		}
	}

	// collect data source owners that have their data sources executed to reward
	for i, testCaseResult := range rep.GetTestCaseResults() {
		if testCaseResult.GetStatus() == k.webSocketKeeper.GetKeyResultSuccess() {
			reward.TestCaseNames = append(reward.TestCaseNames, testCaseResult.GetName())
			tCaseFees := req.GetTestCases()[i].GetFees()
			reward.ListTCaseFees = append(reward.ListTCaseFees, &types.TestCaseFees{Fees: tCaseFees})
			providerFees.Add(req.GetTestCases()[i].GetFees()...)
		}
	}
	// change reward ratio to the ratio of validator
	// 0.6 by default, 2 decimals for percentage
	percentageDec := k.providerKeeper.GetPercentageDec(rewardPercentage)
	rewardRatio := sdk.NewDecWithPrec(int64(100), 2).Sub(percentageDec)

	// reward = 1 - oracle reward percentage × (data source fees + test case fees)
	valFees, _ := sdk.NewDecCoinsFromCoins(providerFees...).MulDec(rewardRatio).TruncateDecimal()
	// add validator fees into the total fees of all validators
	reward.ValidatorFees = reward.ValidatorFees.Add(valFees...)
	// store information into the reward struct to reward these entities in the next begin block
	valAddress := rep.GetReporter().GetValidator()

	// collect validator current status
	val := k.stakingKeeper.Validator(ctx, valAddress)
	// create a new validator wrapper and append to reward obj
	validator := k.webSocketKeeper.NewValidator(valAddress, val.GetConsensusPower(), val.GetStatus().String())
	reward.Validators = append(reward.Validators, *validator)

	// return boolean and length of validator list to resolve result
	return true, len(req.GetValidators())
}

func (k Keeper) validateBasic(ctx sdk.Context, req *airequest.AIRequest, rep *websocket.Report, blockHeight int64) bool {
	// if the request has been expired
	// if req.GetBlockHeight()+int64(k.GetParam(ctx, types.KeyExpirationCount)) < blockHeight {
	// 	//TODO: NEED TO HANDLE THE EXPIRED REQUEST.
	// 	fmt.Println("Request has been expired")
	// 	k.ResolveExpiredRequest(ctx, req.GetRequestID())
	// 	return false
	// }

	if rep.ResultStatus == websocket.ResultFailure {
		k.Logger(ctx).Error("result status is fail")
		return false
	}

	// Count the total number of data source results to see if it matches the requested data sources
	if len(rep.GetDataSourceResults()) != len(req.GetAiDataSources()) {
		k.Logger(ctx).Error("data source result length is different")
		return false
	}

	// Count the total number of test case results to see if it matches the requested test cases
	if len(rep.GetTestCaseResults()) != len(req.GetTestCases()) {
		k.Logger(ctx).Error("test case result length is different")
		return false
	}

	// Check if validator exists and active
	_, isExist := k.stakingKeeper.GetValidator(ctx, rep.GetReporter().GetValidator())
	if !isExist {
		k.Logger(ctx).Error(fmt.Sprintf("error in validating the report: validator does not exist"))
		return false
	}

	// // check if validator is bonded or not
	// if isBonded := validator.IsBonded(); !isBonded {
	// 	k.Logger(ctx).Error(fmt.Sprintf("error in validating the report: validator is not bonded, cannot send reports to receive rewards"))
	// 	return false
	// }

	// TODO
	isContain := k.webSocketKeeper.ContainsValidator(req.GetValidators(), rep.Reporter.Validator)
	if !isContain {
		k.Logger(ctx).Error(fmt.Sprintf("Validator is not in the request list"))
		return false
	}
	return true
}
