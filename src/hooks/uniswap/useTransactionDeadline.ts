import { BigNumber } from 'ethers'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../state'
import useUniswapCurrentBlockTimestamp from './useCurrentBlockTimestamp'

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
export default function useUniswapTransactionDeadline(): BigNumber | undefined {
  const ttl = useSelector<AppState, number>(state => state.user.userDeadline)
  const blockTimestamp = useUniswapCurrentBlockTimestamp()
  return useMemo(() => {
    if (blockTimestamp && ttl) return blockTimestamp.add(ttl)
    return undefined
  }, [blockTimestamp, ttl])
}
