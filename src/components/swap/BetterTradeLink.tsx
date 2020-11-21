import React, { useContext } from 'react'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import { Version } from '../../hooks/useToggledVersion'

import { YellowCard } from '../Card'
import { AutoColumn } from '../Column'

function VersionLinkContainer({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext)

  return (
    <YellowCard style={{ marginTop: '12px', padding: '0.5rem 0.5rem' }}>
      <AutoColumn gap="sm" justify="center" style={{ alignItems: 'center', textAlign: 'center' }}>
        <Text lineHeight="145.23%;" fontSize={14} fontWeight={400} color={theme.text1}>
          {children}
        </Text>
      </AutoColumn>
    </YellowCard>
  )
}

export default function BetterTradeLink({ version }: { version: Version }) {
  return (
    <VersionLinkContainer>
    
    </VersionLinkContainer>
  )
}

export function DefaultVersionLink() {
  return (
    <VersionLinkContainer>

    </VersionLinkContainer>
  )
}
