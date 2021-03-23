khi build Oraichain thi co 2 mang? da build:

Oraichain client (CLI, REST LCD) de user tuong tac voi node va ABCI application (nghiep vu chinh). Tendermint Core (consensus va network p2p) khong build

Khi tao 1 cli hoac rest request, thi request se goi den abci client bao gom cac functions (rpc), va se rpc toi consensus engine 

consensus engine se send data toi ABCI application thong qua socket va ABCI interface de abstract tang` ABCI application

ABCI application o day co the su dung Go de build (thong qua Cosmos SDK) hoac tu build = Java cac thu

ABCI application chinh la phan querier keeper types trong x/ tuong tac truc tiep voi store, begin block end block cac thu luon, bao gom nhieu modules trong do tu staking auth, etc...