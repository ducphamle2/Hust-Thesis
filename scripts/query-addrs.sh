#!/bin/bash
pass=${PASS:='````````'}

addrs=$(echo $pass | oraid keys list --output json)
list=""

for row in $(echo "${addrs}" | jq -r '.[].address'); do
    list+=" $row"
done
echo $list