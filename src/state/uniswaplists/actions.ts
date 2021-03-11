import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { TokenList, Version } from '@uniswap/token-lists'

export const fetchTokenList: Readonly<{
  pending: ActionCreatorWithPayload<{ url: string; requestId: string }>
  fulfilled: ActionCreatorWithPayload<{ url: string; tokenList: TokenList; requestId: string }>
  rejected: ActionCreatorWithPayload<{ url: string; errorMessage: string; requestId: string }>
}> = {
  pending: createAction('uniswaplists/fetchTokenList/pending'),
  fulfilled: createAction('uniswaplists/fetchTokenList/fulfilled'),
  rejected: createAction('uniswaplists/fetchTokenList/rejected')
}

export const acceptListUpdate = createAction<string>('uniswaplists/acceptListUpdate')
export const addList = createAction<string>('uniswaplists/addList')
export const removeList = createAction<string>('uniswaplists/removeList')
export const selectList = createAction<string>('uniswaplists/selectList')
export const rejectVersionUpdate = createAction<Version>('uniswaplists/rejectVersionUpdate')
