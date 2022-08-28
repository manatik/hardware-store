import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectApp = (state: RootState) => state.register

export const getRegisterInfo = createSelector(
  selectApp,
  (register) => register.register,
)

export const getRegisterError = createSelector(
  selectApp,
  (register) => register.isError,
)

export const getRegisterLoading = createSelector(
  selectApp,
  (register) => register.isLoading,
)
