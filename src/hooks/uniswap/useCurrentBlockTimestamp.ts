import { BigNumber } from 'ethers'
import { useSingleCallResult } from '../../state/uniswapmulticall/hooks'
import { useUniswapMulticallContract } from './useContract'

// gets the current timestamp from the blockchain
export default function useUniswapCurrentBlockTimestamp(): BigNumber | undefined {
  const multicall = useUniswapMulticallContract()
  return useSingleCallResult(multicall, 'getCurrentBlockTimestamp')?.result?.[0]
}
