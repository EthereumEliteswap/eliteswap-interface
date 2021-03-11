import { createAction } from '@reduxjs/toolkit'

export enum Field {
  INPUT = 'INPUT',
  OUTPUT = 'OUTPUT'
}

export const selectCurrency = createAction<{ field: Field; currencyId: string }>('uniswap/selectCurrency')
export const switchCurrencies = createAction<void>('uniswap/switchCurrencies')
export const typeInput = createAction<{ field: Field; typedValue: string }>('uniswap/typeInput')
export const replaceSwapState = createAction<{
  field: Field
  typedValue: string
  inputCurrencyId?: string
  outputCurrencyId?: string
  recipient: string | null
}>('uniswap/replaceSwapState')
export const setRecipient = createAction<{ recipient: string | null }>('uniswap/setRecipient')
