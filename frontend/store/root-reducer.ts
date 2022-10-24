import { combineReducers, Reducer } from 'redux'

import indexReducer from '@store/app/appSlice'
import authReducer from '@store/auth/authSlice'
import registerReducer from '@store/register/registerSlice'
import categoryReducer from '@store/category/categorySlice'
import calcReducer from '@store/calc/calcSlice'
import productsSlice from '@store/products/productsSlice'

const rootReducer: Reducer = combineReducers({
  app: indexReducer,
  auth: authReducer,
  register: registerReducer,
  category: categoryReducer,
  calc: calcReducer,
  products: productsSlice,
})

export default rootReducer
