import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import localStorageService from '@services/localStorage/localStorage.service'

import authService from '@services/auth/auth.service'
import { AuthModal, AuthResp } from '@models/Auth'
import { RegisterState } from './types'

export const initialState: RegisterState = {
  isLoading: false,
  register: null,
  isError: false,
}

export const fetchRegisterAsync = createAsyncThunk<AuthResp, AuthModal>(
  'register/fetchRegister',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await authService.register(userData)
      localStorageService.removeAuthData()
      localStorageService.setTokens(data.accessToken)
      return data
    } catch (err) {
      return rejectWithValue(err)
    }
  },
)

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegisterAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchRegisterAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.register = action.payload
      })
      .addCase(fetchRegisterAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.register = action.payload
      })
  },
})

export default registerSlice.reducer
