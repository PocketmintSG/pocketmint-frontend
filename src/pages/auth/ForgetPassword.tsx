import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { ButtonFilled } from "src/components/general/buttons/ButtonFilled";
import { FormInput } from "src/components/general/form/FormInput";
import { useAuthentication } from "src/hooks/useAuthentication";
import { LoginUserCredentials } from "src/types/auth";
import { BiArrowBack } from "react-icons/bi";

import AuthScreenCover from "src/assets/auth/AuthScreenCover.svg";
import PocketmintLogo from "src/assets/common/Logo_PocketMint.svg";
import { emailSchema } from "src/utils/auth/Validation";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { triggerGenericNotification } from "src/utils/Notifications";

export const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [emailState, setEmailState] = useState<string>("");

  const { requestEmailResetCall } = useAuthentication();

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

  const handleResetEmailRequest = async (
    values: Omit<LoginUserCredentials, "password">,
    actions: FormikHelpers<Omit<LoginUserCredentials, "password">>,
  ) => {
    const { email } = values;
    requestEmailResetCall(email)
      .then((res) => {
        setStep(2);
        setEmailState(email);
      })
      .catch((err) =>
        triggerGenericNotification("An error occurred!", err, "danger"),
      );
  };

  return (
    <div className="flex md:flex-row h-screen w-screen">
      <div className="w-[50vw]">
        <div className="w-full">
          <img
            src={PocketmintLogo}
            className="ml-10 mt-10 cursor-pointer"
            onClick={() => triggerPocketmintRedirectNotification()}
          />
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-8 pl-[21%] pr-[21%] mt-[8%]">
            <div className="flex flex-col">
              <p className="text-2xl font-medium">Forgot your password?</p>
              <p className="text-xl font-normal text-darkGrey-600 whitespace-nowrap">
                No worries, we'll send you a link to reset it.
              </p>
            </div>
            <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={emailSchema}
              onSubmit={handleResetEmailRequest}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <FormInput
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter your email"
                  />
                  <ButtonFilled type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <FadeLoader /> : "Send Reset Link"}
                  </ButtonFilled>
                </Form>
              )}
            </Formik>
            <span
              className="self-center flex flex-row gap-3 items-center font-medium hover:underline hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              <BiArrowBack />
              Back to Login
            </span>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-8 pl-[21%] pr-[21%] mt-[8%]">
            <div className="flex flex-col">
              <p className="text-2xl font-medium">Password sent!</p>
              <p className="text-xl font-normal text-darkGrey-600 whitespace-nowrap">
                We sent a reset link to <br />{" "}
                <span className="font-medium">{emailState}</span>
              </p>
            </div>
            <span className="self-start flex flex-row gap-3 items-center font-medium">
              Didn't receive the email?
              <span
                className="underline font-bold hover:cursor-pointer"
                onClick={() => setStep(1)}
              >
                Click to resend.
              </span>
            </span>
          </div>
        )}
      </div>
      <img className="h-screen w-[50vw] object-cover" src={AuthScreenCover} />
    </div>
  );
};
