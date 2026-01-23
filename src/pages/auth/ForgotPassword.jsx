import React from "react";
import { Formik, Form } from "formik";
import { forgotPasswordSchema } from "./validation";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IMAGES } from "../../assets/images";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import AuthHero from "./AuthHero";
const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };
  const handleSubmit = (values, actions) => {
    console.log("Forgot password values:", values);
    setTimeout(() => {
      actions.setSubmitting(false);
      navigate("/otp", { state: { email: values.email } });
    }, 600);
  };

  return (
    <div className="h-screen bg-[#f6f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full  min-h-[90vh] grid lg:grid-cols-5 gap-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="col-span-3">
          <AuthHero image={IMAGES.FORGET_PASSWORD} />
        </div>

        <div className="px-4 sm:px-8 py-10 flex items-center col-span-2">
          <div className="w-full">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
              Forget Password
            </h2>
            <p className="text-sm text-gray-600 mb-8">
              Enter your registered email address, we'll send you a code to
              reset your password.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={forgotPasswordSchema}
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
                    label="Email Address"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && errors.email ? errors.email : ""}
                    height={48}
                    className="text-sm"
                  />

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="shadow-md shadow-[#0ebe7f]/25"
                  >
                    {isSubmitting ? "Sending..." : "Send OTP"}
                  </Button>
                </Form>
              )}
            </Formik>

            <p className="text-sm text-gray-600 mt-6">
              Remembered your password?{" "}
              <Link
                to="/login"
                className="text-[#0ebe7f] font-semibold hover:text-[#0eb2ad]"
              >
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
