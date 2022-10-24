import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectCategory = (state: RootState) => state.products

export const getPlywood = createSelector(
  selectCategory,
  (products) => products.plywood,
)
