import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./authSlice"

export const store = configureStore({
  reducer: {
    authReducer: authSliceReducer
  }
})

export type RootState = ReturnType<typeof store.getState>