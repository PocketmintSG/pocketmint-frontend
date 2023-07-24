import { createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUserData: (state, action) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUserData } = authSlice.actions;

export default authSlice.reducer;
