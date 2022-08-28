import { combineReducers } from 'redux'

import indexReducer from '@store/app/appSlice'
import authReducer from '@store/auth/authSlice'
import registerReducer from '@store/register/registerSlice'

const rootReducer = combineReducers({
  app: indexReducer,
  auth: authReducer,
  register: registerReducer,
})

export default rootReducer
