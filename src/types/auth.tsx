import { User } from "firebase/auth";

export interface UserDetails {
  username: string;
  email: string;
  accessToken: string;
  emailVerified: boolean;
  metadata: {
    lastLoginAt: string;
    lastSignInTime: string;
  };
  phoneNumber: string;
  photoURL: string;
  uid: string;
}

export interface UserCredentials {
  username: string;
  email: string;
  token: string;
}

export interface LoginUserCredentials {
  email: string;
  password: string;
}

export interface RegisterUserCredentials {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  newPassword: string;
  confirmNewPassword: string;
}

export interface AuthState {
  username: string;
  email: string;
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: null | string;
}

export interface AuthResultState {
  isSuccessful: boolean;
  error: any;
  code?: string;
  user?: User;
}
