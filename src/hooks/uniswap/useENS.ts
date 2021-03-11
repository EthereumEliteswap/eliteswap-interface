import { isAddress } from '../../utils/uniswap'
import useUniswapENSAddress from './useENSAddress'
import useUniswapENSName from './useENSName'

/**
 * Given a name or address, does a lookup to resolve to an address and name
 * @param nameOrAddress ENS name or address
 */
export default function useUniswapENS(
  nameOrAddress?: string | null
): { loading: boolean; address: string | null; name: string | null } {
  const validated = isAddress(nameOrAddress)
  const reverseLookup = useUniswapENSName(validated ? validated : undefined)
  const lookup = useUniswapENSAddress(nameOrAddress)

  return {
    loading: reverseLookup.loading || lookup.loading,
    address: validated ? validated : lookup.address,
    name: reverseLookup.ENSName ? reverseLookup.ENSName : !validated && lookup.address ? nameOrAddress || null : null
  }
}
