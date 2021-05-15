package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	airequest "github.com/oraichain/orai/x/airequest/types"
	websocket "github.com/oraichain/orai/x/websocket/types"
)

// NewAIRequestResult is a constructor for the ai request result struct
func NewAIRequestResult(
	requestID string,
	status string,
	resultLength uint64,
) *AIRequestResult {
	return &AIRequestResult{
		RequestID:    requestID,
		Status:       status,
		ResultLength: resultLength,
	}
}

func NewQueryFullRequestRes(
	aiRequest airequest.AIRequest,
	reports []websocket.Report,
	result AIRequestResult,
) *QueryFullRequestRes {
	return &QueryFullRequestRes{
		AIRequest: aiRequest,
		Reports:   reports,
		Result:    result,
	}
}

func NewQueryRewardRes(
	reward Reward,
) *QueryRewardRes {
	return &QueryRewardRes{
		Reward: reward,
	}
}

// NewReward is a constructor for the reward struct
func NewReward(
	validators []websocket.Validator,
	blockHeight int64,
	dsNames, tcNames []string,
	dsFees, tcFees sdk.Coins, validatorFees sdk.Coins,
) *Reward {
	return &Reward{
		Validators:      validators,
		BlockHeight:     blockHeight,
		DataSourceNames: dsNames,
		TestCaseNames:   tcNames,
		ValidatorFees:   validatorFees,
	}
}

// DefaultReward is a default value init for the reward struct
func DefaultReward(blockHeight int64) *Reward {
	return &Reward{
		Validators:      make([]websocket.Validator, 0),
		BlockHeight:     blockHeight,
		TestCaseNames:   nil,
		DataSourceNames: nil,
		ListDSourceFees: []*DataSourceFees{},
		ListTCaseFees:   []*TestCaseFees{},
	}
}

// NewGenesisState creates a new GenesisState object
func NewGenesisState(aiResults []AIRequestResult, params Params) *GenesisState {
	return &GenesisState{
		// TODO: Fill out according to your genesis state
		AIRequestResults: aiResults,
		Params:           params,
	}
}
