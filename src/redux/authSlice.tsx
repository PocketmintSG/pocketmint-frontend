import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { User } from "firebase/auth";
import { loginUserAPI } from "src/api/auth";
import { useLocalStorage } from "src/api/storage";
import { AuthState, LoginUserCredentials, RegisterUserCredentials, UserCredentials } from "src/types/auth";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUserData: (state, action) => {
      state.user = null
    }
  },
});

export const {
  setUser, clearUserData
} = authSlice.actions;

export default authSlice.reducer;