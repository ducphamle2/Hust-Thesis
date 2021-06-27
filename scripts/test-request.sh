#!/bin/bash

pass=${1:='````````'}

names=$(echo $pass | oraid keys list --list-names)

tx() {
    echo $pass | oraid tx airequest set-aireq oscript_price_special "a" "b" 10orai 1 --from $name --chain-id $CHAIN_ID -y -b async
}
for i in $(seq 1 10000)
do 
    for name in ${names[@]}
        do	        
            tx $name
    done
done