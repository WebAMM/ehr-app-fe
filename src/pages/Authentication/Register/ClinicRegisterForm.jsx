import React from "react";
import { Formik, Form } from "formik";
import { clinicRegisterSchema } from "../AuthValidation";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useClinicRegisterMutation } from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";
const ClinicRegisterForm = () => {
  const [clinicRegister, { isLoading: isClinicLoading }] =
    useClinicRegisterMutation();
  const navigate = useNavigate();

  const clinicInitialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleClinicSubmit = async (values, actions) => {
    try {
      const payload = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      };

      const response = await clinicRegister(payload).unwrap();
      if (response?.message) {
        actions.resetForm();
        navigate("/sign-in");
        toastSuccess(
          response?.message ||
            "Clinic registration successful! Please check your email for verification.",
        );
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Clinic registration failed. Please try again.",
      );
    }
    setTimeout(() => actions.setSubmitting(false), 600);
  };

  return (
    <Formik
      initialValues={clinicInitialValues}
      validationSchema={clinicRegisterSchema}
      onSubmit={handleClinicSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="space-y-5">
          <Input
            label="Clinic Name"
            type="text"
            name="fullName"
            placeholder="Enter clinic name"
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
            placeholder="eg. clinic@mail.com"
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
            placeholder="Confirm your password"
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

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            fullWidth
            loading={isClinicLoading}
            disabled={isClinicLoading}
            className="shadow-md shadow-[#0ebe7f]/25"
          >
            {isClinicLoading ? "Registering Clinic..." : "Register as Clinic"}
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

export default ClinicRegisterForm;
