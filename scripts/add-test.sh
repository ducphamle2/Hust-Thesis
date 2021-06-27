#!/bin/bash

pass=${1:='````````'}

echo $pass | sh ./scripts/setup_genesis.sh

for i in $(seq 1 20); 
do
    echo $pass | oraid keys add test$i
done

bash ./scripts/query-addrs.sh > addrs.txt && chmod -R 777 addrs.txt
bash ./scripts/addrs-length.sh > addr-length.txt && chmod -R 777 addr-length.txt
#mnemonic=winner label sure opinion leader siren tape wheel sense garage news trend penalty defy shell alpha able predict duck cute draw faith room mercy
addr=orai1qar957ppskpxyr7hasqr9zhgw4x0n2fsq6r32t
oraid start & (sleep 5 && echo $pass | oraid tx send $USER $addr 90000000000orai --from $USER --chain-id $CHAIN_ID -y)