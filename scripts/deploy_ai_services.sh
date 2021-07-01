#!/bin/bash

CHAIN_ID=${CHAIN_ID:-Oraichain}
DS_RAW=${1:-classification}
TC_RAW=${2:-classification_testcase}
OS=${3:-classification_oscript}
DS_INPUT=${4:-''}
TC_INPUT=${5:-''}
OS_INPUT=${6:-''}
NONCE=${7:-1}
DIR_PATH=${8:-$ORAI_WASM_CONTAINER_PATH}
PASS=${9:-123456789}
FEES=${10:-0orai}

# deploy data sources
bash $PWD/scripts/deploy_ds_tc.sh $DS_RAW "$DS_INPUT" $NONCE $DIR_PATH $PASS "datasource" $FEES

# deploy test cases
bash $PWD/scripts/deploy_ds_tc.sh $TC_RAW "$TC_INPUT" $NONCE $DIR_PATH $PASS "testcase" $FEES

# deploy oracle scripts
bash $PWD/scripts/deploy_oscript.sh $DS_RAW $TC_RAW $OS "$OS_INPUT" $NONCE $DIR_PATH $PASS $FEES

# example
# ./scripts/deploy_ai_services.sh cv023 cv023_tc cv023_os '' '' '' 1 ./smart-contracts/cv 12345678 0orai