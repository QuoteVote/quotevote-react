import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import localForage from 'localforage'
import postReducer from 'store/post'
import userReducer from 'store/user'

const rootReducer = combineReducers({
  user: userReducer,
  post: postReducer,
})

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// Add middleware the end of the array
const middleware = [
  ...getDefaultMiddleware({ serializableCheck: false }),
]

const store = configureStore({
  reducer: persistedReducer,
  middleware,
  devTools: process.env.NODE_ENV === 'development',
})

export const persistor = persistStore(store)

export default store
