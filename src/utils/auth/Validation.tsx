// Provides validation support for passwords

import * as Yup from "yup";

export const passwordSchema = Yup.string()
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[0-9]/, "Password must contain at least one number")
  .matches(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character",
  )
  .required("Password is required");

export const emailSchema = Yup.string()
  .email("Must be a valid email")
  .required("Email is required");
