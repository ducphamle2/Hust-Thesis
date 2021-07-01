#!/bin/bash

CHAIN_ID=${CHAIN_ID:-Oraichain}
IFS=',' read -r -a DS <<< "$1"
DS=${DS:-classification}
DS_INPUT=${2:-''}
NONCE=${3:-1}
DIR_PATH=${4:-$PWD}
PASS=${5:-123456789}
TYPE=${6-:datasource}
FEES=${7-:0orai}

echo "data sources: ${DS[@]}"

# deploy smart contract data source and create data source
for i in "${DS[@]}"
do
    sh $PWD/scripts/deploy-contract-store-addr.sh $DIR_PATH/$i/artifacts/$i.wasm "$i $NONCE" "$DS_INPUT" $PASS

    # check if the data source exists or not
    oraid query provider dsource $i 2> is_exist.txt
    description="test $i"
    address=$(cat ../address.txt)
    echo "address: $address"
    echo "description: $description"
    echo "data source file: $i"

    # if the file is not empty, then the data source does not exist. We create new
    if [ -s is_exist.txt ]
    then
        echo $PASS | oraid tx provider set-$TYPE $i $address "$description" $FEES --from $USER --chain-id $CHAIN_ID -y
    else
        # if it exists already, we update the contract
        echo $PASS | oraid tx provider edit-$TYPE $i $i $address "$description" $FEES --from $USER --chain-id $CHAIN_ID -y
    fi

done

# example
# ./scripts/deploy_ds_tc.sh cv023 '' 1 ./smart-contracts/cv 12345678 datasource 0orai
# ./scripts/deploy_ds_tc.sh cv023_tc '' 1 ./smart-contracts/cv 12345678 testcase 0orai