import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectApp = (state: RootState) => state.app

export const getUserInfo = createSelector(
  selectApp,
  (register) => register.userInfo,
)
