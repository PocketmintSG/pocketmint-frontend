import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAuthentication } from "src/hooks/useAuthentication";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";
import { RegisterUserCredentials } from "src/types/auth";
import FadeLoader from "react-spinners/FadeLoader";
import { ButtonFilled } from "src/components/general/buttons/ButtonFilled";
import { ButtonGhost } from "src/components/general/buttons/ButtonGhost";
import { FormInput } from "src/components/general/form/FormInput";

import GoogleLogoUrl from "src/assets/common/logos/GoogleColored.svg";
import AuthScreenCover from "src/assets/auth/AuthScreenCover.svg";
import PocketmintLogo from "src/assets/common/Logo_PocketMint.svg";

import { emailSchema, passwordSchema } from "src/utils/auth/Validation";
import { useSpring, animated, config } from "react-spring";
import { ScreenSpinner } from "src/components/auth/ScreenSpinner";

interface RegisterUserCredentialsWithPasswordConfirmation
  extends RegisterUserCredentials {
  confirmPassword: string;
}

export const Register = () => {
  const { isLoading, signUpCall, authenticateWithGoogleCall, readGoogleToken } =
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
    values: RegisterUserCredentialsWithPasswordConfirmation,
    actions: FormikHelpers<RegisterUserCredentialsWithPasswordConfirmation>,
  ) => {
    const { username, email, password } = values;
    console.log(email, password);
    signUpCall({ username, email, password })
      .then((res) => {
        console.log(res);
        if (res.isSuccessful) {
          console.log("User registered sucessfully");
          Store.addNotification({
            title: `Successfully registered as ${username}!`,
            message: "An email has been sent to your address for verification!",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          navigate("/login");
        } else if (
          res.error &&
          res.error.code === "auth/email-already-in-use"
        ) {
          Store.addNotification({
            title: "User already exists!",
            message: `Did you forget your password?`,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
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

  const handleSignUpWithGoogle = async () => {
    await authenticateWithGoogleCall();
  };

  useLayoutEffect(() => {
    readGoogleToken()
      .then((res) => {
        if (res.isSuccessful) {
          Store.addNotification({
            title: `Welcome to Pocketmint!`,
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 3000,
            },
          });
          navigate("/dashboard");
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
    username: Yup.string().required("Username is required"),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
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
                <p className="text-2xl font-medium">Create Account</p>
                <p className="text-xl font-normal text-darkGrey-600 whitespace-nowrap">
                  Start your financial journey with us.
                </p>
              </div>
              <ButtonGhost
                className="font-normal"
                onClick={() => handleSignUpWithGoogle()}
              >
                <div className="flex flex-row items-center content-center justify-center gap-2">
                  <img src={GoogleLogoUrl} />
                  Sign up with Google
                </div>
              </ButtonGhost>
              <Formik
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form className="flex flex-col gap-5">
                    <FormInput name="username" type="text" label="Username" />
                    <FormInput name="email" type="email" label="Email" />
                    <FormInput
                      name="password"
                      type="password"
                      label="Password"
                    />
                    <FormInput
                      name="confirmPassword"
                      type="password"
                      label="Confirm Password"
                    />
                    <ButtonFilled
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-5"
                    >
                      {isSubmitting ? <FadeLoader /> : "Register"}
                    </ButtonFilled>
                  </Form>
                )}
              </Formik>
              <span className="self-center">
                Already have an account?{" "}
                <Link className="font-medium underline" to="/login">
                  Login
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
