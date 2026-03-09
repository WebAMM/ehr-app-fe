import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toastSuccess, toastError } from "@/components/ui/Toast";

const ClinicSettingsSecurity = () => {
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

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      // TODO: wire up clinic password update API
      toastSuccess("Password updated successfully");
      resetForm();
    } catch {
      toastError("Failed to update password");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-4">
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
            <Form className="space-y-5">
              <Input
                label="Current Password"
                name="currentPassword"
                type="password"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.currentPassword && errors.currentPassword}
              />
              <Input
                label="New Password"
                name="newPassword"
                type="password"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.newPassword && errors.newPassword}
              />
              <Input
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && errors.confirmPassword}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ClinicSettingsSecurity;
