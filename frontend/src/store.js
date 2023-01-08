import { configureStore } from '@reduxjs/toolkit'
import themeSlice from './feature/state/stateSlice'
import roomSlice from './feature/room/roomslice'
export const store = configureStore({
  reducer: {
    theme: themeSlice,
    room: roomSlice,
  },
})