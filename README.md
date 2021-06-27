## Prerequisites

Docker and docker-compose

## Installation

```bash

# Build docker image
docker build -t orai/orai:alpine-thesis -f Dockerfile .

# Start the container
docker-compose up -d && docker-compose exec orai bash

## Below commands are executed inside the container

# first time
go get ./...

# build protobuf templates
make proto-gen

# wget https://github.com/CosmWasm/wasmvm/releases/download/v0.13.0/libwasmvm_muslc.a -O /lib/libwasmvm_muslc.a
make build GOMOD_FLAGS=
ln -s $PWD/build/oraid /usr/bin/oraid

# setup blockchain and run
./scripts/setup_genesis.sh
```

## Run

```bash
# start node
oraid start --rpc.laddr tcp://0.0.0.0:26657

# start websocket subscribe for processing event log in another terminal
oraid tx websocket subscribe --max-try 10 --from $USER --gas="auto" --gas-adjustment="1.5" --chain-id=$CHAIN_ID -y

# run as a background process
docker-compose exec -d orai bash -c "echo $KEYRING_PASS | oraid tx websocket subscribe --max-try 10 --from $USER --gas="auto" --gas-adjustment="1.5" --chain-id=$CHAIN_ID -y"
```

## Benchmarking

1. Start the node with test accounts

```bash
./scripts/add-test.sh 12345678
```

2. Send test accounts ORAI & generate provider scripts

This command must be used in the oraicli project instead of direct call for simplification

```bash
NODE_ENV=thesis ./send-deploy.sh
```

2. Generate AI requests (>= 1500)

```
./scripts/test-request.sh 12345678
```

3. Run Jmeter test using CLI:

Query a list of 1500 AI requests

```bash
$HOME/apache-jmeter-5.3/bin/jmeter -n -t query\ test.jmx -l aireq-pagination.jtl -o aireq-pagination/
```

Query a single request

```bash
$HOME/apache-jmeter-5.3/bin/jmeter -n -t single-airequest.jmx -l aireq-single.jtl -e -o ./aireq-single/
```

Query a transaction using lcd

```bash
$HOME/apache-jmeter-5.3/bin/jmeter -n -t lcd-tx.jmx -l lcd-tx.jtl -e -o ./lcd-tx/
```

Query a transaction using rpc

```bash
$HOME/apache-jmeter-5.3/bin/jmeter -n -t rpc-tx.jmx -l rpc-tx.jtl -e -o ./rpc-tx/
```