import { combineReducers } from 'redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import localForage from 'localforage'

import userReducer from 'store/user'
import uiReducer from 'store/ui'
import chatReducer from 'store/chat'

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  chat: chatReducer,
})

const persistConfig = {
  key: 'root',
  storage: localForage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// To add middleware the end of the array
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
