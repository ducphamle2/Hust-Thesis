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