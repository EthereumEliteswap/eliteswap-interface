import { useState, useLayoutEffect } from 'react'
import { shade } from 'polished'
import Vibrant from 'node-vibrant'
import { hex } from 'wcag-contrast'
import { Token, ChainId } from '@eliteswap/sdk'

async function getColorFromToken(token: Token): Promise<string | null> {
  // Wrapped BNB
  if (token.chainId === ChainId.BSC_TESTNET && token.address === '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e') {
    return Promise.resolve('#F0B90B')
  }
  
  // ELTB Token
  if (token.chainId === ChainId.BSC_TESTNET && token.address === '0xbbAA1C83ea09b5cE0868E0171fE1898Cf7c3c291') {
    return Promise.resolve('#408EF5')
  }

  const path = `https://exchange.pancakeswap.finance/images/coins/${token.address}.png`

  return Vibrant.from(path)
    .getPalette()
    .then(palette => {
      if (palette?.Vibrant) {
        let detectedHex = palette.Vibrant.hex
        let AAscore = hex(detectedHex, '#FFF')
        while (AAscore < 3) {
          detectedHex = shade(0.005, detectedHex)
          AAscore = hex(detectedHex, '#FFF')
        }
        return detectedHex
      }
      return null
    })
    .catch(() => null)
}

export function useColor(token?: Token) {
  const [color, setColor] = useState('#F65900')

  useLayoutEffect(() => {
    let stale = false

    if (token) {
      getColorFromToken(token).then(tokenColor => {
        if (!stale && tokenColor !== null) {
          setColor(tokenColor)
        }
      })
    }

    return () => {
      stale = true
      setColor('#F65900')
    }
  }, [token])

  return color
}
