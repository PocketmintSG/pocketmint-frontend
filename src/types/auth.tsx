import { User } from "firebase/auth";

export enum Roles {
  "admin",
  "insurance_agent",
  "user"
}

export interface UserDetails {
  uid: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
  registeredAt: string;
  lastLoggedIn: string;
  roles: Roles[];
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
