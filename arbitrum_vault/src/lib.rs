#![cfg_attr(not(feature = "export-abi"), no_main, no_std)]
extern crate alloc;

mod erc20;
use crate::erc20::{Erc20, Erc20Params};
use alloc::vec::Vec;
use stylus_sdk::{
    alloy_primitives::{Address, U256},
    call,
    call::RawCall,
    function_selector, msg,
    prelude::*,
};

struct VaultParams;

impl Erc20Params for VaultParams {
    const NAME: &'static str = "Vault Example";
    const SYMBOL: &'static str = "VAULT";
    const DECIMALS: u8 = 18;
}

sol_storage! {
    #[entrypoint]
    struct Vault {
        address asset;
        uint total_supply;
        #[borrow]
        Erc20<VaultParams> erc20;
    }
}

#[public]
#[inherit(Erc20<VaultParams>)]
impl Vault {
    pub fn set_asset(&mut self, _asset: Address) -> Result<Address, Vec<u8>> {
        self.asset.set(_asset);
        Ok(_asset)
    }

    #[payable]
    pub fn deposit(&mut self, amount: U256) -> Result<(), Vec<u8>> {
        let selector = function_selector!("transferFrom(address,address,uint256)");
        let data = [
            &selector[..],
            &msg::sender().into_array(),
            &self.asset.get().into_array(),
            &amount.to_be_bytes::<32>(),
        ]
        .concat();
        RawCall::new().call(self.asset.get(), &data)?;
        let supply = self.total_supply.get();
        let shares = if supply == U256::ZERO {
            amount
        } else {
            amount
                .checked_div(self.total_assets()?)
                .ok_or("Divide by zero")?
        };
        self.erc20.mint(msg::sender(), shares)?;
        Ok(())
    }

    pub fn withdraw(&mut self, amount: U256) -> Result<(), Vec<u8>> {
        let supply = self.total_supply.get();
        let shares = if supply == U256::ZERO {
            amount
        } else {
            amount
                .checked_div(self.total_assets()?)
                .ok_or("Divide by zero")?
        };

        self.erc20.burn(msg::sender(), shares)?;
        call::transfer_eth(msg::sender(), amount)
    }

    pub fn asset(&self) -> Result<Address, Vec<u8>> {
        Ok(self.asset.get())
    }

    pub fn total_assets(&self) -> Result<U256, Vec<u8>> {
        Ok(self.total_supply.get())
    }
}
