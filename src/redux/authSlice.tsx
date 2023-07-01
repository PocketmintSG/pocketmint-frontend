import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { loginUserAPI } from "src/api/auth";
import { useLocalStorage } from "src/api/storage";
import { AuthState, LoginUserCredentials, RegisterUserCredentials, UserCredentials } from "src/types/auth";

const initialState: AuthState = { username: "", email: "", token: "", isAuthenticated: false, loading: false, error: null }

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginUserCredentials, thunkAPI) => {
    console.log("Logging in user")
    console.log(credentials)
    try {
      const response = await loginUserAPI(credentials)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error instanceof AxiosError ? error.response?.data?.message || error.message : error.message });
    }
  }
)

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    registerUser: {
      reducer: (state, action: PayloadAction<RegisterUserCredentials>) => {
        console.log("Registering user")
        console.log(action)
        return state
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
      return initialState
    }
  },
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.username = action.payload.data.username;
      state.email = action.payload.data.email;
      state.token = action.payload.data.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.error;
    });
  }
});

export const {
  registerUser, signoutUser
} = authSlice.actions;

export default authSlice.reducer;