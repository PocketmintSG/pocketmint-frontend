import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { loginUserAPI } from "src/api/auth";
import { useLocalStorage } from "src/api/storage";
import { AuthState, LoginUserCredentials, RegisterUserCredentials, UserCredentials } from "src/types/auth";

const initialState = {
  user: ""
}
const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUserData: (state, action) => {
      state.user = ""
    }
  },
});

export const {
  setUser, clearUserData
} = authSlice.actions;

export default authSlice.reducer;