#!/bin/bash
pass=${PASS:='````````'}

addrs=$(echo $pass | oraid keys list --output json)
count=0;

for row in $(echo "${addrs}" | jq -r '.[].address'); do
    count=$((count+1))
done

echo $count