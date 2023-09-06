import { RootState } from "@/redux/store";
import { UserDetails } from "@/types/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../../firebase-config";

export const getUser = (): UserDetails | null => {
  const user = useSelector((state: RootState) => state.authSliceReducer.user);
  return user;
}

export const getAccessToken = async (): Promise<string> => {
  onAuthStateChanged(auth, async (firebaseUser) => {
    const accessToken = await firebaseUser!.getIdToken(true)
    localStorage.setItem("accessToken", accessToken)
  });
  const newToken = localStorage.getItem("accessToken") ?? "NULL";
  return newToken
}