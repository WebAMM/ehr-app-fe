import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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
          onSubmit={(values) => {
            // Hook this to your API when ready

            console.log("Change password", values);
          }}
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
                disabled={isSubmitting}
              >
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default DoctorSettingsChangePassword;
