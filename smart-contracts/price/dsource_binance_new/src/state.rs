use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::{Coin, HumanAddr, Storage};
use cosmwasm_storage::{singleton, singleton_read, ReadonlySingleton, Singleton};

use cw_storage_plus::Item;

pub static CONFIG_KEY: &[u8] = b"config";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub url: String,
    pub headers: Vec<String>,
    pub body: String,
    pub fees: Option<Vec<Coin>>,
    pub method: String,
}

pub const OWNER: Item<HumanAddr> = Item::new("owner");

pub fn config(storage: &mut dyn Storage) -> Singleton<State> {
    singleton(storage, CONFIG_KEY)
}

pub fn config_read(storage: &dyn Storage) -> ReadonlySingleton<State> {
    singleton_read(storage, CONFIG_KEY)
}
