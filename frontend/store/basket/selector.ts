import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectApp = (state: RootState) => state.basket

export const getBasketEntities = createSelector(
  selectApp,
  (basket) => basket.entities,
)
