import React from "react";
import { Formik, Form } from "formik";
import { registerSchema } from "./validation";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IMAGES } from "../../assets/images";
import Input from "../../components/ui/Input";
import Checkbox from "../../components/ui/checkbox";
import Button from "../../components/ui/Button";
import AuthHero from "./AuthHero";
const Register = () => {
  const initialValues = {
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const handleSubmit = (values, actions) => {
    console.log("Register form values:", values);
    setTimeout(() => actions.setSubmitting(false), 600);
  };
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full  grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <AuthHero image={IMAGES.BG_AUTH_MAIN} />

        <div className="px-4 sm:px-8 py-8 flex items-center">
          <div className="w-full">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="rounded-full border-2 border-[#0ebe7f]/60 p-2 bg-white shadow-sm">
                <img
                  src={IMAGES.LOGO}
                  alt="Brand logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center lg:text-left">
              Register your account
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center lg:text-left">
              Enter your details to create your account.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={registerSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                isSubmitting,
                setFieldValue,
              }) => (
                <Form className="space-y-5">
                  <Input
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && errors.phone ? errors.phone : ""}
                    height={48}
                    className="text-sm"
                  />

                  <Input
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="eg. johndoe@mail.com"
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

                  <div className="flex items-center justify-between">
                    <Checkbox
                      name="terms"
                      checked={values.terms}
                      onChange={(e) => setFieldValue("terms", e.target.checked)}
                      label="I agree to the Terms and Conditions."
                      className="text-[#0ebe7f]"
                    />
                  </div>
                  {touched.terms && errors.terms && (
                    <p className="text-sm text-red-500 -mt-3">{errors.terms}</p>
                  )}

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    className="shadow-md shadow-[#0ebe7f]/25"
                  >
                    {isSubmitting ? "Creating account..." : "Register"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
