import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useUpdateDoctorPasswordMutation } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { toastSuccess, toastError } from "@/components/ui/Toast";

const isStrongPassword = (password) => {
  if (!password) return false;
  const lengthOk = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  return lengthOk && hasUpper && hasLower && hasNumber && hasSymbol;
};

const DoctorSettingsChangePassword = () => {
  const { getUser } = authCookies;
  const doctorId = getUser()?._id;
  const [updatePassword, { isLoading: isUpdating }] =
    useUpdateDoctorPasswordMutation({ doctorId });
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const validationSchema = useMemo(
    () =>
      Yup.object({
        currentPassword: Yup.string().required("Current password is required"),
        newPassword: Yup.string()
          .required("New password is required")
          .min(8, "Password must be at least 8 characters")
          .matches(/[A-Z]/, "Include at least one uppercase letter")
          .matches(/[a-z]/, "Include at least one lowercase letter")
          .matches(/\d/, "Include at least one number")
          .matches(/[^A-Za-z0-9]/, "Include at least one symbol"),
        confirmPassword: Yup.string()
          .required("Confirm password is required")
          .oneOf([Yup.ref("newPassword")], "Passwords do not match"),
      }),
    [],
  );

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await updatePassword({
        doctorId,
        passwordData: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmPassword,
        },
      }).unwrap();

      if (response) {
        toastSuccess(response.message || "Password changed successfully!");
        resetForm();
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Failed to update password. Please try again.",
      );
    }
  };

  return (
    <div className="w-full">
      <Card
        title="Change Password"
        padding="lg"
        shadow="sm"
        parentClass="rounded-2xl"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                placeholder="Enter current password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.currentPassword ? errors.currentPassword : ""}
              />

              <div>
                <Input
                  label="Create New Password"
                  type="password"
                  name="newPassword"
                  placeholder="Enter New password"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.newPassword ? errors.newPassword : ""}
                />
                {isStrongPassword(values.newPassword) ? (
                  <p className="mt-2 text-sm text-secondary">Strong</p>
                ) : null}
              </div>

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword ? errors.confirmPassword : ""}
              />

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                fullWidth
                loading={isUpdating}
                disabled={isUpdating || isSubmitting}
              >
                {isUpdating ? "Updating..." : "Change Password"}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default DoctorSettingsChangePassword;
