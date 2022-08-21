import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { setGlobalError } from '@store/app/appSlice'
import authService from '@services/auth/auth.service'
import { AuthModal, AuthResp } from '@models/Auth'
import { RegisterState } from './types'

export const initialState: RegisterState = {
  isLoading: false,
  register: null,
  registerError: null,
  isError: false,
}

export const fetchRegisterAsync = createAsyncThunk<AuthResp, AuthModal>(
  'register/fetchRegister',
  // @ts-ignore
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      return await authService.internal.register(userData)
    } catch (err: any) {
      if (err.code === 403 || err.code >= 500) {
        dispatch(setGlobalError(err.data || { reason: 'Произошла ошибка сервера' }))
      }
      return rejectWithValue(err)
    }
  },
)

export const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.registerError = null
    },
  },
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
        state.registerError = action.payload
      })
  },
})

export const { clearAuthError } = registerSlice.actions

export default registerSlice.reducer
