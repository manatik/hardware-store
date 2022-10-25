import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { isDev } from 'utils/env'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist/lib/constants'
import rootReducer from '@store/root-reducer'

const reducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    }
  }
  return rootReducer(state, action)
}

const customMiddleware: any[] = []

if (isDev) {
  customMiddleware.push(logger)
}

const makeConfiguredStore = (reducer: any) => configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
    .concat(...customMiddleware),
})

const makeStore = () => {
  const isServer = typeof window === 'undefined'

  if (isServer) {
    return makeConfiguredStore(reducer)
  }

  const persistConfig = {
    key: 'root',
    whitelist: ['basket'],
    storage,
  }

  const persistedReducer = persistReducer(persistConfig, reducer)
  const store = makeConfiguredStore(persistedReducer)

  // @ts-ignore
  store.__persistor = persistStore(store)

  return store
}

export type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>

export const wrapper = createWrapper(makeStore)
