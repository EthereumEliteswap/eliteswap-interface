import { Currency } from '@uniswap/sdk'
import React from 'react'
import styled from 'styled-components'
import UniswapCurrencyLogo from '../UniswapCurrencyLogo'

const Wrapper = styled.div<{ margin: boolean; sizeraw: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-right: ${({ sizeraw, margin }) => margin && (sizeraw / 3 + 8).toString() + 'px'};
`

interface UniswapDoubleCurrencyLogoProps {
  margin?: boolean
  size?: number
  currency0?: Currency
  currency1?: Currency
}

const HigherLogo = styled(UniswapCurrencyLogo)`
  z-index: 2;
`
const CoveredLogo = styled(UniswapCurrencyLogo)<{ sizeraw: number }>`
  position: absolute;
  left: ${({ sizeraw }) => '-' + (sizeraw / 2).toString() + 'px'} !important;
`

export default function UniswapDoubleCurrencyLogo({
  currency0,
  currency1,
  size = 16,
  margin = false
}: UniswapDoubleCurrencyLogoProps) {
  return (
    <Wrapper sizeraw={size} margin={margin}>
      {currency0 && <HigherLogo currency={currency0} size={size.toString() + 'px'} />}
      {currency1 && <CoveredLogo currency={currency1} size={size.toString() + 'px'} sizeraw={size} />}
    </Wrapper>
  )
}
