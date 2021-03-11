import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
import uniswapapplication from './uniswapapplication/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import uniswapuser from './uniswapuser/reducer'
import transactions from './transactions/reducer'
import uniswaptransactions from './uniswaptransactions/reducer'
import swap from './swap/reducer'
import uniswap from './uniswap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import uniswaplists from './uniswaplists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import uniswapmulticall from './uniswapmulticall/reducer'

const PERSISTED_KEYS: string[] = ['user', 'uniswapuser', 'transactions', 'uniswaptransactions', 'lists', 'uniswaplists']

const store = configureStore({
  reducer: {
    application,
    uniswapapplication,
    user,
    uniswapuser,
    transactions,
    uniswaptransactions,
    swap,
    uniswap,
    mint,
    burn,
    multicall,
    uniswapmulticall,
    lists,
    uniswaplists
  },
  middleware: [...getDefaultMiddleware({ thunk: false }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
