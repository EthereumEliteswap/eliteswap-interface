import { namehash } from 'ethers/lib/utils'
import { useMemo } from 'react'
import { useSingleCallResult } from '../../state/uniswapmulticall/hooks'
import isZero from '../../utils/isZero'
import { useUniswapENSRegistrarContract, useUniswapENSResolverContract } from './useContract'
import useDebounce from '../useDebounce'

/**
 * Does a lookup for an ENS name to find its address.
 */
export default function useUniswapENSAddress(ensName?: string | null): { loading: boolean; address: string | null } {
  const debouncedName = useDebounce(ensName, 200)
  const ensNodeArgument = useMemo(() => {
    if (!debouncedName) return [undefined]
    try {
      return debouncedName ? [namehash(debouncedName)] : [undefined]
    } catch (error) {
      return [undefined]
    }
  }, [debouncedName])
  const registrarContract = useUniswapENSRegistrarContract(false)
  const resolverAddress = useSingleCallResult(registrarContract, 'resolver', ensNodeArgument)
  const resolverAddressResult = resolverAddress.result?.[0]
  const resolverContract = useUniswapENSResolverContract(
    resolverAddressResult && !isZero(resolverAddressResult) ? resolverAddressResult : undefined,
    false
  )
  const addr = useSingleCallResult(resolverContract, 'addr', ensNodeArgument)

  const changed = debouncedName !== ensName
  return {
    address: changed ? null : addr.result?.[0] ?? null,
    loading: changed || resolverAddress.loading || addr.loading
  }
}
