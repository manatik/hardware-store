import { createSlice } from '@reduxjs/toolkit'
import { BasketState } from '@store/basket/types'
import localStorageService from '@services/localStorage/localStorage.service'
import { PlywoodItem } from '@models/Products'

export const initialState: BasketState = {
  entities: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    initBasket: (state) => {
      const basket = localStorageService.getBasket()
      if (basket) {
        state.entities = JSON.parse(basket)
      }
    },
    addProduct: (state, actions) => {
      const basket = localStorageService.getBasket()
      const curentItem = actions.payload
      let updateCurrent: boolean = false

      if (basket) {
        const result = JSON.parse(basket).map((item: PlywoodItem) => {
          const isId = item.id === curentItem.id
          const isColor = item.currentColor === curentItem.currentColor
          const isFormat = item.format === curentItem.format
          const isSorts = item.sort === curentItem.sort
          const isWidthPlywood = item.widthPlywood === curentItem.widthPlywood
          const sum = curentItem.count + item.count

          if (isId && isColor && isFormat && isSorts && isWidthPlywood) {
            updateCurrent = true
            return { ...item, count: sum }
          }
          return item
        })

        if (!updateCurrent) {
          result.push(curentItem)
        }

        state.entities = result
      } else {
        state.entities.push(curentItem)
      }

      localStorageService.addBasketElement(state.entities)
    },
    removeProduct: (state, actions) => {
      const currentId = actions.payload
      state.entities = state.entities.filter((item) => {
        // @ts-ignore
        const itemId = String(item.id) + item.sort
          // @ts-ignore
          + item.widthPlywood + item.format + item.currentColor
        return itemId !== currentId
      })
      localStorageService.addBasketElement(state.entities)
    },
    incrementCount: (state, actions) => {
      const currentId = actions.payload
      state.entities = state.entities.map((item) => {
        // @ts-ignore
        const itemId = String(item.id) + item.sort
          // @ts-ignore
          + item.widthPlywood + item.format + item.currentColor

        if (currentId === itemId) {
          // @ts-ignore
          return { ...item, count: item.count + 1 }
        }
        return item
      })
      localStorageService.addBasketElement(state.entities)
    },
    decrementCount: (state, actions) => {
      const currentId = actions.payload
      state.entities = state.entities.map((item) => {
        // @ts-ignore
        const itemId = String(item.id) + item.sort
          // @ts-ignore
          + item.widthPlywood + item.format + item.currentColor

        if (currentId === itemId) {
          // @ts-ignore
          if (item.count === 0) return item
          // @ts-ignore
          return { ...item, count: item.count - 1 }
        }
        return item
      })

      localStorageService.addBasketElement(state.entities)
    },
  },
})

export const {
  addProduct,
  removeProduct,
  initBasket,
  incrementCount,
  decrementCount,
} = basketSlice.actions

export default basketSlice.reducer
