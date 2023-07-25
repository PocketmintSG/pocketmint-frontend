import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React, { useState } from "react";
import { Container } from "src/components/general/containers/Container";
import HeinrichProfilePicture from "src/assets/placeholders/profile-picture-heinrich-sharp.svg";
import { Label } from "@/components/general/form/Label";
import { Form, Formik, FormikHelpers } from "formik";
import { FormInput } from "@/components/general/form/FormInput";
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { FadeLoader } from "react-spinners";
import { ProfileResetPasswordCredentials } from "@/types/settings";
import * as Yup from "yup";
import { passwordRegistrationSchema } from "@/utils/auth/Validation";
import { SettingsUpdatePasswordAPI } from "@/api/settings";
import { getUser } from "@/utils/Store";
import { triggerGenericNotification } from "@/utils/Notifications";
import { ButtonGhost } from "@/components/general/buttons/ButtonGhost";

export const Settings = () => {
  const [isUpdatingPersonalInfo, setIsUpdatingPersonalInfo] = useState(false)

  const user = getUser();
  const updatePasswordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: passwordRegistrationSchema,
    confirmNewPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const handleUpdatePassword = async (values: ProfileResetPasswordCredentials, actions: FormikHelpers<ProfileResetPasswordCredentials>) => {
    const { oldPassword, newPassword, confirmNewPassword } = values;
    const email = user?.email ?? ""
    const res = await SettingsUpdatePasswordAPI(email, oldPassword, newPassword, confirmNewPassword)
    triggerGenericNotification("Password updated successfully", "success")
  }
  return <Container className="bg-containerBackground h-[100vh] flex flex-col gap-10">
    {isUpdatingPersonalInfo &&
      <Card className="p-10 -mt-3 z-10">
        <CardTitle className="text-lg mb-6">Personal Information</CardTitle>
        <CardContent className="p-0 grid grid-cols-3">
          <div className="flex flex-row items-center w-full gap-14 col-span-2">
            <img src={HeinrichProfilePicture} alt="Your Image" className="object-cover w-[20%] h-full" />
            <div className="flex flex-col gap-4">
              <Label labelTitle="Username" labelContent="heinrich_lee" />

              <div className="flex flex-row gap-[10rem]">
                <Label labelTitle="First Name" labelContent="Heinrich" />
                <Label labelTitle="Last Name" labelContent="Lee" />
              </div>

              <div>
                <Label labelTitle="Email address" labelContent="heinrich_lee@gmail.com" />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex items-end justify-end gap-2">
            <ButtonFilled onClick={() => setIsUpdatingPersonalInfo(!isUpdatingPersonalInfo)}>Update Information</ButtonFilled>
          </div>
        </CardContent>
      </Card>
    }
    {!isUpdatingPersonalInfo &&
      <Card className="p-10 -mt-3 z-10">
        <CardTitle className="text-lg mb-6">Personal Information</CardTitle>
        <CardContent className="p-0 grid grid-cols-3">
          <Formik className="w-full">
            {({ isSubmitting }) => (
              <>
                <Form className="flex flex-row items-center w-full gap-14 col-span-2">
                  <img src={HeinrichProfilePicture} alt="Your Image" className="object-cover w-[20%] h-full" />
                  <div className="flex flex-col gap-4">
                    <FormInput className="w-[80%]" name="username" type="text" label="Username" labelProps="font-medium text-darkGrey-600 text-sm" />

                    <div className="flex flex-row gap-[10rem]">
                      <FormInput className="w-[60%]" name="firstName" type="text" label="First Name" labelProps="font-medium text-darkGrey-600 text-sm" />
                      <FormInput className="w-[60%]" name="lastName" type="text" label="Last Name" labelProps="font-medium text-darkGrey-600 text-sm" />
                    </div>

                    <div>
                      <FormInput name="email" type="text" label="Email Address" labelProps="font-medium text-darkGrey-600 text-sm" />
                    </div>
                  </div>
                </Form>
                <div className="col-span-1 flex items-end justify-end gap-2">
                  <ButtonGhost onClick={() => setIsUpdatingPersonalInfo(!isUpdatingPersonalInfo)}>Cancel</ButtonGhost>
                  <ButtonFilled onClick={() => setIsUpdatingPersonalInfo(!isUpdatingPersonalInfo)}>Confirm</ButtonFilled>
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
              <Form className="flex flex-col gap-5 w-full">
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
