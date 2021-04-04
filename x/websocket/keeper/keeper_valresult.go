package keeper

import (
	"github.com/oraichain/orai/x/websocket/types"
)

// GetKeyResultSuccess is a getter to collect the result success key for validator result verification using by other modules.
func (k Keeper) GetKeyResultSuccess() string {
	return types.ResultSuccess
}
