import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUserData, setUser } from "../redux/authSlice";
import { auth } from "../../firebase-config";
import { AuthResultState, LoginUserCredentials, RegisterUserCredentials } from "src/types/auth"

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false)

  const signInCall = async ({ email, password }: LoginUserCredentials): Promise<AuthResultState> => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      const { user } = res;
      dispatch(setUser(user))
      return {
        isSuccessful: true,
        error: null
      }
    }).catch((err) => {
      console.log(err)
      return {
        isSuccessful: false,
        error: err
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const signUpCall = async ({ username, email, password }: RegisterUserCredentials): Promise<AuthResultState> => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then((res) => {
      const { user } = res;
      dispatch(setUser(user))
    }).then(() => {
      updateProfile(auth.user, {
        displayName: username
      })
      return {
        isSuccessful: true,
        error: null
      }
    }).catch((err) => {
      console.log(err)
      return {
        isSuccessful: false,
        error: err
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }

  const signOutCall = async () => {
    setIsLoading(true)
    try {
      await signOut(auth)
      dispatch(clearUserData(null))
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false)
    }
  }

  return { isLoading, signInCall, signUpCall, signOutCall }
}