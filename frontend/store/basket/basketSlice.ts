import { createSlice } from '@reduxjs/toolkit'
import { BasketState } from '@store/basket/types'
import localStorageService from '@services/localStorage/localStorage.service'

export const initialState: BasketState = {
  entities: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProduct: (state, actions) => {
      state.entities = [...state.entities, actions.payload]
    },
    removeProduct: (state, actions) => {
      state.entities.filter((item) => item.id !== actions.payload.id)
      localStorageService.addBasketElement(state.entities)
    },
  },
})

export const { addProduct, removeProduct } = basketSlice.actions

export default basketSlice.reducer
