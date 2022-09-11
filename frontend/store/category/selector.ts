import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectCategory = (state: RootState) => state.category

export const getCategories = createSelector(
  selectCategory,
  (category) => category.items,
)
