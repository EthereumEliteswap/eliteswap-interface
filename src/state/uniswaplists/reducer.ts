import { createReducer } from '@reduxjs/toolkit'
import { getVersionUpgrade, VersionUpgrade } from '@uniswap/token-lists'
import { TokenList } from '@uniswap/token-lists/dist/types'
import { DEFAULT_LIST_OF_LISTS, DEFAULT_TOKEN_LIST_URL } from '../../constants/uniswap/lists'
import { updateVersion } from '../global/actions'
import { acceptListUpdate, addList, fetchTokenList, removeList, selectList } from './actions'

export interface ListsState {
  readonly byUniswapUrl: {
    readonly [url: string]: {
      readonly current: TokenList | null
      readonly pendingUpdate: TokenList | null
      readonly loadingRequestId: string | null
      readonly error: string | null
    }
  }
  // this contains the default list of lists from the last time the updateVersion was called, i.e. the app was reloaded
  readonly lastUniswapInitializedDefaultListOfLists?: string[]
  readonly selectedUniswapListUrl: string | undefined
}

type ListState = ListsState['byUniswapUrl'][string]

const NEW_LIST_STATE: ListState = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P] }

const initialState: ListsState = {
  lastUniswapInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
  byUniswapUrl: {
    ...DEFAULT_LIST_OF_LISTS.reduce<Mutable<ListsState['byUniswapUrl']>>((memo, listUrl) => {
      memo[listUrl] = NEW_LIST_STATE
      return memo
    }, {})
  },
  selectedUniswapListUrl: DEFAULT_TOKEN_LIST_URL
}

export default createReducer(initialState, builder =>
  builder
    .addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
      state.byUniswapUrl[url] = {
        current: null,
        pendingUpdate: null,
        ...state.byUniswapUrl[url],
        loadingRequestId: requestId,
        error: null
      }
    })
    .addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
      const current = state.byUniswapUrl[url]?.current
      const loadingRequestId = state.byUniswapUrl[url]?.loadingRequestId

      // no-op if update does nothing
      if (current) {
        const upgradeType = getVersionUpgrade(current.version, tokenList.version)
        if (upgradeType === VersionUpgrade.NONE) return
        if (loadingRequestId === null || loadingRequestId === requestId) {
          state.byUniswapUrl[url] = {
            ...state.byUniswapUrl[url],
            loadingRequestId: null,
            error: null,
            current: current,
            pendingUpdate: tokenList
          }
        }
      } else {
        state.byUniswapUrl[url] = {
          ...state.byUniswapUrl[url],
          loadingRequestId: null,
          error: null,
          current: tokenList,
          pendingUpdate: null
        }
      }
    })
    .addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
      if (state.byUniswapUrl[url]?.loadingRequestId !== requestId) {
        // no-op since it's not the latest request
        return
      }

      state.byUniswapUrl[url] = {
        ...state.byUniswapUrl[url],
        loadingRequestId: null,
        error: errorMessage,
        current: null,
        pendingUpdate: null
      }
    })
    .addCase(selectList, (state, { payload: url }) => {
      state.selectedUniswapListUrl = url
      // automatically adds list
      if (!state.byUniswapUrl[url]) {
        state.byUniswapUrl[url] = NEW_LIST_STATE
      }
    })
    .addCase(addList, (state, { payload: url }) => {
      if (!state.byUniswapUrl[url]) {
        state.byUniswapUrl[url] = NEW_LIST_STATE
      }
    })
    .addCase(removeList, (state, { payload: url }) => {
      if (state.byUniswapUrl[url]) {
        delete state.byUniswapUrl[url]
      }
      if (state.selectedUniswapListUrl === url) {
        state.selectedUniswapListUrl = url === DEFAULT_TOKEN_LIST_URL ? Object.keys(state.byUniswapUrl)[0] : DEFAULT_TOKEN_LIST_URL
      }
    })
    .addCase(acceptListUpdate, (state, { payload: url }) => {
      if (!state.byUniswapUrl[url]?.pendingUpdate) {
        throw new Error('accept list update called without pending update')
      }
      state.byUniswapUrl[url] = {
        ...state.byUniswapUrl[url],
        pendingUpdate: null,
        current: state.byUniswapUrl[url].pendingUpdate
      }
    })
    .addCase(updateVersion, state => {
      // state loaded from localStorage, but new lists have never been initialized
      if (!state.lastUniswapInitializedDefaultListOfLists) {
        state.byUniswapUrl = initialState.byUniswapUrl
        state.selectedUniswapListUrl = DEFAULT_TOKEN_LIST_URL
      } else if (state.lastUniswapInitializedDefaultListOfLists) {
        const lastInitializedSet = state.lastUniswapInitializedDefaultListOfLists.reduce<Set<string>>(
          (s, l) => s.add(l),
          new Set()
        )
        const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce<Set<string>>((s, l) => s.add(l), new Set())

        DEFAULT_LIST_OF_LISTS.forEach(listUrl => {
          if (!lastInitializedSet.has(listUrl)) {
            state.byUniswapUrl[listUrl] = NEW_LIST_STATE
          }
        })

        state.lastUniswapInitializedDefaultListOfLists.forEach(listUrl => {
          if (!newListOfListsSet.has(listUrl)) {
            delete state.byUniswapUrl[listUrl]
          }
        })
      }

      state.lastUniswapInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS

      if (!state.selectedUniswapListUrl) {
        state.selectedUniswapListUrl = DEFAULT_TOKEN_LIST_URL
        if (!state.byUniswapUrl[DEFAULT_TOKEN_LIST_URL]) {
          state.byUniswapUrl[DEFAULT_TOKEN_LIST_URL] = NEW_LIST_STATE
        }
      }
    })
)
