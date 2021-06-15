package keeper

import (
	"context"
	"encoding/json"
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/oraichain/orai/x/airequest/types"
)

type msgServer struct {
	keeper *Keeper
}

// NewMsgServerImpl returns an implementation of the bank MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper *Keeper) types.MsgServer {
	return &msgServer{keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) CreateAIRequest(goCtx context.Context, msg *types.MsgSetAIRequest) (*types.MsgSetAIRequestRes, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// validate if the oracle script exists or not
	if !k.keeper.providerKeeper.HasOracleScript(ctx, msg.OracleScriptName) {
		return nil, types.ErrOScriptNotFound
	}

	// validate if the request id exists or not
	if k.keeper.HasAIRequest(ctx, msg.RequestID) {
		return nil, sdkerrors.Wrap(types.ErrRequestInvalid, "The request id already exists")
	}

	validators, err := k.keeper.RandomValidators(ctx, int(msg.ValidatorCount), []byte(msg.RequestID))
	if err != nil {
		return nil, sdkerrors.Wrap(types.ErrCannotRandomValidators, err.Error())
	}

	// check size of the request
	maxBytes := int(k.keeper.GetParam(ctx, types.KeyMaximumRequestBytes))
	// threshold for the size of the request
	if len(msg.ExpectedOutput)+len(msg.Input) > maxBytes {
		return nil, sdkerrors.Wrap(types.ErrRequestInvalid, "The request is too large")
	}

	// we can safely parse fees to coins since we have validated it in the Msg already
	providedFees, _ := sdk.ParseCoinsNormalized(msg.Fees)

	// get data source and test case names from the oracle script
	aiDataSources, testCases, requiredFees, err := k.keeper.providerKeeper.GetDsTc(ctx, msg.OracleScriptName, int(msg.GetValidatorCount()))
	if err != nil {
		return nil, err
	}
	k.keeper.Logger(ctx).Info(fmt.Sprintf("required fees needed: %v\n", requiredFees))
	// check if the account has enough spendable coins
	spendableCoins := k.keeper.bankKeeper.SpendableCoins(ctx, msg.Creator)

	// If the total fee is larger than the fee provided by the user then we return error
	if providedFees.IsAllLT(requiredFees) {
		k.keeper.Logger(ctx).Error(fmt.Sprintf("Your payment fees is less than required\n"))
		return nil, sdkerrors.Wrap(types.ErrNeedMoreFees, fmt.Sprintf("Fees given: %v, where fees required is: %v", providedFees, requiredFees))
	}
	// If the total fee is larger or equal to the spendable coins of the user then we return error
	if requiredFees.IsAnyGTE(spendableCoins) || providedFees.IsAnyGTE(spendableCoins) {
		k.keeper.Logger(ctx).Error(fmt.Sprintf("Your account has run out of tokens to create the AI Request\n"))
		return nil, sdkerrors.Wrap(types.ErrNeedMoreFees, "Your account has run out of tokens to create the AI Request")
	}

	// substract coins in the creator wallet to charge fees
	err = k.keeper.bankKeeper.SubtractCoins(ctx, msg.Creator, providedFees)
	if err != nil {
		return nil, sdkerrors.Wrap(types.ErrNeedMoreFees, fmt.Sprintf("Your account has run out of tokens to create the AI Request, or there is something wrong with error: %v", err))
	}

	// set a new request with the aggregated result into blockchain
	request := types.NewAIRequest(msg.RequestID, msg.OracleScriptName, msg.Creator, validators, ctx.BlockHeight(), providedFees, msg.Input, msg.ExpectedOutput, aiDataSources, testCases)

	k.keeper.SetAIRequest(ctx, request.RequestID, request)

	requestBytes, err := json.Marshal(request)
	if err != nil {
		return nil, sdkerrors.Wrap(types.ErrRequestInvalid, fmt.Sprintf("Cannot marshal request %v with error: %v", request, err))
	}

	event := sdk.NewEvent(types.EventTypeRequestWithData)
	event = event.AppendAttributes(
		sdk.NewAttribute(types.AttributeRequest, string(requestBytes)),
	)

	// this attribute is used to filter quicker using websocket params
	for _, validator := range validators {
		event = event.AppendAttributes(
			sdk.NewAttribute(types.AttributeRequestValidator, validator.String()),
		)
	}

	ctx.EventManager().EmitEvent(event)

	return types.NewMsgSetAIRequestRes(
		request.GetRequestID(), request.GetOracleScriptName(),
		request.GetCreator(), request.GetFees().String(), msg.GetValidatorCount(),
		request.GetInput(), request.GetExpectedOutput(),
	), nil
}
