import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, LoginUserCredentials, RegisterUserCredentials, UserCredentials } from "src/types/auth";

const initialState: AuthState = { username: "", email: "", token: "", isAuthenticated: false, loading: false, error: null }

const fakeApiLogin = (credentials: LoginUserCredentials): Promise<{ username: string, email: string, token: string }> => {
  return new Promise((resolve, reject) => {
    // Simulate a network delay
    setTimeout(() => {
      if (credentials.email === 'test@gmail.com' && credentials.password === 'hehehaha') {
        console.log("Correct credentials")
        // Resolve promise after delay, assuming successful login
        resolve({
          username: 'Test Username',
          email: credentials.email,
          token: 'ABC123',
        });
      } else {
        console.log("Incorrect credentials")
        // Reject promise after delay, assuming failed login
        reject(new Error('Invalid email or password'));
      }
    }, 2000);
  });
};

export const loginUser = createAsyncThunk<UserCredentials, LoginUserCredentials>(
  'auth/loginUser',
  async (credentials: LoginUserCredentials, thunkAPI) => {
    console.log("Logging in user")
    console.log(credentials)
    try {
      const response = await fakeApiLogin(credentials)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
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
      state.username = action.payload.username; // Or whatever data you have in your payload
      state.email = action.payload.email;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    });
  }
});

export const {
  registerUser, signoutUser
} = authSlice.actions;

export default authSlice.reducer;