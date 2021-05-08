package airequest

import (
	"github.com/oraichain/orai/x/airequest/keeper"
	"github.com/oraichain/orai/x/airequest/types"
)

const (
	ModuleName               = types.ModuleName
	RouterKey                = types.RouterKey
	StoreKey                 = types.StoreKey
	QuerierRoute             = types.QuerierRoute
	DefaultParamspace        = types.DefaultParamspace
	EventTypeSetAIRequest    = types.EventTypeSetAIRequest
	AttributeRequest         = types.AttributeRequest
	EventTypeRequestWithData = types.EventTypeRequestWithData
)

var (
	NewKeeper          = keeper.NewKeeper
	NewQuerier         = keeper.NewQuerier
	NewMsgSetAIRequest = types.NewMsgSetAIRequest
	ModuleCdc          = types.ModuleCdc
	RegisterCodec      = types.RegisterCodec
	NewGenesisState    = types.NewGenesisState
	RequestKeyPrefix   = types.RequestKeyPrefix
	ErrRequestNotFound = types.ErrRequestNotFound
	NewAIRequest       = types.NewAIRequest
)

type (
	Keeper          = keeper.Keeper
	MsgSetAIRequest = types.MsgSetAIRequest
	AIRequest       = types.AIRequest
	GenesisState    = types.GenesisState
)
