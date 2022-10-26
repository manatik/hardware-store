import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store/store'

const selectCalc = (state: RootState) => state.calc

export const getFormats = createSelector(
  selectCalc,
  (calc) => calc.formats,
)

export const getSorts = createSelector(
  selectCalc,
  (calc) => calc.sorts,
)

export const getTypes = createSelector(
  selectCalc,
  (calc) => calc.types,
)

export const getWidthPlywood = createSelector(
  selectCalc,
  (calc) => calc.widthPlywood,
)

export const getCoatingDensity = createSelector(
  selectCalc,
  (calc) => calc.coatingDensity,
)

export const getPhotos = createSelector(
  selectCalc,
  (calc) => calc.photos,
)
