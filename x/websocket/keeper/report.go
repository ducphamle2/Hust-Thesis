package keeper

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/oraichain/orai/x/websocket/types"
)

// HasReport checks if the report of this ID triple exists in the storage.
func (k Keeper) HasReport(ctx sdk.Context, id string, val sdk.ValAddress) bool {
	return ctx.KVStore(k.storeKey).Has(types.ReportStoreKey(id, string(val[:])))
}

// SetReport saves the report to the storage without performing validation.
func (k Keeper) SetReport(ctx sdk.Context, id string, rep *types.Report) error {
	bz, err := k.cdc.MarshalBinaryBare(rep)
	if err != nil {
		return err
	}
	ctx.KVStore(k.storeKey).Set(types.ReportStoreKey(id, string(rep.Reporter.Validator[:])), bz)
	return nil
}

// GetReportIterator returns the iterator for all reports of the given request ID.
func (k Keeper) GetReportIterator(ctx sdk.Context, rid string) sdk.Iterator {
	return sdk.KVStorePrefixIterator(ctx.KVStore(k.storeKey), types.ReportStoreKeyPrefix(rid))
}

// GetReportCount returns the number of reports for the given request ID.
func (k Keeper) GetReportCount(ctx sdk.Context, rid string) (count uint64) {
	iterator := k.GetReportIterator(ctx, rid)
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		count++
	}
	return count
}

// GetReports returns all reports for the given request ID, or nil if there is none.
func (k Keeper) GetReports(ctx sdk.Context, rid string) (reports []types.Report) {
	iterator := k.GetReportIterator(ctx, rid)
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var rep types.Report
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &rep)
		reports = append(reports, rep)
	}
	return reports
}

// GetReportsBlockHeight returns all reports for the given block height, or nil if there is none.
func (k Keeper) GetReportsBlockHeight(ctx sdk.Context, blockHeight int64) (reports []types.Report) {
	iterator := sdk.KVStorePrefixIterator(ctx.KVStore(k.storeKey), types.ReportStoreKeyPrefixAll())
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var rep types.Report
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &rep)
		// check if block height is equal or not
		if rep.GetBlockHeight() == blockHeight {
			reports = append(reports, rep)
		}
	}
	return reports
}

// DeleteReports removes all reports for the given request ID.
func (k Keeper) DeleteReports(ctx sdk.Context, rid string) {
	var keys [][]byte
	iterator := k.GetReportIterator(ctx, rid)
	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		keys = append(keys, iterator.Key())
	}
	for _, key := range keys {
		ctx.KVStore(k.storeKey).Delete(key)
	}
}

// GetAllReports returns all the reports of every requests ever
func (k Keeper) GetAllReports(ctx sdk.Context) (reports []types.Report) {
	iterator := sdk.KVStorePrefixIterator(ctx.KVStore(k.storeKey), types.ReportStoreKeyPrefixAll())

	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var rep types.Report
		k.cdc.MustUnmarshalBinaryBare(iterator.Value(), &rep)
		reports = append(reports, rep)
	}
	return reports
}

// containsVal returns whether the given slice of validators contains the target validator.
func (k Keeper) ContainsValidator(vals []sdk.ValAddress, target sdk.ValAddress) bool {
	for _, val := range vals {
		if val.Equals(target) {
			return true
		}
	}
	return false
}
