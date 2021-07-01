use crate::error::ContractError;
use crate::msg::{HandleMsg, InitMsg, QueryMsg};
use crate::state::{config, config_read, State, OWNER};
use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, HandleResponse, HumanAddr, InitResponse, MessageInfo,
    StdResult,
};

pub fn init(deps: DepsMut, _env: Env, info: MessageInfo, msg: InitMsg) -> StdResult<InitResponse> {
    // let state: State = msg.state;
    let state: State = State {
        url: "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT".to_string(),
        method: "GET".to_string(),
        body: String::from(""),
        headers: vec![],
        fees: None,
    };
    config(deps.storage).save(&state)?;
    OWNER.save(deps.storage, &info.sender)?;
    Ok(InitResponse::default())
}

// And declare a custom Error variant for the ones where you will want to make use of it
pub fn handle(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: HandleMsg,
) -> Result<HandleResponse, ContractError> {
    match msg {
        HandleMsg::SetState { state } => try_set_state(deps, info, state),
    }
}

fn try_set_state(
    deps: DepsMut,
    info: MessageInfo,
    state: State,
) -> Result<HandleResponse, ContractError> {
    let owner: HumanAddr = OWNER.load(deps.storage)?;
    if !info.sender.eq(&owner) {
        return Err(ContractError::Unauthorized {});
    }
    config(deps.storage).save(&state)?;
    Ok(HandleResponse::default())
}

pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetFees {} => query_fees(deps),
        QueryMsg::GetState {} => query_state(deps),
    }
}

fn query_fees(deps: Deps) -> StdResult<Binary> {
    let state = config_read(deps.storage).load()?;
    to_binary(&state.fees)
}

fn query_state(deps: Deps) -> StdResult<Binary> {
    let state = config_read(deps.storage).load()?;
    to_binary(&state)
}

#[cfg(test)]
mod tests {
    // use cosmwasm_std::from_slice;

    #[test]
    fn proper_initialization() {
        // let test_str:String = format!("[{{\"name\":\"ETH\",\"prices\":\"hello\"}},{{\"name\":\"BTC\",\"prices\":\"hellohello\"}}]");
        // let test: Vec<Data> = from_slice(test_str.as_bytes()).unwrap();
        // println!("test data: {}", test[0].name);
    }
}
