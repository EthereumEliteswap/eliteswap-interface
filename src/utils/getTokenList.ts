import { TokenList } from '@eliteswap/token-lists'
import schema from '@eliteswap/token-lists/src/tokenlist.schema.json'
import Ajv from 'ajv'
import { parseENSAddress } from './parseENSAddress'
import uriToHttp from './uriToHttp'

const tokenListValidator = new Ajv({ allErrors: true }).compile(schema)

/**
 * Contains the logic for resolving a list URL to a validated token list
 * @param listUrl list url
 */
export default async function getTokenList(
  listUrl: string,
): Promise<TokenList> {
  const parsedENS = parseENSAddress(listUrl)
  let urls: string[]
  if (parsedENS) {
    console.debug(`Failed to resolve ENS name: ${parsedENS.ensName}`, 'ENSRegistryWithFallback contract is missing.')
    throw new Error(`Failed to resolve ENS name: ${parsedENS.ensName}. ENSRegistryWithFallback contract is missing.`)
  } else {
    urls = uriToHttp(listUrl)
  }
  
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    const isLast = i === urls.length - 1
    let response
    try {
      response = await fetch(url)
    } catch (error) {
      console.debug('Failed to fetch list', listUrl, error)
      if (isLast) throw new Error(`Failed to download list ${listUrl}`)
      continue
    }

    if (!response.ok) {
      if (isLast) throw new Error(`Failed to download list ${listUrl}`)
      continue
    }

    const json = await response.json()
    if (!tokenListValidator(json)) {
      const validationErrors: string =
        tokenListValidator.errors?.reduce<string>((memo, error) => {
          const add = `${error.dataPath} ${error.message ?? ''}`
          return memo.length > 0 ? `${memo}; ${add}` : `${add}`
        }, '') ?? 'unknown error'
      throw new Error(`Token list failed validation: ${validationErrors}`)
    }
    return json
  }
  throw new Error('Unrecognized list URL protocol.')
}
