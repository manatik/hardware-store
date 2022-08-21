import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setGlobalError } from '@store/app/appSlice'
import authService from '@services/auth/auth.service'
import { AuthModal, AuthResp } from '@models/Auth'
import { AuthState } from './types'

export const initialState: AuthState = {
  isLoading: false,
  auth: null,
  authError: false,
  isError: false,
}

export const fetchAuthAsync = createAsyncThunk<AuthResp, AuthModal>(
  'auth/fetchAuth',
  // @ts-ignore
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      return await authService.internal.login(userData)
    } catch (err: any) {
      if (err.code === 403 || err.code >= 500) {
        dispatch(setGlobalError(err.data || { reason: 'Произошла ошибка сервера' }))
      }
      return rejectWithValue(err)
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.authError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAuthAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.auth = action.payload
      })
      .addCase(fetchAuthAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.authError = action.payload
      })
  },
})

export const { clearAuthError } = authSlice.actions

export default authSlice.reducer
