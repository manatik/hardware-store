import { combineReducers } from 'redux'

import indexReducer from '@store/app/appSlice'
import authReducer from '@store/auth/authSlice'

const rootReducer = combineReducers({
  app: indexReducer,
  auth: authReducer,
})

export default rootReducer
