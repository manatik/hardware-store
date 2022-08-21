import {
  Action, AnyAction, configureStore, ThunkAction,
} from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import logger from 'redux-logger'
import { isDev } from 'utils/env'
import rootReducer from '@store/root-reducer'

const reducer = (state: ReturnType<typeof rootReducer>, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    }
    return nextState
  }
  return rootReducer(state, action)
}

const customMiddleware: any[] = []

if (isDev) {
  customMiddleware.push(logger)
}

export const makeStore = () => configureStore({
  // @ts-ignore
  reducer,
  // @ts-ignore
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(...customMiddleware),
})

type Store = ReturnType<typeof makeStore>

export type AppDispatch = Store['dispatch']
export type RootState = ReturnType<Store['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >

export const wrapper = createWrapper(makeStore, { debug: true })
