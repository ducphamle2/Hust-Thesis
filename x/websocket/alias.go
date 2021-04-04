package websocket

import (
	"github.com/oraichain/orai/x/websocket/keeper"
	"github.com/oraichain/orai/x/websocket/subscribe"
	"github.com/oraichain/orai/x/websocket/types"
)

const (
	ModuleName        = types.ModuleName
	RouterKey         = types.RouterKey
	StoreKey          = types.StoreKey
	QuerierRoute      = types.QuerierRoute
	DefaultParamspace = types.DefaultParamspace
)

var (
	NewKeeper       = keeper.NewKeeper
	NewQuerier      = keeper.NewQuerier
	NewSubscriber   = subscribe.NewSubscriber
	ModuleCdc       = types.ModuleCdc
	RegisterCodec   = types.RegisterCodec
	NewGenesisState = types.NewGenesisState
	ReportKeyPrefix = types.ReportKeyPrefix
)

type (
	Keeper          = keeper.Keeper
	Subscriber      = subscribe.Subscriber
	GenesisState    = types.GenesisState
	Report          = types.Report
	WebSocketConfig = subscribe.WebSocketConfig
	MsgCreateReport = types.MsgCreateReport
)
