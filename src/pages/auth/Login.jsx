import React from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "./validation";
import { Link } from "react-router-dom";
import { IMAGES } from "../../assets/images";
import Input from "../../components/ui/Input";
import Checkbox from "../../components/ui/checkbox";
import Button from "../../components/ui/Button";
import AuthHero from "./AuthHero";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = (values, actions) => {
    console.log("Login form values:", values);
    setTimeout(() => actions.setSubmitting(false), 500);
  };
  return (
    <div className=" min-h-screen bg-[#f6f8fb] flex items-center justify-center px-8 py-10">
      <div className="w-full  min-h-[90vh] grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden ">
        <div className="min-h-full col-span-3">
          <AuthHero />
        </div>
        <div className="px-4 sm:px-8 py-8 flex items-center  min-h-full h-full col-span-2">
          <div className="w-full h-full flex  justify-center flex-col">
            <div className="flex justify-center  mb-16 lg:justify-start">
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
              validationSchema={loginSchema}
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
                    loaderSize={25}
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
