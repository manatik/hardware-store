import { createSlice } from '@reduxjs/toolkit'
import { BasketState } from '@store/basket/types'
import localStorageService from '@services/localStorage/localStorage.service'
import { setCookie } from '@utils/cookie'

export const initialState: BasketState = {
  entities: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    initialBasket: (state, action) => {
      if (action.payload) {
        state.entities = JSON.parse(action.payload)
      }
    },
    addProduct(state, actions) {
      state.entities.push(actions.payload)
      setCookie('basket', state.entities)
    },
    removeProduct(state, actions) {
      state.entities.filter((item) => item.id !== actions.payload.id)
      localStorageService.addBasketElement(state.entities)
    },
  },
})

export const { addProduct, removeProduct, initialBasket } = basketSlice.actions

export default basketSlice.reducer
