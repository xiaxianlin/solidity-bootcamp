```
cargo stylus check

# 加载 .env 文件中配置的环境变量
source .env

# 部署合约到链上
cargo stylus deploy --endpoint='https://sepolia-rollup.arbitrum.io/rpc' --private-key=$PRIVATE_KEY

# 设置资产地址
cast send --rpc-url https://sepolia-rollup.arbitrum.io/rpc --private-key $PRIVATE_KEY $VAULT "setAsset(address)" $ASSET_ADDRESS


# 存款
cast send --rpc-url https://sepolia-rollup.arbitrum.io/rpc \ 
--private-key $PRIVATE_KEY $VAULT "deposit(uint256)" 100000000000000000
```