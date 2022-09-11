import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectApp = (state: RootState) => state.format

export const getFormatIsError = createSelector(
  selectApp,
  (format) => format.isError,
)

export const getFormats = createSelector(
  selectApp,
  (format) => format.items,
)
