import { combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import filterReducer from './slices/filterSlice'
import notificationsReducer from './slices/notificationsSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  notifications: notificationsReducer,
})

export default rootReducer 