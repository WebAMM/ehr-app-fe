import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { IMAGES } from "../assets/images";
import Input from "../components/ui/Input";
import Checkbox from "../components/ui/checkbox";
import Button from "../components/ui/Button";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  rememberMe: Yup.boolean(),
});

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values, actions) => {
    // Replace with your auth request
    console.log("Login form values:", values);
    setTimeout(() => actions.setSubmitting(false), 500);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        {/* Left: Hero */}
        <div className="relative hidden lg:flex items-end justify-center bg-[#0ebe7f]">
          <img
            src={IMAGES.BG_AUTH_MAIN}
            alt="Healthcare professionals"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0ebe7f] via-[#0ebe7f]/70 to-black/80" />

          <div className="relative flex flex-col items-center text-center px-10 pb-16 w-full">
            <h1 className="text-3xl font-bold leading-tight text-white mb-4">
              Schedule <span className="text-[#b4ffd9]">Appointments</span> with
              <br />
              Expert <span className="text-[#b4ffd9]">Doctors</span>
            </h1>
            <p className="text-white/85 text-sm leading-relaxed max-w-md">
              Find experienced specialist doctors with expert ratings and
              reviews and book your appointments hassle-free.
            </p>
            <div className="flex items-center space-x-2 mt-6">
              <span className="w-2 h-2 bg-white/50 rounded-full" />
              <span className="w-8 h-2 bg-[#b4ffd9] rounded-full" />
              <span className="w-2 h-2 bg-white/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right: Form */}
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
              Log in to Apolo Now
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center lg:text-left">
              Welcome back! Please enter your details.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
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
                  <div className="space-y-1">
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
                  </div>

                  <div className="space-y-1">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                      height={48}
                      className="text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        label="Remember me"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={(e) =>
                          setFieldValue("rememberMe", e.target.checked)
                        }
                        className="text-[#0ebe7f]"
                      />
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Forgot Password?
                    </Link>
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
                    {isSubmitting ? "Signing in..." : "Login"}
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

export default Login;
