import React from "react";
import { Formik, Form } from "formik";
import { resetPasswordSchema } from "./AuthValidation";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IMAGES } from "../../assets/images";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthHero from "./AuthHero";
const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const handleSubmit = (values, actions) => {
    console.log("Reset password for", email || "user", values.password);
    setTimeout(() => {
      actions.setSubmitting(false);
      navigate("/login", { replace: true });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl min-h-[90vh] grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <AuthHero image={IMAGES.BG_AUTH_MAIN} />

        <div className="px-4 sm:px-8 py-10 flex items-center">
          <div className="w-full">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Reset Password
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Reset your new password
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={resetPasswordSchema}
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
                    label="New Password"
                    type="password"
                    name="password"
                    placeholder="Enter new password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.password && errors.password ? errors.password : ""
                    }
                    height={48}
                    className="text-sm"
                  />

                  <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter new password"
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

                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Password must contain:</p>
                    <ul className="list-disc list-inside space-y-1 ml-1">
                      <li>At least 8 characters</li>
                      <li>One uppercase and one lowercase letter</li>
                      <li>One number</li>
                      <li>One special character</li>
                    </ul>
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="shadow-md shadow-[#0ebe7f]/25"
                  >
                    {isSubmitting ? "Updating..." : "Confirm"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
