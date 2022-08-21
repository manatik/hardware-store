import { createSlice } from '@reduxjs/toolkit'

import { AppState } from './types'

export const initialState: AppState = {
  globalError: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalError(state, action) {
      state.globalError = action.payload
    },
  },
})

export const { setGlobalError } = appSlice.actions

export default appSlice.reducer
