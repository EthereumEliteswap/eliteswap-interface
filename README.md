# Elite Swap Interface

[![Lint](https://github.com/EthereumEliteswap/eliteswap-interface/workflows/Lint/badge.svg)](https://github.com/EthereumEliteswap/eliteswap-interface/actions?query=workflow%3ALint)
[![Tests](https://github.com/EthereumEliteswap/eliteswap-interface/workflows/Tests/badge.svg)](https://github.com/EthereumEliteswap/eliteswap-interface/actions?query=workflow%3ATests)
[![Styled With Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)

An open source interface for Elite Swap -- a protocol for decentralized exchange of Ethereum tokens.

- Interface: [eliteswap.io](https://eliteswap.io)
- Discord: [Elite Swap](https://discord.gg/yFsjhuQ7Kj)
- Telegram: [Elite Swap](https://telegram.org/@EliteSwap)
- Twitter: [@EliteSwap2020](https://twitter.com/EliteSwap2020?s=09)
- Whitepaper: [Link](https://uniswap.org/whitepaper.pdf)

## Accessing Elite Swap Interface

[latest release](https://github.com/EthereumEliteswap/eliteswap-interface/releases/latest), 
or visit [https://eliteswap.io](https://eliteswap.io).

## Listing a token

Please see the
[@eliteswap/default-token-list](https://github.com/EthereumEliteswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Elite Swap V2 Factory](https://github.com/EthereumEliteswap/eliteswap-v2-core/blob/master/contracts/EliteswapV2Factory.sol) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

