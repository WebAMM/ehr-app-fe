import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export const registerSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9+\-\s]{7,15}$/i, "Enter a valid phone number")
    .required("Phone number is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "Include an uppercase letter")
    .matches(/[a-z]/, "Include a lowercase letter")
    .matches(/[0-9]/, "Include a number")
    .matches(/[^A-Za-z0-9]/, "Include a special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  terms: Yup.boolean().oneOf([true], "Please accept the terms"),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
});

export const otpSchema = Yup.object({
  otp: Yup.string().matches(/^[0-9]{6}$/i, "Enter the 6-digit code").required("OTP is required"),
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .min(8, "At least 8 characters")
    .matches(/[A-Z]/, "Include an uppercase letter")
    .matches(/[a-z]/, "Include a lowercase letter")
    .matches(/[0-9]/, "Include a number")
    .matches(/[^A-Za-z0-9]/, "Include a special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
});
