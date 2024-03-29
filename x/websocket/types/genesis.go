package types

import (
	"fmt"
)

// DefaultGenesisState - default GenesisState used by Cosmos Hub
func DefaultGenesisState() *GenesisState {
	return &GenesisState{
		Reports:   []Report{},
		Reporters: []Reporter{},

		// TODO: Fill out according to your genesis state, these values will be initialized but empty
	}
}

// Validate validates the provider genesis parameters
func (gs *GenesisState) Validate() error {
	for _, record := range gs.Reports {
		if record.RequestId == "" {
			return fmt.Errorf("invalid Report: Value: %s. Error: Missing RequestID", record.RequestId)
		}
		if record.BlockHeight <= int64(0) {
			return fmt.Errorf("invalid Report: BlockHeight: %d. Error: Invalid block height", record.BlockHeight)
		}
		// if record.Fees.Empty() {
		// 	return fmt.Errorf("invalid AIRequests: Owner: %s. Error: Missing Fees", record.Fees)
		// }
	}
	return nil
}
