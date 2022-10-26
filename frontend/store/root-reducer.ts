import { combineReducers, Reducer } from 'redux'

import indexReducer from '@store/app/appSlice'
import authReducer from '@store/auth/authSlice'
import registerReducer from '@store/register/registerSlice'
import categoryReducer from '@store/category/categorySlice'
import calcReducer from '@store/calc/calcSlice'
import productsSlice from '@store/products/productsSlice'
import basketSlice from '@store/basket/basketSlice'

const rootReducer: Reducer = combineReducers({
  app: indexReducer,
  auth: authReducer,
  register: registerReducer,
  category: categoryReducer,
  calc: calcReducer,
  products: productsSlice,
  basket: basketSlice,
})

export default rootReducer
