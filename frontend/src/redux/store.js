import { configureStore } from '@reduxjs/toolkit'
import postSlice from './postSlice'
import userSlice from './userSlice'
import modalSlice from './modelSlice'

export const store = configureStore({
  reducer: {
    posts : postSlice,
    auth : userSlice,
    modal : modalSlice,
  },
})