const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
const UMA_LIST = 'https://umaproject.org/uma.tokenlist.json'
const AAVE_LIST = 'tokenlist.aave.eth'
const SYNTHETIX_LIST = 'synths.snx.eth'
const WRAPPED_LIST = 'wrapped.tokensoft.eth'
const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
const OPYN_LIST = 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json'
const ROLL_LIST = 'https://app.tryroll.com/tokens.json'
const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
const CMC_ALL_LIST = 'defi.cmc.eth'
const CMC_STABLECOIN = 'stablecoin.cmc.eth'
const KLEROS_LIST = 't2crtokens.eth'
const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
const UNISWAP_LIST = 'tokens.uniswap.eth'
const DHARMA_LIST = 'tokenlist.dharma.eth'
const ELITESWAP_LIST = 'https://unpkg.com/@eliteswap/default-token-list@1.6.1'

// the Uniswap Default token list lives here
export const DEFAULT_TOKEN_LIST_URL = GEMINI_LIST

export const DEFAULT_LIST_OF_LISTS: string[] = [
  DEFAULT_TOKEN_LIST_URL,
  ELITESWAP_LIST,
  UNISWAP_LIST,
  KLEROS_LIST,
  'tokens.1inch.eth', // 1inch
  SYNTHETIX_LIST,
  DHARMA_LIST,
  CMC_ALL_LIST,
  'erc20.cmc.eth',
  CMC_STABLECOIN,
  'tokenlist.zerion.eth',
  AAVE_LIST,
  COINGECKO_LIST,
  ROLL_LIST,
  COMPOUND_LIST,
  'https://defiprime.com/defiprime.tokenlist.json',
  UMA_LIST,
  WRAPPED_LIST,
  SET_LIST,
  OPYN_LIST
]
