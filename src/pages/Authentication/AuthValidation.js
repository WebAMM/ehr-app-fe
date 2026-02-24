import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

export const registerSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
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
  phoneNo: Yup.string()
    .matches(/^[0-9+\-\s]{7,15}$/i, "Enter a valid phone number")
    .required("Phone number is required"),
  countryCode: Yup.string().required("Country code is required"),
  gender: Yup.string().oneOf(["Male", "Female", "Other"], "Select a valid gender").required("Gender is required"),
  maritalStatus: Yup.string().oneOf(["Single", "Married", "Divorced", "Widowed"], "Select a valid marital status").required("Marital status is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  location: Yup.mixed().required("Please select your location"),
  longitude: Yup.number().required("Location coordinates are required"),
  latitude: Yup.number().required("Location coordinates are required"),
  terms: Yup.boolean().oneOf([true], "Please accept the terms"),
});

export const doctorRegisterSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  about: Yup.string().required("About is required"),
  attachDoc: Yup.mixed().required("Please upload your document"),
});

export const clinicRegisterSchema = Yup.object({
  fullName: Yup.string().required("Clinic name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "At least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
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
