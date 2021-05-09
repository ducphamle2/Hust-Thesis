package subscribe

import (
	"context"
	"encoding/json"
	"strings"

	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	aiRequest "github.com/oraichain/orai/x/airequest"
	aiRequestTypes "github.com/oraichain/orai/x/airequest/types"

	"github.com/oraichain/orai/x/websocket/types"
)

const (
	QuoteString = `"'`
	JoinString  = `-`
)

type dataSourceResTemp struct {
	Name   string `json:"name"`
	Result string `json:"result"`
	Status string `json:"status"`
}

func (subscriber *Subscriber) handleAIRequestLog(queryClient types.QueryClient, attrs []sdk.Attribute) (*types.MsgCreateReport, error) {
	subscriber.log.Info(":delivery_truck: Processing incoming request event before checking validators")

	request := &aiRequestTypes.AIRequest{}
	for _, attr := range attrs {
		switch attr.Key {
		case aiRequest.AttributeRequest:
			err := json.Unmarshal([]byte(attr.Value), request)
			if err != nil {
				subscriber.log.Error(":skull: Cannot decode request to execute: %s", attr.Value)
				return nil, err
			}
			break
		default:
			break
		}
	}
	// Skip if not related to this validator
	validators := request.GetValidators()
	subscriber.log.Info(":delivery_truck: Validator lists: %v", validators)
	currentValidator := sdk.ValAddress(subscriber.cliCtx.GetFromAddress())
	hasMe := false
	for _, validator := range validators {
		subscriber.log.Debug(":delivery_truck: validator: %s", validator)
		if validator.Equals(currentValidator) {
			hasMe = true
			break
		}
	}

	if !hasMe {
		subscriber.log.Info(":next_track_button: Skip request not related to this validator")
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Skip request not related to this validator")
	}

	subscriber.log.Info(":delivery_truck: Processing incoming request event")

	// collect ai data sources and test cases from the ai request event.
	aiDataSources := request.AiDataSources
	testCases := request.TestCases

	// create data source results to store in the report
	var dataSourceResultsTest []*types.DataSourceResult
	var dataSourceResults []*types.DataSourceResult
	var testCaseResults []*types.TestCaseResult
	var results = []string{}

	// we have different test cases, so we need to loop through them
	ctx := context.Background()
	for _, testCase := range testCases {
		testCaseResult := types.NewTestCaseResult(testCase.Name, types.ResultSuccess, dataSourceResultsTest)
		//put the results from the data sources into the test case to verify if they are good enough
		for _, aiDataSource := range aiDataSources {
			// collect test case result from the script
			outTestCase, err := queryClient.TestCaseContract(ctx, &types.QueryTestCaseContract{
				Name:           testCase.Name,
				DataSourceName: aiDataSource.Name,
				Request: &types.RequestTestCase{
					Input:  string(request.Input),
					Output: string(request.ExpectedOutput),
				},
			})

			dataSourceResult := types.NewDataSourceResult(aiDataSource.Name, []byte{}, types.ResultSuccess)
			// By default, we consider returning null as failure. If any datasource does not follow this rule then it should not be used by any oracle scripts. We dont return error here since the error relates to the external scripts, not the node.
			if err != nil {
				subscriber.log.Info(":skull: failed to execute test case, due to error: %s", err.Error())
				// change status to fail so the test case cannot be rewarded afterwards
				testCaseResult.Status = types.ResultFailure
				break
			}
			// remove all quotes at start and begin
			result := strings.Replace(string(outTestCase.Data), "\\", "", -1)
			result = strings.Trim(result, QuoteString)
			subscriber.log.Info(":delivery_truck: result after running test case: %v", result)
			dsTemp := &dataSourceResTemp{}
			err = json.Unmarshal([]byte(result), dsTemp)
			if err != nil {
				subscriber.log.Error(":skull: failed to unmarshal test case, due to error: %v", err)
				testCaseResult.Status = types.ResultFailure
				break
			}
			if dataSourceResult.Status != types.ResultFailure && dataSourceResult.Status != types.ResultSuccess {
				subscriber.log.Info(":delivery_truck: failed to execute test case, due to error: invalid result status")
				testCaseResult.Status = types.ResultFailure
				break
			}
			dataSourceResult.Name = aiDataSource.Name
			dataSourceResult.Status = dsTemp.Status
			dataSourceResult.Result = []byte(dsTemp.Result)
			testCaseResult.DataSourceResults = append(testCaseResult.DataSourceResults, dataSourceResult)
			subscriber.log.Info(":delivery_truck: data source result: %s", dataSourceResult)
			// append an data source result into the list
			dataSourceResultsTest = append(dataSourceResultsTest, dataSourceResult)
		}
		// add test case result
		testCaseResults = append(testCaseResults, testCaseResult)
	}

	// after passing the test cases, we run the actual data sources to collect their results
	// create data source results to store in the report
	// we use dataSourceResultsTest since this list is the complete list of data sources that have passed the test cases
	for _, dataSourceResultTest := range dataSourceResultsTest {
		// run the data source script

		dataSourceResult := &types.DataSourceResult{}
		if dataSourceResultTest.GetStatus() == types.ResultSuccess && !nameInList(dataSourceResult.Name, dataSourceResults) {
			outDataSource, err := queryClient.DataSourceContract(ctx, &types.QueryDataSourceContract{
				Name: dataSourceResultTest.GetName(),
				Request: &types.RequestDataSource{
					Input: string(request.Input),
				},
			})
			// By default, we consider returning null as failure. If any datasource does not follow this rule then it should not be used by any oracle scripts.
			dataSourceResult = types.NewDataSourceResult(dataSourceResultTest.GetName(), []byte{}, types.ResultSuccess)
			if err != nil {
				subscriber.log.Error(":skull: failed to execute data source script: %s", err.Error())
				// change status to fail so the datasource cannot be rewarded afterwards
				dataSourceResult.Status = types.ResultFailure
				dataSourceResult.Result = []byte(types.FailedResponseDs)
			} else {
				result := string(outDataSource.Data)
				if len(outDataSource.Data) == 0 || result == "null" {
					// change status to fail so the datasource cannot be rewarded afterwards
					dataSourceResult.Status = types.ResultFailure
					dataSourceResult.Result = []byte(types.FailedResponseDs)
				} else {
					dataSourceResult.Result = []byte(result)
					// since data source returns as string, we need to
					results = append(results, result)
				}
			}
		} else {
			dataSourceResult = types.NewDataSourceResult(dataSourceResultTest.GetName(), []byte(dataSourceResultTest.GetResult()), types.ResultFailure)
		}
		// append an data source result into the list
		dataSourceResults = append(dataSourceResults, dataSourceResult)
	}
	subscriber.log.Info(":star: final result: %v", results)
	// Create a new MsgCreateReport with a new reporter to the Oraichain
	reporter := types.NewReporter(
		subscriber.cliCtx.GetFromAddress(), subscriber.cliCtx.GetFromName(),
		sdk.ValAddress(subscriber.cliCtx.GetFromAddress()),
	)
	msgReport := types.NewMsgCreateReport(
		request.RequestID, dataSourceResults,
		testCaseResults, reporter,
		subscriber.config.Fees, []byte(""),
		types.ResultSuccess,
	)

	if len(results) == 0 {
		msgReport.AggregatedResult = []byte(types.FailedResponseOs)
		msgReport.ResultStatus = types.ResultFailure
	} else {
		query := &types.QueryOracleScriptContract{
			Name: request.OracleScriptName,
			Request: &types.RequestOracleScript{
				Results: results,
			},
		}
		outOScript, err := queryClient.OracleScriptContract(ctx, query)

		if err != nil {
			subscriber.log.Error(":skull: failed to aggregate results: %s", err.Error())
			// do not return error since this is the error from the script side
			msgReport.AggregatedResult = []byte(types.FailedResponseOs + ": " + err.Error())
			msgReport.ResultStatus = types.ResultFailure
			return msgReport, nil
		}
		// remove all quote at start and begin
		result := string(outOScript.Data)
		subscriber.log.Info(":star: final result from oScript: %s", result)
		msgReport.AggregatedResult = []byte(result)
	}

	// TODO: check aggregated result value of the oracle script to verify if it fails or success
	return msgReport, nil

}

func nameInList(a string, list []*types.DataSourceResult) bool {
	for _, b := range list {
		if b.Name == a {
			return true
		}
	}
	return false
}
