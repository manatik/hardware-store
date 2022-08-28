import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectApp = (state: RootState) => state.auth

export const getAuthInfo = createSelector(
  selectApp,
  (register) => register.auth,
)

export const getAuthError = createSelector(
  selectApp,
  (register) => register.isError,
)

export const getAuthLoading = createSelector(
  selectApp,
  (register) => register.isLoading,
)
