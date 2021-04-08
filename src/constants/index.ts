import { ChainId, JSBI, Percent, Token, WETH } from '@eliteswap/sdk'
import { AbstractConnector } from '@web3-react/abstract-connector'

import { injected, portis, walletconnect, walletlink } from '../connectors'

export const ROUTER_ADDRESS = '0xCFD40aE8E1c28E1dBcb99d84c8918bbC27A9bF20'

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const DAI = new Token(ChainId.BSC_MAINNET, '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(ChainId.BSC_MAINNET, '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d', 18, 'USDC', 'USD//C')
export const USDT = new Token(ChainId.BSC_MAINNET, '0x55d398326f99059fF775485246999027B3197955', 18, 'BUSD-T', 'BUSD-T Stablecoin')
export const COMP = new Token(ChainId.BSC_MAINNET, '0x52CE071Bd9b1C4B00A0b92D298c512478CaD67e8', 18, 'COMP', 'Compound')
export const MKR = new Token(ChainId.BSC_MAINNET, '0x5f0Da599BB2ccCfcf6Fdfd7D81743B6020864350', 18, 'MKR', 'Maker')
export const BUSD = new Token(ChainId.BSC_MAINNET, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 18, 'BUSD', 'Binance USD Stablecoin')
export const BTCB = new Token(ChainId.BSC_MAINNET, '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c', 18, 'BTCB', 'Binance BTC')
export const ETH = new Token(ChainId.BSC_MAINNET, '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', 18, 'ETH', 'ETH Token')
// export const UST = new Token(ChainId.BSC_MAINNET, '0x23396cF899Ca06c4472205fC903bDB4de249D6fC', 18, 'UST', 'Wrapped UST Token')

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 14
export const PROPOSAL_LENGTH_IN_BLOCKS = 40_320
export const PROPOSAL_LENGTH_IN_SECS = AVERAGE_BLOCK_TIME_IN_SECS * PROPOSAL_LENGTH_IN_BLOCKS

export const GOVERNANCE_ADDRESS = '0xbbAA1C83ea09b5cE0868E0171fE1898Cf7c3c291'

export const TIMELOCK_ADDRESS = '0x1E3776A7Bb9228E997806FA6Faf455B0bd4d77cc'

const ELT_ADDRESS = '0x380291A9A8593B39f123cF39cc1cc47463330b1F'
export const ELT: { [chainId in ChainId]: Token } | any = {
  [ChainId.BSC_MAINNET]: new Token(ChainId.BSC_MAINNET, ELT_ADDRESS, 18, 'ELTB', 'Elite Swap Binance Token'),
  [ChainId.BSC_TESTNET]: new Token(ChainId.BSC_TESTNET, "0xbbAA1C83ea09b5cE0868E0171fE1898Cf7c3c291", 18, 'ELTB', 'Elite Swap Binance Token')
}

export const COMMON_CONTRACT_NAMES: { [address: string]: string } = {
  [ELT_ADDRESS]: 'ELT',
  [GOVERNANCE_ADDRESS]: 'Governance',
  [TIMELOCK_ADDRESS]: 'Timelock'
}

/*
export const MERKLE_DISTRIBUTOR_ADDRESS: { [chainId in ChainId]?: string } = {
  [ChainId.BSC_MAINNET]: '0x638C4a9E8a74e7AB0c442124007dB0516e66491B',
  [ChainId.BSC_TESTNET]: '0xbd21f67478e3ed8662d51AA6cdDff5cd24BA8581'
}
*/

const WETH_ONLY: ChainTokenList = {
  [ChainId.BSC_MAINNET]: [WETH[ChainId.BSC_MAINNET]],
  [ChainId.BSC_TESTNET]: [WETH[ChainId.BSC_TESTNET]]
}

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.BSC_MAINNET], DAI, USDC, USDT, COMP, MKR, BUSD, BTCB, ETH]
}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {
  [ChainId.BSC_MAINNET]: {
  }
}

// used for display in the default list when adding liquidity
export const SUGGESTED_BASES: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.BSC_MAINNET], DAI, USDC, USDT, BTCB, BUSD, ETH]
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WETH_ONLY,
  [ChainId.BSC_MAINNET]: [...WETH_ONLY[ChainId.BSC_MAINNET], DAI, USDC, USDT, BTCB, BUSD, ETH]
}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.BSC_MAINNET]: [
    [BTCB, USDT],
    [USDC, USDT],
    [DAI, USDT]
  ]
}

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  COINBASE_LINK: {
    name: 'Open in Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Open in Coinbase Wallet app.',
    href: 'https://go.cb-w.com/mtUDhEZPy1',
    color: '#315CF5',
    mobile: true,
    mobileOnly: true
  },
  Portis: {
    connector: portis,
    name: 'Portis',
    iconName: 'portisIcon.png',
    description: 'Login using Portis hosted wallet',
    href: null,
    color: '#4A6C9B',
    mobile: true
  }
}

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 20 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 20

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)
// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%
// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH
export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))
