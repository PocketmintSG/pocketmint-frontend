import { UserDetails } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: UserDetails | null;
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
    clearUserData: (state) => {
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      }
    }
  },
});

export const { setUser, clearUserData, updateUser } = authSlice.actions;

export default authSlice.reducer;
