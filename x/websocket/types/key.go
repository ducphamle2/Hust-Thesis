package types

const (
	// ModuleName is the name of the module
	ModuleName = "websocket"

	// StoreKey to be used when creating the KVStore
	StoreKey = ModuleName

	// RouterKey to be used for routing msgs
	RouterKey = ModuleName

	// QuerierRoute to be used for querierer msgs
	QuerierRoute = ModuleName

	// FailedResponseOs represents an oracle script cannot collect or aggregate the data source results
	FailedResponseOs = "The oracle script could not collect or aggregate the data source results"

	// FailedResponseTc represents the failed response from the data source
	FailedResponseTc = "This data source did not pass the test case given the user expected output"

	// FailedResponseDs represents the failed response from the data source
	FailedResponseDs = "This data source passed the test case but failed when actually running"

	// ResultFailure is the fail status of a result after the test case runs
	ResultFailure = "fail"

	// ResultSuccess is the success status of a result after the test case runs
	ResultSuccess = "success"
)

var (
	// ReportKeyPrefix sets a prefix for a report key
	ReportKeyPrefix = "rp"
)

// ReportStoreKey returns the key to retrieve a specfic report from the store.
func ReportStoreKey(requestID string, valAddress string) []byte {
	// buf := append([]byte(ReportKeyPrefix), valAddress...)
	// buf = append(buf, []byte(requestID)...)
	return []byte(ReportKeyPrefix + requestID + valAddress)
}

// ReportStoreKeyPrefix returns the prefix of report key (used to iterate all the reports of a request)
func ReportStoreKeyPrefix(requestID string) []byte {
	return []byte(ReportKeyPrefix + requestID)
}

// ReportStoreKeyPrefixAll returns the prefix of report key (used to iterate all the reports of all requests)
func ReportStoreKeyPrefixAll() []byte {
	return []byte(ReportKeyPrefix)
}

// ReportStoreKeyString returns the key to retrieve a specfic report from the store.
func ReportStoreKeyString(valAddress []byte, requestID string) string {
	return ReportKeyPrefix + string(valAddress[:]) + requestID
}
