import { GoogleAuthProvider, User, confirmPasswordReset, createUserWithEmailAndPassword, getRedirectResult, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUserData, setUser } from "../redux/authSlice";
import { auth } from "../../firebase-config";
import { AuthResultState, LoginUserCredentials, RegisterUserCredentials } from "src/types/auth"
import { loginUserAPI } from "src/api/auth";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider()

  const [isLoading, setIsLoading] = useState(false)
  const [hasBegunResetPasswordProcess, setHasBegunResetPasswordProcess] = useState(false) // Stop random access of reset password page

  const signInCall = async ({ email, password }: LoginUserCredentials): Promise<AuthResultState> => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password).then((res) => {
      const { user } = res;
      if (!user.emailVerified) {
        return {
          isSuccessful: false,
          error: Error("User is not verified!"),
          code: "auth/user-not-verified"
        }
      }
      if (!user) {
        return {
          isSuccessful: false,
          error: Error("User credentials are incorrect! Did you forget your password?"),
          code: "auth/user-not-found"
        }
      }
      user.getIdToken().then(async (token: string) => {
        console.log(token)
        const user = await loginUserAPI(token)
        dispatch(setUser(user))
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

  const signUpCall = async ({ username, email, password }: RegisterUserCredentials): Promise<AuthResultState> => {
    // setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password).then(() => {
      updateProfile(auth.user, {
        displayName: username
      })
      return {
        isSuccessful: true,
        error: null
      }
    }).then((res) => {
      sendEmailVerification(auth.currentUser)
      return res
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

  const authenticateWithGoogleCall = async () => {
    signInWithRedirect(auth, provider)
  }

  const readGoogleToken = async () => {
    setIsLoading(true)
    return getRedirectResult(auth).then((res) => {
      const user = res?.user;
      if (user) {
        dispatch(setUser(user))
        return {
          isSuccessful: true,
          error: null,
        }
      } else {
        // User is not signed in
        return {
          isSuccessful: false,
          error: null,
        }
      }
    }).catch((err) => {
      return {
        isSuccessful: false,
        error: err
      }
    }).finally(() => {
      setIsLoading(false)
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

  const requestEmailResetCall = async (email: string) => {
    setIsLoading(true)
    setHasBegunResetPasswordProcess(true)
    return sendPasswordResetEmail(auth, email)
  }

  const resetPasswordAfterEmailConfirmation = async (oobCode: string | null, newPasword: string) => {
    if (oobCode === null) {
      throw Error("Invalid oobCode provided! Please reset your password from the login page and not directly through the URL.")
    }
    return confirmPasswordReset(auth, oobCode, newPasword)
  }

  const getResetPasswordProcessStatus = () => {
    return hasBegunResetPasswordProcess
  }

  const stopResetPasswordProcess = () => {
    setHasBegunResetPasswordProcess(false)
  }

  return { isLoading, signInCall, signUpCall, signOutCall, requestEmailResetCall, resetPasswordAfterEmailConfirmation, stopResetPasswordProcess, getResetPasswordProcessStatus, authenticateWithGoogleCall, readGoogleToken }
}