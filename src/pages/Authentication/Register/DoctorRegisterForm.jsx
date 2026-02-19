import React, { useState } from "react";
import { Formik, Form } from "formik";
import { doctorRegisterSchema } from "../AuthValidation";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import GooglePlaceInput from "@/components/ui/GooglePlaceInput";
import { useDoctorRegisterMutation } from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DoctorRegisterForm = ({ isLoaded }) => {
  const [doctorRegister, { isLoading: isDoctorLoading }] =
    useDoctorRegisterMutation();

  const doctorInitialValues = {
    fullName: "",
    email: "",
    password: "",
    about: "",
    type: "",
    consultationFee: "",
    specialty: "",
    experience: "",
    organization: "",
    RCCMNIFNumber: "",
    authorizationNumber: "",
    dob: "",
    bloodGroup: "",
    gender: "",
    phoneNumber: "",
    teleMoney: "",
    orangeMoney: "",
    merchantCode: "",
    orangeType: "merchantCode",
    longitude: "",
    latitude: "",
    location: "",
    terms: false,
  };

  const [availableDayAndTime, setAvailableDayAndTime] = useState(
    DAYS_OF_WEEK.map((day) => ({
      day,
      startTime: "",
      endTime: "",
      enabled: false,
    })),
  );

  const handleDayTimeChange = (index, field, value) => {
    setAvailableDayAndTime((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleDoctorSubmit = async (values, actions) => {
    try {
      const selectedSlots = availableDayAndTime
        .filter((slot) => slot.enabled && slot.startTime && slot.endTime)
        .map((slot) => ({
          day: slot.day,
          time: `${slot.startTime} - ${slot.endTime}`,
        }));

      if (selectedSlots.length === 0) {
        toastError("Please select at least one available day and time.");
        actions.setSubmitting(false);
        return;
      }

      const payload = {
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        about: values.about,
        type: values.type,
        availableDayAndTime: selectedSlots,
        longitude: parseFloat(values.longitude) || 0,
        latitude: parseFloat(values.latitude) || 0,
        consultationFee: values.consultationFee,
        specialty: values.specialty,
        experience: values.experience,
        organization: values.organization,
        RCCMNIFNumber: values.RCCMNIFNumber,
        authorizationNumber: values.authorizationNumber,
        dob: values.dob,
        bloodGroup: values.bloodGroup,
        gender: values.gender,
        phoneNumber: values.phoneNumber,
        addAccount: {
          teleMoney: Number(values.teleMoney),
          orangeMoney: Number(values.orangeMoney),
        },
        merchantCode: values.merchantCode,
        orangeType: values.orangeType,
      };

      const response = await doctorRegister(payload).unwrap();
      if (response?.message) {
        actions.resetForm();
        setAvailableDayAndTime(
          DAYS_OF_WEEK.map((day) => ({
            day,
            startTime: "",
            endTime: "",
            enabled: false,
          })),
        );
        toastSuccess(
          response?.message ||
            "Doctor registration successful! Please check your email for verification.",
        );
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Doctor registration failed. Please try again.",
      );
    }
    setTimeout(() => actions.setSubmitting(false), 600);
  };

  return (
    <Formik
      initialValues={doctorInitialValues}
      validationSchema={doctorRegisterSchema}
      onSubmit={handleDoctorSubmit}
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
            placeholder="Dr. John Doe"
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
            placeholder="eg. doctor@mail.com"
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
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            placeholder="+1234567890"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : ""
            }
            height={48}
            className="text-sm"
          />

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              About
            </label>
            <textarea
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Tell us about yourself and your practice..."
              rows={3}
              className={`w-full px-4 py-3 border text-sm ${
                touched.about && errors.about
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              } rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all`}
            />
            {touched.about && errors.about && (
              <p className="mt-1 text-sm text-red-500">{errors.about}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Consultation Type
              </label>
              <select
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2.5 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="In-Clinic Consultation">
                  In-Clinic Consultation
                </option>
                <option value="Online Consultation">Online Consultation</option>
                <option value="Both">Both</option>
              </select>
              {touched.type && errors.type && (
                <p className="mt-1 text-sm text-red-500">{errors.type}</p>
              )}
            </div>

            <Input
              label="Consultation Fee"
              type="text"
              name="consultationFee"
              placeholder="100 CFA"
              value={values.consultationFee}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.consultationFee && errors.consultationFee
                  ? errors.consultationFee
                  : ""
              }
              height={48}
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Specialty
              </label>
              <select
                name="specialty"
                value={values.specialty}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2.5 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Specialty</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="General Medicine">General Medicine</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Ophthalmology">Ophthalmology</option>
                <option value="ENT">ENT</option>
              </select>
              {touched.specialty && errors.specialty && (
                <p className="mt-1 text-sm text-red-500">{errors.specialty}</p>
              )}
            </div>

            <Input
              label="Experience"
              type="text"
              name="experience"
              placeholder="10 years"
              value={values.experience}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.experience && errors.experience ? errors.experience : ""
              }
              height={48}
              className="text-sm"
            />
          </div>

          <Input
            label="Organization"
            type="text"
            name="organization"
            placeholder="Heart Care Clinic"
            value={values.organization}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.organization && errors.organization
                ? errors.organization
                : ""
            }
            height={48}
            className="text-sm"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="RCCM/NIF Number"
              type="text"
              name="RCCMNIFNumber"
              placeholder="RC123456"
              value={values.RCCMNIFNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.RCCMNIFNumber && errors.RCCMNIFNumber
                  ? errors.RCCMNIFNumber
                  : ""
              }
              height={48}
              className="text-sm"
            />

            <Input
              label="Authorization Number"
              type="text"
              name="authorizationNumber"
              placeholder="AUTH987654"
              value={values.authorizationNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.authorizationNumber && errors.authorizationNumber
                  ? errors.authorizationNumber
                  : ""
              }
              height={48}
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.dob && errors.dob ? errors.dob : ""}
              height={48}
              className="text-sm"
            />

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={values.bloodGroup}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2.5 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
              {touched.bloodGroup && errors.bloodGroup && (
                <p className="mt-1 text-sm text-red-500">{errors.bloodGroup}</p>
              )}
            </div>
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
              <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
            )}
          </div>

          {/* Available Day's & Time Section */}
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Available Day&apos;s & Time
            </label>
            <div className="space-y-3">
              {availableDayAndTime.map((slot, index) => (
                <div key={slot.day} className="flex items-center gap-3">
                  <div className="w-28 flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={slot.enabled}
                      onChange={(e) =>
                        handleDayTimeChange(index, "enabled", e.target.checked)
                      }
                      className="w-4 h-4 accent-[#0ebe7f] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{slot.day}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-1">
                    <div className="relative flex-1">
                      <input
                        type="time"
                        value={slot.startTime}
                        onChange={(e) =>
                          handleDayTimeChange(
                            index,
                            "startTime",
                            e.target.value,
                          )
                        }
                        disabled={!slot.enabled}
                        className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                          slot.enabled
                            ? "border-gray-300 focus:border-[#0ebe7f] focus:ring-2 focus:ring-[#0ebe7f]/30 text-gray-700"
                            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      />
                    </div>

                    <span className="text-gray-400 text-sm font-medium">-</span>

                    <div className="relative flex-1">
                      <input
                        type="time"
                        value={slot.endTime}
                        onChange={(e) =>
                          handleDayTimeChange(index, "endTime", e.target.value)
                        }
                        disabled={!slot.enabled}
                        className={`w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all ${
                          slot.enabled
                            ? "border-gray-300 focus:border-[#0ebe7f] focus:ring-2 focus:ring-[#0ebe7f]/30 text-gray-700"
                            : "border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
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
                setFieldValue("longitude", data.location.coordinates[0]);
                setFieldValue("latitude", data.location.coordinates[1]);
              }}
            />
          ) : (
            <div className="text-sm text-gray-500">Loading Google Maps...</div>
          )}

          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Payment Account
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Tele Money"
                  type="text"
                  name="teleMoney"
                  placeholder="10435678"
                  value={values.teleMoney}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.teleMoney && errors.teleMoney
                      ? errors.teleMoney
                      : ""
                  }
                  height={48}
                  className="text-sm"
                />

                <Input
                  label="Orange Money"
                  type="text"
                  name="orangeMoney"
                  placeholder="50567950"
                  value={values.orangeMoney}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.orangeMoney && errors.orangeMoney
                      ? errors.orangeMoney
                      : ""
                  }
                  height={48}
                  className="text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Merchant Code"
                  type="text"
                  name="merchantCode"
                  placeholder="12 66 80"
                  value={values.merchantCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.merchantCode && errors.merchantCode
                      ? errors.merchantCode
                      : ""
                  }
                  height={48}
                  className="text-sm"
                />

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Orange Type
                  </label>
                  <select
                    name="orangeType"
                    value={values.orangeType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="w-full p-3 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="merchantCode">Merchant Code</option>
                    <option value="personal">Personal</option>
                  </select>
                  {touched.orangeType && errors.orangeType && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.orangeType}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

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
            loading={isDoctorLoading}
            disabled={isDoctorLoading}
            className="shadow-md shadow-[#0ebe7f]/25"
            loaderSize={25}
          >
            {isDoctorLoading ? "Registering Doctor..." : "Register as Doctor"}
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

export default DoctorRegisterForm;
