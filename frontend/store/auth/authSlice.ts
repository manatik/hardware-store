import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import localStorageService from '@services/localStorage/localStorage.service'

import authService from '@services/auth/auth.service'
import { AuthModal, AuthResp } from '@models/Auth'
import { AuthState } from './types'

export const initialState: AuthState = {
  isLoading: false,
  auth: null,
  isError: false,
}

export const fetchAuthAsync = createAsyncThunk<AuthResp, AuthModal>(
  'auth/fetchAuth',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(userData)
      localStorageService.removeAuthData()
      localStorageService.setTokens(data.accessToken)
      return data
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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
        // @ts-ignore
        state.auth = action.payload
      })
  },
})

export default authSlice.reducer
