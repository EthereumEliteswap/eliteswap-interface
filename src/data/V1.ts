import {
  BigintIsh,
  Pair,
  TokenAmount,
  Trade,
  WETH
} from '@eliteswap/sdk'
import { Version } from '../hooks/useToggledVersion'

export class MockV1Pair extends Pair {
  constructor(etherAmount: BigintIsh, tokenAmount: TokenAmount) {
    super(tokenAmount, new TokenAmount(WETH[tokenAmount.token.chainId], etherAmount))
  }
}

export function getTradeVersion(trade?: Trade): Version | undefined {
  const isV1 = trade?.route?.pairs?.some(pair => pair instanceof MockV1Pair)
  if (isV1 === false) return Version.v2
  return undefined
}

