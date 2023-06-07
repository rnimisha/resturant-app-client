import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userSlice from '../features/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const reducer = combineReducers({
  user: userSlice
})

const persistedReducer = persistReducer(persistConfig, reducer )

export const store = configureStore({
  reducer: persistedReducer,
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch