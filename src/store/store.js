import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import postReducer from 'store/post'
import userReducer from 'store/user'

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
})

// Add middleware the end of the array
const middleware = [...getDefaultMiddleware()]

const devMode = process.env.NODE_ENV === 'development'

export default configureStore({
  reducer: rootReducer,
  middleware,
  devTools: devMode,
})
