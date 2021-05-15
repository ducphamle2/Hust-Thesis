package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/oraichain/orai/x/airesult/types"
	websocket "github.com/oraichain/orai/x/websocket/types"
)

// ResolveResult aggregates the results from the reports before storing it into the blockchain
func (k Keeper) ResolveResult(ctx sdk.Context, rep *websocket.Report, valCount int, totalReportPercentage int64) {

	id := rep.GetRequestID()
	if valCount == 1 {
		k.SetResult(ctx, id, types.NewAIRequestResult(id, types.RequestStatusFinished, 1))
		return
	}
	var result *types.AIRequestResult
	if !k.HasResult(ctx, id) {
		result = types.NewAIRequestResult(rep.GetRequestID(), types.RequestStatusPending, 0)
	} else {
		result, _ = k.GetResult(ctx, rep.GetRequestID())
	}
	result.ResultLength += 1

	// check if there are enough results from the validators or not
	ratio := sdk.NewDecWithPrec(totalReportPercentage, 2)

	// the number of reports that the user requires
	reportLengths := sdk.NewDec(int64(valCount))

	// the threshold that the length of the result must pass
	threshold := reportLengths.Mul(ratio)

	// the actual result length
	resultLengths := sdk.NewDec(int64(result.ResultLength))

	// if the result length is GTE the threshold then the result is valid, and considered finished
	if resultLengths.GTE(threshold) {
		result.Status = types.RequestStatusFinished
	}
	// store the result
	k.SetResult(ctx, id, result)
}

// HasResult checks if a given request has result or not
func (k Keeper) HasResult(ctx sdk.Context, reqID string) bool {
	store := ctx.KVStore(k.storeKey)
	return store.Has(types.ResultStoreKey(reqID))
}

// GetResult returns the result of a given request
func (k Keeper) GetResult(ctx sdk.Context, reqID string) (*types.AIRequestResult, error) {
	store := ctx.KVStore(k.storeKey)
	var result types.AIRequestResult
	err := k.cdc.UnmarshalBinaryBare(store.Get(types.ResultStoreKey(reqID)), &result)
	if err != nil {
		return &types.AIRequestResult{}, err
	}
	return &result, nil
}

// SetResult allows users to set a result into the store
func (k Keeper) SetResult(ctx sdk.Context, reqID string, result *types.AIRequestResult) error {
	store := ctx.KVStore(k.storeKey)

	bz, err := k.cdc.MarshalBinaryBare(result)
	store.Set(types.ResultStoreKey(reqID), bz)
	return err
}
