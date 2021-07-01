use crate::error::ContractError;
use crate::msg::{HandleMsg, InitMsg, QueryMsg, SpecialQuery};
use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, HandleResponse, InitResponse, MessageInfo, StdResult,
};

// Note, you can use StdResult in some functions where you do not
// make use of the custom errors
pub fn init(_deps: DepsMut, _env: Env, _info: MessageInfo, _: InitMsg) -> StdResult<InitResponse> {
    Ok(InitResponse::default())
}

// And declare a custom Error variant for the ones where you will want to make use of it
pub fn handle(
    _: DepsMut,
    _env: Env,
    _: MessageInfo,
    _: HandleMsg,
) -> Result<HandleResponse, ContractError> {
    Ok(HandleResponse::default())
}

pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::Get { input } => to_binary(&query_price(deps, input)?),
    }
}

fn query_price(deps: Deps, input: String) -> StdResult<String> {
    // create specialquery with default empty string
    let req = SpecialQuery::Fetch {
        url: format!(
            "https://api.coingecko.com/api/v3/simple/price?ids={}&vs_currencies=usd",
            input
        ),
    }
    .into();
    // // because not support f32, we need to do it manually
    // // dont use String because it will deserialize bytes to base 64
    let response: Binary = deps.querier.custom_query(&req)?;
    let data = String::from_utf8(response.to_vec())?;

    // Ok(data)
    let index = data.find(r#""usd":"#).unwrap_or(0);
    if index == 0 {
        return Ok(String::new());
    }
    let first = index + 6;
    let last = first + data.get(first..).unwrap().find("}").unwrap();
    let price = data.get(first..last).unwrap().to_string();
    Ok(price)
}
