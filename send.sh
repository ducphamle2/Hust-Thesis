#!/bin/bash

wallets=(

)

while getopts "t:f:p:a:" opt; do
  case "$opt" in
    t)  timeout=$OPTARG
    ;;
    f)  from=$OPTARG
    ;;
    a)  amount=$OPTARG    
    ;;
    p)  pass=$OPTARG
    ;;
  esac
done

: ${timeout:=5}
: ${pass:=12345678}

tx() {
    expect << EOF
    set timeout $timeout
    spawn oraicli tx send $from $1 ${amount}orai -y
    expect {
        "*passphrase:" { send -- "$pass\r" }
    }
    expect {
        "*passphrase:" { send -- "$pass\r" }
    }
    expect eof
EOF
}

: ${amount:=500000000}

for wallet in ${wallets[@]}
do	        
    # get current block_height
    block_height=$(curl -s localhost:26657/status | jq .result.sync_info.latest_block_height -r)
    tx $wallet
    new_block_height="$block_height"
    while [[ "$new_block_height" == "$block_height" ]]
    do 
        sleep 1
        new_block_height=$(curl -s localhost:26657/status | jq .result.sync_info.latest_block_height -r)
        echo "current block_height: $new_block_height"
    done
done