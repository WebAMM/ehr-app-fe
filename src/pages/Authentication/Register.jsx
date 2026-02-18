import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { registerSchema } from "./AuthValidation";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { IMAGES } from "@/assets/images";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import GooglePlaceInput from "@/components/ui/GooglePlaceInput";
import { useJsApiLoader } from "@react-google-maps/api";
import { GetPhonecodes } from "react-country-state-city";
import AuthHero from "./AuthHero";
import { useUserRegisterMutation } from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";
const Register = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNo: "",
    countryCode: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    location: "",
    longitude: "",
    latitude: "",
    terms: false,
  };

  const [userRegister, { isLoading, isError, error }] =
    useUserRegisterMutation();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    let isMounted = true;

    GetPhonecodes()
      .then((data) => {
        if (isMounted) setCountries(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (isMounted) setCountries([]);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (values, actions) => {
    try {
      const response = await userRegister(values).unwrap();
      if (response?.message) {
        actions.resetForm();
        toastSuccess(
          response?.message ||
            "Registration successful! Please check your email for verification.",
        );
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Registration failed. Please try again.",
      );
    }
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

                setFieldValue,
              }) => (
                <Form className="space-y-5">
                  <Input
                    label="Full Name"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.fullName && errors.fullName ? errors.fullName : ""
                    }
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700">
                        Country Code
                      </label>
                      <select
                        name="countryCode"
                        value={values.countryCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                          <option
                            key={country.id}
                            value={`+${country.phone_code}`}
                          >
                            {country.name} (+{country.phone_code})
                          </option>
                        ))}
                      </select>
                      {touched.countryCode && errors.countryCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.countryCode}
                        </p>
                      )}
                    </div>

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phoneNo"
                      placeholder="1234567890"
                      value={values.phoneNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.phoneNo && errors.phoneNo ? errors.phoneNo : ""
                      }
                      height={48}
                      className="text-sm"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.gender && errors.gender && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Marital Status
                    </label>
                    <select
                      name="maritalStatus"
                      value={values.maritalStatus}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Marital Status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                    {touched.maritalStatus && errors.maritalStatus && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.maritalStatus}
                      </p>
                    )}
                  </div>

                  <Input
                    label="Date of Birth"
                    type="date"
                    name="dateOfBirth"
                    value={values.dateOfBirth}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.dateOfBirth && errors.dateOfBirth
                        ? errors.dateOfBirth
                        : ""
                    }
                    height={48}
                    className="text-sm"
                  />

                  {isLoaded ? (
                    <GooglePlaceInput
                      name="location"
                      label="Location"
                      type="address"
                      placeholder="Search for your location"
                      formik={{
                        values,
                        setFieldValue,
                        handleBlur,
                        touched,
                        errors,
                      }}
                      onPlaceSelect={(data) => {
                        setFieldValue("location", data);
                        setFieldValue(
                          "longitude",
                          data.location.coordinates[0],
                        );
                        setFieldValue("latitude", data.location.coordinates[1]);
                      }}
                    />
                  ) : (
                    <div className="text-sm text-gray-500">
                      Loading Google Maps...
                    </div>
                  )}

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
                    loading={isLoading}
                    disabled={isLoading}
                    className="shadow-md shadow-[#0ebe7f]/25"
                  >
                    {isLoading ? "Creating account..." : "Register"}
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
