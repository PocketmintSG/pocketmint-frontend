import React from "react";
import { useAuthentication } from "src/hooks/useAuthentication"
import { Formik, Form, Field, ErrorMessage, FormikValues, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component"
import { LoginUserCredentials, RegisterUserCredentials } from "src/types/auth";
import FadeLoader from "react-spinners/FadeLoader"
import { ButtonFilled } from "src/components/general/buttons/ButtonFilled";
import { ButtonGhost } from "src/components/general/buttons/ButtonGhost";
import { FormInput } from "src/components/general/form/FormInput";
import { triggerWIPNotification } from "src/utils/Notifications";

interface RegisterUserCredentialsWithPasswordConfirmation extends RegisterUserCredentials {
  confirmPassword: string
}

export const Register = () => {
  const { signUpCall } = useAuthentication()

  const navigate = useNavigate()

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

  const handleSubmit = async (values: RegisterUserCredentialsWithPasswordConfirmation, actions: FormikHelpers<RegisterUserCredentialsWithPasswordConfirmation>) => {
    const { username, email, password } = values
    console.log(email, password)
    signUpCall({ username, email, password }).then(res => {
      console.log(res)
      if (res.isSuccessful) {
        console.log("User registered sucessfully")
        Store.addNotification({
          title: `Successfully registered as ${username}!`,
          message: "Welcome to Pocketmint!",
          type: "success",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000
          }
        })
        navigate("/dashboard")
      } else if (res.error && res.error.code === "auth/user-not-found") {
        Store.addNotification({
          title: "User already exists!",
          message: `Did you forget your password?`,
          type: "danger",
          insert: "top",
          container: "top-center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000
          }
        })
      }
    }).catch(err => {
      console.log("An error occurred: ", err)
      Store.addNotification({
        title: "Error occurred!",
        message: `${err}`,
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 3000
        }
      })
    })
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  return <div className="flex md:flex-row h-screen w-screen">
    <div className="w-[50vw]">
      <div className="w-full">
        <img src="src/assets/common/Logo_PocketMint.svg" className="ml-10 mt-10 cursor-pointer" onClick={() => triggerPocketmintRedirectNotification()} />
      </div>
      <div className='flex flex-col gap-8 pl-[21%] pr-[21%] mt-[8%]'>
        <div className='flex flex-col'>
          <p className="text-2xl font-medium">Create Account</p>
          <p className="text-xl font-normal text-darkGrey-600 whitespace-nowrap">Start your financial journey with us.</p>
        </div>
        <ButtonGhost className='font-normal' onClick={() => triggerWIPNotification("Google Authentication will be added soon!")}>
          <div className="flex flex-row items-center content-center justify-center gap-2">
            <img src="/src/assets/common/logos/GoogleColored.svg" />
            Sign up with Google
          </div>
        </ButtonGhost>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <FormInput name="username" type="text" label="Username" />
              <FormInput name="email" type="email" label="Email" />
              <FormInput name="password" type="password" label="Password" />
              <FormInput name="confirmPassword" type="password" label="Confirm Password" />
              <ButtonFilled type="submit" disabled={isSubmitting} className="mt-5">
                {isSubmitting ? <FadeLoader /> : 'Register'}
              </ButtonFilled>
            </Form>
          )}
        </Formik>
        <span className='self-center'>Already have an account? <Link className='font-medium underline' to='/login'>Login</Link></span>
      </div>
    </div>
    <img className="h-screen w-[50vw] object-cover" src="src/assets/auth/AuthScreenCover.svg" />
  </div>
}
