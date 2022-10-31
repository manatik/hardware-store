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

export const getFurnitureParams = createSelector(
  selectCategory,
  (products) => products.furnitureParams,
)

export const getFurniturePhotos = createSelector(
  selectCategory,
  (products) => products.furniturePhotos,
)

export const getPlywoodItem = createSelector(
  selectCategory,
  (products) => products.plywoodItem,
)

export const getFurnitureItem = createSelector(
  selectCategory,
  (products) => products.furnitureItem,
)
