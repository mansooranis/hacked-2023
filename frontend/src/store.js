import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './feature/state/stateSlice'
export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
})