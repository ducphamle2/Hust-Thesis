#!/bin/bash

pass=${PASS:='````````'}

echo $pass | sh ./scripts/setup_genesis.sh

for i in $(seq 1 20); 
do
    echo $pass | oraid keys add test$i
done

bash ./scripts/query-addrs.sh > addrs.txt && chmod -R 777 addrs.txt
bash ./scripts/addrs-length.sh > addr-length.txt && chmod -R 777 addr-length.txt
#mnemonic=winner label sure opinion leader siren tape wheel sense garage news trend penalty defy shell alpha able predict duck cute draw faith room mercy
addr=orai1m6mn6pd86dvsrgx2nxfj56rpjf5vyczz7sreqf
oraid start & (sleep 3 && echo $pass | oraid tx send $USER $addr 90000000000orai --from $USER --chain-id $CHAIN_ID -y)