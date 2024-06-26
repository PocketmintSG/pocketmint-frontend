import { Form, Formik, FormikHelpers } from "formik";
import React, { useLayoutEffect } from "react";
import { Store } from "react-notifications-component";
import { Link, useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { ButtonFilled } from "src/components/general/buttons/ButtonFilled";
import { ButtonGhost } from "src/components/general/buttons/ButtonGhost";
import { FormInput } from "src/components/general/form/FormInput";
import { useAuthentication } from "src/hooks/useAuthentication";
import { LoginUserCredentials } from "src/types/auth";
import * as Yup from "yup";

import GoogleLogoUrl from "src/assets/common/logos/GoogleColored.svg";
import AuthScreenCover from "src/assets/auth/AuthScreenCover.svg";
import PocketmintLogo from "src/assets/common/Logo_PocketMint.svg";
import { emailSchema, passwordLoginSchema } from "src/utils/auth/Validation";
import { ScreenSpinner } from "src/components/auth/ScreenSpinner";

export const Login = () => {
  const { isLoading, signInCall, authenticateWithGoogleCall, readGoogleToken } =
    useAuthentication();

  const navigate = useNavigate();

  const triggerPocketmintRedirectNotification = () => {
    Store.addNotification({
      title: "Visit Pocketmint.co!",
      message:
        "Learn more about personal finance at https://www.pocketmint.co/",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
      },
    });
  };

  const handleSubmit = async (
    values: LoginUserCredentials,
    actions: FormikHelpers<LoginUserCredentials>,
  ) => {
    const { email, password } = values;
    signInCall({ email, password })
      .then((res) => {
        if (res.isSuccessful) {
          Store.addNotification({
            title: "Successfully logged in!",
            message: "Welcome back to Pocketmint!",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          navigate("/");
        } else if (res.error.code === "auth/user-not-found") {
          Store.addNotification({
            title: "User not found!",
            message: `We can't find your credentials. Did you enter them correctly?`,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
        } else if (res.code === "auth/user-not-verified") {
          Store.addNotification({
            title: "User not verified!",
            message: `Please verify your account first using the link sent to your email!`,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
        } else if (res.error.code === "auth/wrong-password") {
          Store.addNotification({
            title: "Wrong email or password!",
            message: `Please check your entered credentials!`,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
        } else {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        console.log("An error occurred: ", err);
        Store.addNotification({
          title: "Error occurred!",
          message: `${err}`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
      });
  };

  const handleSignInWithGoogle = async () => {
    await authenticateWithGoogleCall();
  };

  useLayoutEffect(() => {
    readGoogleToken()
      .then((res) => {
        if (res.isSuccessful) {
          Store.addNotification({
            title: `Welcome back to Pocketmint!`,
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          navigate("/");
        } else if (res.error && res.code && res.code === "auth/user-not-defined") {
          return;
        } else if (res.error) {
          throw new Error(res.error);
        }
      })
      .catch((err) => {
        Store.addNotification({
          title: "Error occurred!",
          message: `${err}`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
          },
        });
      });
  }, []);

  const validationSchema = Yup.object().shape({
    email: emailSchema,
    password: passwordLoginSchema,
  });

  return (
    <div className="flex md:flex-row h-screen w-screen">
      {isLoading && <ScreenSpinner />}

      {!isLoading && (
        <>
          <div className="w-[50vw]">
            <div className="w-full">
              <img
                src={PocketmintLogo}
                className="ml-10 mt-10 cursor-pointer"
                onClick={() => triggerPocketmintRedirectNotification()}
              />
            </div>
            <div className="flex flex-col gap-8 pl-[21%] pr-[21%] mt-[8%]">
              <div className="flex flex-col">
                <p className="text-2xl font-medium">Welcome back</p>
                <p className="text-xl font-normal text-darkGrey-600 whitespace-nowrap">
                  Continue your financial journey with us.
                </p>
              </div>
              <ButtonGhost
                className="font-normal"
                onClick={() => handleSignInWithGoogle()}
              >
                <div className="flex flex-row items-center content-center justify-center gap-2">
                  <img src={GoogleLogoUrl} />
                  Sign in with Google
                </div>
              </ButtonGhost>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-8">
                    <FormInput name="email" type="email" label="Email" />
                    <div>
                      <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        className="mb-8"
                      />
                      <button
                        className="text-caption text-darkGrey-600 text-left"
                        onClick={() => navigate("/forget-password")}
                      >
                        Forgot password?
                      </button>
                    </div>
                    <ButtonFilled type="submit" disabled={isSubmitting}>
                      {isSubmitting ? <FadeLoader /> : "Login"}
                    </ButtonFilled>
                  </Form>
                )}
              </Formik>
              <span className="self-center">
                Don't have one?{" "}
                <Link className="font-medium underline" to="/register">
                  Create an account.
                </Link>
              </span>
            </div>
          </div>
          <img
            className="h-screen w-[50vw] object-cover"
            src={AuthScreenCover}
          />
        </>
      )}
    </div>
  );
};
