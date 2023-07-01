import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginUserCredentials, RegisterUserCredentials } from "src/types/auth";

const initialState = { username: "", email: "", token: "" }

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginUser: {
      reducer: (state, action: PayloadAction<LoginUserCredentials>) => {
        console.log("Logging in user")
        console.log(action)
      },
      prepare: (email, password) => {
        return {
          payload: {
            email, password
          }
        }
      }
    },
    registerUser: {
      reducer: (state, action: PayloadAction<RegisterUserCredentials>) => {
        console.log("Registering user")
        console.log(action)
      },
      prepare: (username, email, password) => {
        return {
          payload: {
            username, email, password
          }
        }
      }
    },
    signoutUser: (state) => {
      console.log("Signing out user")
    }
  },
});

export const {
  loginUser, registerUser, signoutUser
} = authSlice.actions;
export default authSlice.reducer;