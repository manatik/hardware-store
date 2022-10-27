import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectCategory = (state: RootState) => state.products

export const getPlywood = createSelector(
  selectCategory,
  (products) => products.plywood,
)

export const getFurniture = createSelector(
  selectCategory,
  (products) => products.furniture,
)

export const getFurnitureFeature = createSelector(
  selectCategory,
  (products) => products.furnitureFeature,
)

export const getFurniturePhotos = createSelector(
  selectCategory,
  (products) => products.furniturePhotos,
)
