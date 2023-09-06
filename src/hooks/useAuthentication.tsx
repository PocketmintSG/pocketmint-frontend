import {
  GoogleAuthProvider,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getRedirectResult,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearUserData, setUser } from "../redux/authSlice";
import { auth } from "../../firebase-config";
import {
  AuthResultState,
  LoginUserCredentials,
  RegisterUserCredentials,
} from "src/types/auth";
import { loginUserAPI, registerUserAPI } from "@/api/auth";
import { StatusEnum } from "@/types/api";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();

  const [isLoading, setIsLoading] = useState(false);
  const [hasBegunResetPasswordProcess, setHasBegunResetPasswordProcess] =
    useState(false); // Stop random access of reset password page

  const signInCall = async ({
    email,
    password,
  }: LoginUserCredentials): Promise<AuthResultState> => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then(async (firebaseRes) => {
        const { user } = firebaseRes;
        const accessToken = await user.getIdToken();
        if (!user.emailVerified) {
          return {
            isSuccessful: false,
            error: Error("User is not verified!"),
            code: "auth/user-not-verified",
          };
        }
        const apiRes = await loginUserAPI(accessToken)
        if (apiRes.data.status !== StatusEnum.SUCCESS) {
          return {
            isSuccessful: false,
            error: apiRes.data.data.message,
          };
        }
        const userDetails = apiRes.data.data.user;
        dispatch(setUser({
          uid: userDetails._id,
          username: userDetails.username,
          firstName: userDetails.first_name,
          lastName: userDetails.last_name,
          email: userDetails.email,
          profilePicture: userDetails.profile_picture,
          registeredAt: userDetails.registered_at,
          lastLoggedIn: userDetails.last_logged_in,
          roles: userDetails.roles
        }));
        localStorage.setItem("accessToken", accessToken);
        return {
          isSuccessful: true,
          error: null,
        };
      })
      .catch((err) => {
        return {
          isSuccessful: false,
          error: err.response.data.detail.message,
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signUpCall = async ({
    username,
    firstName,
    lastName,
    email,
    password,
  }: RegisterUserCredentials): Promise<AuthResultState> => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const userAccessToken = auth.currentUser.accessToken;
        const res = await registerUserAPI(userAccessToken, username, firstName, lastName)
        if (res.data.status !== StatusEnum.SUCCESS) {
          return {
            isSuccessful: false,
            error: res.data.data.message,
          };
        }
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        return {
          isSuccessful: true,
          error: null,
        };
      })
      .then((res) => {
        sendEmailVerification(auth.currentUser);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return {
          isSuccessful: false,
          error: err,
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const authenticateWithGoogleCall = async () => {
    signInWithRedirect(auth, provider);
  };

  const readGoogleToken = async () => {
    setIsLoading(true);
    return getRedirectResult(auth)
      .then(async (res) => {
        const user = res?.user;
        if (!user) {
          return {
            isSuccessful: false,
            error: Error("User is not defined."),
            code: "auth/user-not-defined"
          }
        }

        const accessToken = await user.getIdToken();
        if (!user.emailVerified) {
          return {
            isSuccessful: false,
            error: Error("User is not verified!"),
            code: "auth/user-not-verified",
          };
        }
        const userAccessToken = await user.getIdToken();
        const apiRes = await loginUserAPI(userAccessToken)
        if (apiRes.data.status !== StatusEnum.SUCCESS) {
          return {
            isSuccessful: false,
            error: apiRes.data.data.message,
            code: "auth/generic-auth-error"
          };
        }
        const userDetails = apiRes.data.data.user;
        dispatch(setUser({
          uid: userDetails._id,
          username: userDetails.username,
          firstName: userDetails.first_name,
          lastName: userDetails.last_name,
          email: userDetails.email,
          profilePicture: userDetails.profile_picture,
          registeredAt: userDetails.registered_at,
          lastLoggedIn: userDetails.last_logged_in,
          roles: userDetails.roles
        }));
        localStorage.setItem("accessToken", accessToken);
        return {
          isSuccessful: true,
          error: null,
          code: "auth/successful-authentication"
        };
      })
      .catch((err) => {
        return {
          isSuccessful: false,
          error: err,
          code: "auth/generic-auth-error"
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const signOutCall = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      dispatch(clearUserData(null));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const requestEmailResetCall = async (email: string) => {
    setIsLoading(true);
    setHasBegunResetPasswordProcess(true);
    return sendPasswordResetEmail(auth, email);
  };

  const resetPasswordAfterEmailConfirmation = async (
    oobCode: string | null,
    newPasword: string,
  ) => {
    if (oobCode === null) {
      throw Error(
        "Invalid oobCode provided! Please reset your password from the login page and not directly through the URL.",
      );
    }
    return confirmPasswordReset(auth, oobCode, newPasword);
  };

  const getResetPasswordProcessStatus = () => {
    return hasBegunResetPasswordProcess;
  };

  const stopResetPasswordProcess = () => {
    setHasBegunResetPasswordProcess(false);
  };

  return {
    isLoading,
    signInCall,
    signUpCall,
    signOutCall,
    requestEmailResetCall,
    resetPasswordAfterEmailConfirmation,
    stopResetPasswordProcess,
    getResetPasswordProcessStatus,
    authenticateWithGoogleCall,
    readGoogleToken,
  };
};
