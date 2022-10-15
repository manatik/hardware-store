import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { usersService } from '@services/users/users.service'
import { UserInfo } from '@models/Users'
import { AppState } from './types'

export const initialState: AppState = {
  globalError: null,
  userInfo: null,
  isLoading: false,
  isError: false,
}

export const fetchUserInfoAsync = createAsyncThunk<UserInfo, string>(
  'app/fetchUserInfo',
  async (cookie, { rejectWithValue }) => {
    try {
      return await usersService.userinfo(cookie)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setGlobalError(state, action) {
      state.globalError = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfoAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.userInfo = action.payload
      })
      .addCase(fetchUserInfoAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { setGlobalError } = appSlice.actions

export default appSlice.reducer
