package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/oraichain/orai/x/provider"
)

// NewAIRequest is the constructor of the ai request struct
func NewAIRequest(
	requestID string,
	oscriptName string,
	creator sdk.AccAddress,
	validators []sdk.ValAddress,
	blockHeight int64,
	fees sdk.Coins,
	input []byte,
	expectedOutput []byte,
	dSources []provider.AIDataSource, tCases []provider.TestCase,
) *AIRequest {
	return &AIRequest{
		RequestID:        requestID,
		OracleScriptName: oscriptName,
		Creator:          creator,
		Validators:       validators,
		BlockHeight:      blockHeight,
		Fees:             fees,
		Input:            input,
		ExpectedOutput:   expectedOutput,
		AiDataSources:    dSources,
		TestCases:        tCases,
	}
}

// NewMsgSetAIRequest is a constructor function for NewMsgSetAIRequest
func NewMsgSetAIRequest(requestID string, oscriptName string, creator sdk.AccAddress, fees string, valCount int64, input []byte, expectedOutput []byte) *MsgSetAIRequest {
	return &MsgSetAIRequest{
		RequestID:        requestID,
		OracleScriptName: oscriptName,
		Creator:          creator,
		ValidatorCount:   valCount,
		Fees:             fees,
		Input:            input,
		ExpectedOutput:   expectedOutput,
	}
}

// NewMsgSetAIRequestRes is a constructor function for NewMsgSetAIRequestRes
func NewMsgSetAIRequestRes(requestID string, oscriptName string, creator sdk.AccAddress, fees string, valCount int64, input []byte, expectedOutput []byte) *MsgSetAIRequestRes {
	return &MsgSetAIRequestRes{
		RequestID:        requestID,
		OracleScriptName: oscriptName,
		Creator:          creator,
		ValidatorCount:   valCount,
		Fees:             fees,
		Input:            input,
		ExpectedOutput:   expectedOutput,
	}
}

// NewQueryAIRequestRes is the constructor for the QueryAIRequestRes
func NewQueryAIRequestRes(requestID string, oscriptName string, creator sdk.AccAddress, fees sdk.Coins, validators []sdk.ValAddress, blockHeight int64, dSources []provider.AIDataSource, tCases []provider.TestCase, input []byte, expectedOutput []byte) *QueryAIRequestRes {
	return &QueryAIRequestRes{
		RequestId:        requestID,
		OracleScriptName: oscriptName,
		Creator:          creator,
		Validators:       validators,
		BlockHeight:      blockHeight,
		Fees:             fees,
		Input:            input,
		Output:           expectedOutput,
		AiDataSources:    dSources,
		TestCases:        tCases,
	}
}

// NewGenesisState creates a new GenesisState object
func NewGenesisState(aiRequests []AIRequest, params Params) GenesisState {
	return GenesisState{
		// TODO: Fill out according to your genesis state
		AIRequests: aiRequests,
		Params:     params,
	}
}
