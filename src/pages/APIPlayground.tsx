import React, { useState } from "react"
import { ButtonFilled } from "@/components/general/buttons/ButtonFilled"
import { Field, Form, Formik } from "formik";
import { UploadImageAPI } from "@/api/file_uploads";
import * as Yup from "yup"

export const APIPlayground = () => {
  const [image, setImage] = useState<File>()

  const handleFileChange = (event) => {
    setImage(event.target.files[0])
  }

  const handleFileUpload = async () => {
    const res = await UploadImageAPI(image!); // guaranteed to be defined due to Formik validation
    console.log(res)
  }

  return <div className="w-[100vw] h-[100vh] bg-containerBackground">
    <Formik initialValues={{
      image: null
    }} onSubmit={handleFileUpload} validationSchema={{
      image: Yup.mixed().required("Image is required")
    }}>
      <Form>
        <label htmlFor="image">Upload Image</label>
        <Field type="file" name="image" onChange={handleFileChange}>
          {({ field }) => (
            <input type="file" {...field} onChange={handleFileChange} />
          )}
        </Field>
        <ButtonFilled type="submit" onClick={handleFileUpload}>Get URL</ButtonFilled>
      </Form>
    </Formik>
  </div>
}