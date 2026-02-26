import React from "react";
import { Formik, Form } from "formik";
import { doctorRegisterSchema } from "../AuthValidation";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useDoctorRegisterMutation } from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";

const DoctorRegisterForm = () => {
  const [doctorRegister, { isLoading: isDoctorLoading }] =
    useDoctorRegisterMutation();
  const navigate = useNavigate();

  const doctorInitialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    about: "",
    attachDoc: null,
    // terms: false,
  };

  const handleDoctorSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("about", values.about);
      if (values.attachDoc) {
        formData.append("attachDoc", values.attachDoc);
      }

      const bodyToSend = formData;

      const response = await doctorRegister(bodyToSend).unwrap();
      if (response?.message) {
        actions.resetForm();
        navigate("/sign-in");
        toastSuccess(
          response?.message ||
            "Doctor registration successful! Please check your email for verification.",
        );
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Doctor registration failed. Please try again.",
      );
    }
    setTimeout(() => actions.setSubmitting(false), 600);
  };

  return (
    <Formik
      initialValues={doctorInitialValues}
      validationSchema={doctorRegisterSchema}
      onSubmit={handleDoctorSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form className="space-y-5">
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Dr. John Doe"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.fullName && errors.fullName ? errors.fullName : ""}
            height={48}
            className="text-sm"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="eg. doctor@mail.com"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email ? errors.email : ""}
            height={48}
            className="text-sm"
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && errors.password ? errors.password : ""}
            height={48}
            className="text-sm"
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Re-enter password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : ""
            }
            height={48}
            className="text-sm"
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself and your practice..."
              rows={3}
              className={`w-full px-4 py-3 border text-sm ${
                touched.about && errors.about
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              } rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
            />
            {touched.about && errors.about && (
              <p className="mt-1 text-sm text-red-500">{errors.about}</p>
            )}
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Document Upload (License, Certification, etc.)
            </label>

            <div className="relative">
              {/* Hidden real input */}
              <input
                type="file"
                id="attachDoc"
                name="attachDoc"
                className="hidden"
                onChange={(event) => {
                  const file = event.currentTarget.files[0];
                  setFieldValue("attachDoc", file);
                  event.target.value = null;
                }}
                onBlur={handleBlur}
              />

              <label
                htmlFor="attachDoc"
                className={`flex items-center justify-between w-full px-4 h-12 border rounded-lg cursor-pointer
      ${
        touched.attachDoc && errors.attachDoc
          ? "border-red-500"
          : "border-gray-300"
      }
      hover:border-blue-500 transition`}
              >
                <span className="text-sm text-gray-600 truncate">
                  {values.attachDoc
                    ? values.attachDoc.name
                    : "Click to upload document"}
                </span>

                <span className="px-3 py-1 text-xs text-white bg-secondary rounded-md">
                  Browse
                </span>
              </label>
            </div>

            {touched.attachDoc && errors.attachDoc && (
              <p className="mt-1 text-sm text-red-500">{errors.attachDoc}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            fullWidth
            loading={isDoctorLoading}
            disabled={isDoctorLoading}
            className="shadow-md shadow-[#0ebe7f]/25"
            loaderSize={25}
          >
            {isDoctorLoading ? "Registering Doctor..." : "Register as Doctor"}
          </Button>

          <div className="relative flex items-center justify-center">
            <span className="absolute left-0 right-0 h-px bg-gray-200" />
            <span className="relative bg-white px-3 text-sm text-gray-500">
              OR
            </span>
          </div>

          <Button
            type="button"
            variant="grayOutline"
            size="lg"
            fullWidth
            className="text-gray-700"
            icon={FaGoogle}
          >
            Sign in with Google
          </Button>

          <p className="text-center text-sm text-gray-700">
            Have an existing account?{" "}
            <Link
              to="/login"
              className="text-[#0ebe7f] font-semibold hover:text-[#0eb2ad]"
            >
              Login
            </Link>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default DoctorRegisterForm;
