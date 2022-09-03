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
      const data = await usersService.userinfo(cookie)
      return data
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
        state.userInfo = action.payload.user
      })
      .addCase(fetchUserInfoAsync.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.userInfo = action.payload
      })
  },
})

export const { setGlobalError } = appSlice.actions

export default appSlice.reducer
