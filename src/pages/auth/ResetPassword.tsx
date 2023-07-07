import { Form, Formik, FormikHelpers } from 'formik';
import React from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import { ButtonFilled } from "src/components/general/buttons/ButtonFilled";
import { FormInput } from "src/components/general/form/FormInput";
import { useAuthentication } from "src/hooks/useAuthentication";
import { ResetPasswordCredentials } from "src/types/auth";
import * as Yup from 'yup';

import AuthScreenCover from "src/assets/auth/AuthScreenCover.svg"
import PocketmintLogo from "src/assets/common/Logo_PocketMint.svg"
import { passwordSchema } from 'src/utils/auth/Validation';
import { triggerGenericNotification } from 'src/utils/Notifications';
import { useQuery } from 'src/hooks/useQuery';



export const ResetPassword = () => {
  const { getResetPasswordProcessStatus, resetPasswordAfterEmailConfirmation } = useAuthentication()
  const navigate = useNavigate()
  const query = useQuery()


  if (!getResetPasswordProcessStatus()) {
    triggerGenericNotification("You're not supposed to be here!", "Please go back to the login page and click on 'Forgot Password?' to reset your password.", "danger")
    navigate("/login")
  }

  const triggerPocketmintRedirectNotification = () => {
    Store.addNotification({
      title: "Visit Pocketmint.co!",
      message: "Learn more about personal finance at https://www.pocketmint.co/",
      type: "success",
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000
      }
    })
  }

  const validationSchema = Yup.object().shape({
    newPassword: passwordSchema,
    confirmNewPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), ''], 'Passwords must match'),
  });


  const handleResetPassword = async (values: ResetPasswordCredentials, actions: FormikHelpers<ResetPasswordCredentials>) => {
    const { newPassword } = values
    resetPasswordAfterEmailConfirmation(query.get('oobCode'), newPassword).then(res => {
      triggerGenericNotification("Password reset successful!", "You can now login with your new password.", "success")
    }).then(() => {
      navigate("/login")
    }).catch(err => {
      triggerGenericNotification("An error occurred!", err, "danger")
    })
  }

  return <div className="flex md:flex-row h-screen w-screen">
    <div className="w-[50vw]">
      <div className="w-full">
        <img src={PocketmintLogo} className="ml-10 mt-10 cursor-pointer" onClick={() => triggerPocketmintRedirectNotification()} />
      </div>

      <div className='flex flex-col gap-8 pl-[21%] pr-[21%] mt-[8%]'>
        <div className='flex flex-col'>
          <p className="text-2xl font-medium">Enter your new password</p>
          <p className="text-xl font-normal text-darkGrey-600 whitespace-nowrap">Keep it safe!</p>
        </div>
        <Formik
          initialValues={{
            newPassword: '',
            confirmNewPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <FormInput name="newPassword" type="password" label="Password" />
              <FormInput name="confirmNewPassword" type="password" label="Password" />
              <ButtonFilled type="submit" disabled={isSubmitting}>
                {isSubmitting ? <FadeLoader /> : 'Reset Password'}
              </ButtonFilled>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    <img className="h-screen w-[50vw] object-cover" src={AuthScreenCover} />
  </div>
}
