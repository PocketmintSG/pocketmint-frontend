import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/auth";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const getUser = (): UserDetails | null => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user);
  return user;
}

export const getAccessToken = async (): Promise<string> => {
  const auth = getAuth()
  const user = auth.currentUser
  if (!user) {
    throw new Error("User is logged out")
  }
  const accessToken = await user!.getIdToken(true)
  localStorage.setItem("accessToken", accessToken)
  const newToken = localStorage.getItem("accessToken") ?? "NULL";
  return newToken
}