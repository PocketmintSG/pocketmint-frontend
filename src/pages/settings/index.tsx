import { Card, CardContent, CardTitle } from "@/components/ui/card";
import React from "react";
import { Container } from "src/components/general/containers/Container";
import HeinrichProfilePicture from "src/assets/placeholders/profile-picture-heinrich-sharp.svg";
import { Label } from "@/components/general/form/Label";
import { Form, Formik } from "formik";
import { FormInput } from "@/components/general/form/FormInput";
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled";
import { FadeLoader } from "react-spinners";

export const Settings = () => {
  return <Container className="bg-containerBackground h-[100vh] flex flex-col gap-10">
    <Card className="p-10 -mt-3 z-10">
      <CardTitle className="text-lg mb-6">Personal Information</CardTitle>
      <CardContent className="p-0">
        <div className="flex flex-row items-center gap-10">
          <img src={HeinrichProfilePicture} alt="Your Image" className="object-cover w-[15%] h-full" />
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
      </CardContent>
    </Card>

    <Card className="p-10">
      <CardTitle className="text-lg mb-6">Update Password</CardTitle>
      <CardContent className="p-0">
        <div className="flex flex-row items-center gap-10">
          <Formik initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }} onSubmit={() => { }}>
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5 w-full">
                <FormInput name="oldPassword" type="password" label="Old Password" labelProps="font-medium text-darkGrey-600 text-sm" />
                <FormInput name="newPassword" type="password" label="New Password" labelProps="font-medium text-darkGrey-600 text-sm" />
                <FormInput name="confirmNewPassword" type="password" label="Confirm New Password" labelProps="font-medium text-darkGrey-600 text-sm" />
                <ButtonFilled type="submit" disabled={isSubmitting} className="w-[20%] self-end">
                  {isSubmitting ? <FadeLoader /> : "Reset Password"}
                </ButtonFilled>
              </Form>
            )}
          </Formik>
        </div>
      </CardContent>
    </Card>
  </Container>
};
