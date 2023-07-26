import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/auth";
import { useSelector } from "react-redux";

export const getUser = (): UserDetails | null => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user);
  return user;
}

export const getAccessToken = (): string => {
  return localStorage.getItem("accessToken") ?? "NULL";
}