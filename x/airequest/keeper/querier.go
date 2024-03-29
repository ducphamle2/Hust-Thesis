package keeper

import (
	"context"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	"github.com/oraichain/orai/x/airequest/types"
)

// Querier is used as Keeper will have duplicate methods if used directly, and gRPC names take precedence over keeper
type Querier struct {
	keeper *Keeper
}

// NewQuerier return querier implementation
func NewQuerier(keeper *Keeper) *Querier {
	return &Querier{keeper: keeper}
}

var _ types.QueryServer = &Querier{}

// QueryAIRequest implements the Query/QueryAIRequest gRPC method
func (k *Querier) QueryAIRequest(goCtx context.Context, req *types.QueryAIRequestReq) (*types.QueryAIRequestRes, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	aiRequest, err := k.keeper.GetAIRequest(ctx, req.GetRequestId())
	if err != nil {
		return nil, sdkerrors.Wrap(types.ErrRequestNotFound, err.Error())
	}

	return types.NewQueryAIRequestRes(
		aiRequest.GetRequestID(), aiRequest.GetOracleScriptName(),
		aiRequest.GetCreator(), aiRequest.GetFees(),
		aiRequest.GetValidators(), aiRequest.GetBlockHeight(),
		aiRequest.GetAiDataSources(), aiRequest.GetTestCases(),
		aiRequest.GetInput(), aiRequest.GetExpectedOutput(),
	), nil
}

// QueryAIRequestIDs implements the Query/QueryAIRequestIDs gRPC method
func (k *Querier) QueryAIRequestIDs(goCtx context.Context, req *types.QueryAIRequestIDsReq) (*types.QueryAIRequestIDsRes, error) {

	var requestIDs []string
	var count int64

	ctx := sdk.UnwrapSDKContext(goCtx)
	iterator := k.keeper.GetPaginatedAIRequests(ctx, uint(req.Page), uint(req.Limit))

	for ; iterator.Valid(); iterator.Next() {
		count += 1
		requestIDs = append(requestIDs, string(iterator.Key()))
	}

	return &types.QueryAIRequestIDsRes{
		RequestIds: requestIDs,
		Total:      count,
	}, nil
}
