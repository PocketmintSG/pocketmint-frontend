import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Container } from "src/components/general/containers/Container";
import { Label } from "@/components/general/form/Label";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { FormInput } from "@/components/general/form/FormInput";
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { FadeLoader } from "react-spinners";
import { ProfileResetPasswordCredentials, UpdateProfileDetails } from "@/types/settings";
import * as Yup from "yup";
import { emailSchema, passwordRegistrationSchema } from "@/utils/auth/Validation";
import { SettingsUpdatePasswordAPI, SettingsUpdateProfileAPI } from "@/api/settings";
import { getUser } from "@/utils/Store";
import { triggerGenericNotification } from "@/utils/Notifications";
import { ButtonGhost } from "@/components/general/buttons/ButtonGhost";
import { UploadImageAPI } from "@/api/file_uploads";
import { updateUser } from "@/redux/authSlice";
import { useDispatch } from "react-redux";

export const Settings = () => {
  const user = getUser()
  const dispatch = useDispatch()

  const [isUpdatingPersonalInfo, setIsUpdatingPersonalInfo] = useState(false)
  const [profilePictureURL, setProfilePictureURL] = useState<string>(user?.profilePicture ?? "")


  const handleFileChange = async (event, setSubmitting) => {
    setSubmitting(true)
    const fileUploadRes = await handleFileUpload(event.target.files[0])
    if (fileUploadRes.status !== 200) {
      triggerGenericNotification("Error uploading image", "danger")
    } else {
      triggerGenericNotification("Image uploaded successfully!", "success")
    }
    setProfilePictureURL(fileUploadRes.data.data.image_url)
    console.log(fileUploadRes.data.data.image_url)
    console.log(profilePictureURL)
    setSubmitting(false)
  }

  const handleFileUpload = async (imageFile: File) => {
    const res = await UploadImageAPI(imageFile);
    return res
  }

  const updatePasswordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: passwordRegistrationSchema,
    confirmNewPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const updateProfileValidationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: emailSchema,
  });

  const handleUpdatePassword = async (values: ProfileResetPasswordCredentials, actions: FormikHelpers<ProfileResetPasswordCredentials>) => {
    const { oldPassword, newPassword, confirmNewPassword } = values;
    const email = user?.email ?? ""
    const res = await SettingsUpdatePasswordAPI(email, oldPassword, newPassword, confirmNewPassword)
    triggerGenericNotification("Password updated successfully", "success")
  }

  const handleUpdateProfile = async (values: UpdateProfileDetails, actions: FormikHelpers<UpdateProfileDetails>) => {
    actions.setSubmitting(true)
    const res = await SettingsUpdateProfileAPI(user?.uid ?? "", values.username, profilePictureURL, values.firstName, values.lastName, values.email)
    if (res.status === 200) {
      triggerGenericNotification("Profile updated successfully", "success")
    } else {
      triggerGenericNotification("Error updating profile", "danger")
    }

    // Update Redux store
    dispatch(updateUser({
      username: values.username,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      profilePicture: profilePictureURL
    }))

    actions.setSubmitting(false)
    setIsUpdatingPersonalInfo(false)
  }

  return <Container className="bg-containerBackground h-[100vh] flex flex-col gap-10">
    {!isUpdatingPersonalInfo &&
      <Card className="p-10 -mt-3 z-10">
        <CardTitle className="text-lg mb-6">Personal Information</CardTitle>
        <CardContent className="p-0 h-[30vh] grid grid-rows-[80%_20%] gap-6">
          <div className="row-span-1 grid grid-cols-4 gap-10">
            <img src={profilePictureURL} alt="Profile Picture URL" className="object-cover h-full col-span-1" />
            <div className="col-span-3 grid grid-cols-4 grid-rows-3 gap-4">
              <div className="row-span-1 col-span-4">
                <Label labelTitle="Username" labelContent={user?.username ?? ""} />
              </div>

              <div className="row-span-1 col-span-4 grid grid-cols-4">
                <Label className="col-span-2" labelTitle="First Name" labelContent={user?.firstName ?? ""} />
                <Label className="col-span-2" labelTitle="Last Name" labelContent={user?.lastName ?? ""} />
              </div>

              <div>
                <Label className="row-span-1 col-span-4" labelTitle="Email address" labelContent={user?.email ?? ""} />
              </div>
            </div>
          </div>
          <div className="row-span-1 flex items-center justify-end">
            <ButtonFilled onClick={() => setIsUpdatingPersonalInfo(!isUpdatingPersonalInfo)}>Update Information</ButtonFilled>
          </div>
        </CardContent>
      </Card>
    }
    {isUpdatingPersonalInfo &&
      <Card className="p-10 -mt-3 z-10">
        <CardTitle className="text-lg mb-6">Personal Information</CardTitle>
        <CardContent className="p-0 h-[30vh] grid grid-rows-[80%_20%] gap-6">
          <Formik initialValues={{
            username: user?.username ?? "",
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            email: user?.email ?? "",
          }} validationSchema={updateProfileValidationSchema} onSubmit={handleUpdateProfile}>
            {({ isSubmitting, setSubmitting, submitForm }) => (
              <>
                <Form className="row-span-1 grid grid-cols-4 gap-10">
                  <label htmlFor="profilePicture">
                    <img
                      src={profilePictureURL}
                      alt="Profile Picture"
                      className="object-cover h-full col-span-1 cursor-pointer hover:opacity-80"
                    />
                  </label>

                  <Field name="profilePicture">
                    {({ field }) => (
                      <input
                        type="file"
                        id="profilePicture"
                        style={{ display: "none" }}
                        {...field}
                        onChange={(event) => handleFileChange(event, setSubmitting)}
                      />
                    )}
                  </Field>
                  <div className="col-span-3 grid grid-cols-4 grid-rows-3">
                    <div className="row-span-1 col-span-4">
                      <FormInput name="username" type="text" label="Username" labelProps="font-medium text-darkGrey-600 text-sm" />
                    </div>

                    <div className="row-span-1 col-span-4 grid grid-cols-4 gap-20">
                      <FormInput className="col-span-2" name="firstName" type="text" label="First Name" labelProps="font-medium text-darkGrey-600 text-sm" />
                      <FormInput className="col-span-2" name="lastName" type="text" label="Last Name" labelProps="font-medium text-darkGrey-600 text-sm" />
                    </div>

                    <div className="row-span-1 col-span-4">
                      <FormInput name="email" type="text" label="Email Address" labelProps="font-medium text-darkGrey-600 text-sm" />
                    </div>
                  </div>
                </Form>
                <div className="row-span-1 flex items-center justify-end gap-4">
                  <ButtonGhost onClick={() => setIsUpdatingPersonalInfo(!isUpdatingPersonalInfo)}>Cancel</ButtonGhost>
                  <ButtonFilled onClick={() => submitForm()} type="submit">{isSubmitting ? <FadeLoader /> : "Confirm"}</ButtonFilled>
                </div>
              </>
            )}
          </Formik>
        </CardContent>
      </Card>
    }
    <Card className="p-10">
      <CardTitle className="text-lg mb-6">Update Password</CardTitle>
      <CardContent className="p-0">
        <div className="flex flex-row items-center gap-10">
          <Formik initialValues={{ oldPassword: "", newPassword: "", confirmNewPassword: "" }} onSubmit={handleUpdatePassword} validationSchema={updatePasswordValidationSchema}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-10 w-full">
                <FormInput name="oldPassword" type="password" label="Old Password" labelProps="font-medium text-darkGrey-600 text-sm" />
                <FormInput name="newPassword" type="password" label="New Password" labelProps="font-medium text-darkGrey-600 text-sm" />
                <FormInput name="confirmNewPassword" type="password" label="Confirm New Password" labelProps="font-medium text-darkGrey-600 text-sm" />
                <ButtonFilled type="submit" disabled={isSubmitting} className="w-[20%] self-end">
                  {isSubmitting ? <div className="w-full flex justify-center">
                    <FadeLoader />
                  </div> : "Update Password"}
                </ButtonFilled>
              </Form>
            )}
          </Formik>
        </div>
      </CardContent>
    </Card>
  </Container>
};
