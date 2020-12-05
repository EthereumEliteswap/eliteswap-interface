import { ChainId, TokenAmount } from '@eliteswap/sdk'
import React, { useMemo } from 'react'
import { X } from 'react-feather'
import styled from 'styled-components'
import tokenLogo from '../../assets/images/token-logo.png'
import { ELT } from '../../constants'
import { useTotalSupply } from '../../data/TotalSupply'
import { useActiveWeb3React } from '../../hooks'
import { useMerkleDistributorContract } from '../../hooks/useContract'
import useCurrentBlockTimestamp from '../../hooks/useCurrentBlockTimestamp'
import { useTotalEltEarned } from '../../state/stake/hooks'
import { useAggregateEltBalance, useTokenBalance } from '../../state/wallet/hooks'
import { ExternalLink, StyledInternalLink, TYPE, EltTokenAnimated } from '../../theme'
import { computeEltCirculation } from '../../utils/computeEltCirculation'
import useUSDCPrice from '../../utils/useUSDCPrice'
import { AutoColumn } from '../Column'
import { RowBetween } from '../Row'
import { Break, CardBGImage, CardNoise, CardSection, DataCard } from '../earn/styled'

const ContentWrapper = styled(AutoColumn)`
  width: 100%;
`

const ModalUpper = styled(DataCard)`
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  background: radial-gradient(76.02% 75.41% at 1.84% 0%, #ff007a 0%, #021d43 100%);
  padding: 0.5rem;
`

const StyledClose = styled(X)`
  position: absolute;
  right: 16px;
  top: 16px;

  :hover {
    cursor: pointer;
  }
`

/**
 * Content for balance stats modal
 */
export default function EltBalanceContent({ setShowEltBalanceModal }: { setShowEltBalanceModal: any }) {
  const { account, chainId } = useActiveWeb3React()
  const elt = chainId ? ELT[chainId] : undefined

  const total = useAggregateEltBalance()
  const eltBalance: TokenAmount | undefined = useTokenBalance(account ?? undefined, elt)
  const eltToClaim: TokenAmount | undefined = useTotalEltEarned()

  const totalSupply: TokenAmount | undefined = useTotalSupply(elt)
  const eltPrice = useUSDCPrice(elt)
  const blockTimestamp = useCurrentBlockTimestamp()
  const unclaimedElt = useTokenBalance(useMerkleDistributorContract()?.address, elt)
  const circulation: TokenAmount | undefined = useMemo(
    () =>
      blockTimestamp && elt && chainId === ChainId.MAINNET
        ? computeEltCirculation(elt, blockTimestamp, unclaimedElt)
        : totalSupply,
    [blockTimestamp, chainId, totalSupply, unclaimedElt, elt]
  )

  return (
    <ContentWrapper gap="lg">
      <ModalUpper>
        <CardBGImage />
        <CardNoise />
        <CardSection gap="md">
          <RowBetween>
            <TYPE.white color="white">Your ELT Breakdown</TYPE.white>
            <StyledClose stroke="white" onClick={() => setShowEltBalanceModal(false)} />
          </RowBetween>
        </CardSection>
        <Break />
        {account && (
          <>
            <CardSection gap="sm">
              <AutoColumn gap="md" justify="center">
                <EltTokenAnimated width="48px" src={tokenLogo} />{' '}
                <TYPE.white fontSize={48} fontWeight={600} color="white">
                  {total?.toFixed(2, { groupSeparator: ',' })}
                </TYPE.white>
              </AutoColumn>
              <AutoColumn gap="md">
                <RowBetween>
                  <TYPE.white color="white">Balance:</TYPE.white>
                  <TYPE.white color="white">{eltBalance?.toFixed(2, { groupSeparator: ',' })}</TYPE.white>
                </RowBetween>
                <RowBetween>
                  <TYPE.white color="white">Unclaimed:</TYPE.white>
                  <TYPE.white color="white">
                    {eltToClaim?.toFixed(4, { groupSeparator: ',' })}{' '}
                    {eltToClaim && eltToClaim.greaterThan('0') && (
                      <StyledInternalLink onClick={() => setShowEltBalanceModal(false)} to="/elt">
                        (claim)
                      </StyledInternalLink>
                    )}
                  </TYPE.white>
                </RowBetween>
              </AutoColumn>
            </CardSection>
            <Break />
          </>
        )}
        <CardSection gap="sm">
          <AutoColumn gap="md">
            <RowBetween>
              <TYPE.white color="white">ELT price:</TYPE.white>
              <TYPE.white color="white">${eltPrice?.toFixed(2) ?? '-'}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">ELT in circulation:</TYPE.white>
              <TYPE.white color="white">{circulation?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            <RowBetween>
              <TYPE.white color="white">Total Supply</TYPE.white>
              <TYPE.white color="white">{totalSupply?.toFixed(0, { groupSeparator: ',' })}</TYPE.white>
            </RowBetween>
            {elt && elt.chainId === ChainId.MAINNET ? (
              <ExternalLink href={`https://eliteswap.io/info/token/${elt.address}`}>View ELT Analytics</ExternalLink>
            ) : null}
          </AutoColumn>
        </CardSection>
      </ModalUpper>
    </ContentWrapper>
  )
}
