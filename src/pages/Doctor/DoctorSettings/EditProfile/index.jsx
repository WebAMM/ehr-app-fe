import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Clock3 } from "lucide-react";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import CustomAvatar from "@/components/ui/Avatar";

const TimeInput = ({ name, value, onChange, onBlur }) => {
  return (
    <div className="relative w-full">
      <input
        type="time"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="w-full h-8 sm:h-10 px-2 sm:px-3 pr-9 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 focus:border-[#0ebe7f] focus:ring-[#0ebe7f] transition-all text-xs sm:text-sm"
      />
      <Clock3 className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );
};

const DoctorSettingsEditProfile = () => {
  const initialValues = {
    fullName: "Dr. David Patel",
    countryCode: "+32",
    phoneNumber: "+221 77 123 4567",
    specialty: "Cardiologist",
    experience: "10+ Year",
    organization: "Golden Gate Cardiology Center",
    rcmfNumber: "RCMF123456",
    authorizationNumber: "AUT4789012",
    dob: "1980-05-15",
    bloodGroup: "A+",
    gender: "Male",
    workLocation:
      "Jl. Tangkuban Perahu No.31-33, Kauman, Kec. Klojen, Kota Malang, Jawa Timur 65119",
    consultationFees: "500 CAD",
    website: "http://drdpatel.com",
    paymentMethodName: "Dranmoney",
    paymentMethodNumber: "+33277806251",
    availability: {
      Monday: { from: "", to: "" },
      Tuesday: { from: "", to: "" },
      Wednesday: { from: "", to: "" },
      Thursday: { from: "", to: "" },
      Friday: { from: "", to: "" },
      Saturday: { from: "", to: "" },
      Sunday: { from: "", to: "" },
    },
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().trim().required("Full name is required"),
    countryCode: Yup.string().trim().required("Country code is required"),
    phoneNumber: Yup.string().trim().required("Phone number is required"),
    specialty: Yup.string().trim().required("Specialty is required"),
    experience: Yup.string().trim().required("Experience is required"),
    organization: Yup.string().trim().required("Organization is required"),
    rcmfNumber: Yup.string().trim().required("RCMF number is required"),
    authorizationNumber: Yup.string().trim(),
    dob: Yup.string().trim().required("DOB is required"),
    bloodGroup: Yup.string().trim().required("Blood group is required"),
    gender: Yup.string().trim().required("Gender is required"),
    workLocation: Yup.string().trim().required("Work location is required"),
    consultationFees: Yup.string()
      .trim()
      .required("Consultation fees is required"),
    website: Yup.string().trim(),
    paymentMethodName: Yup.string().trim(),
    paymentMethodNumber: Yup.string().trim(),
  });

  return (
    <div className="w-full">
      <Card
        title="Edit Profile"
        padding="sm"
        shadow="sm"
        parentClass="p-2 sm:p-4 md:p-6 lg:p-8 rounded-2xl"
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            // Hook this to your API when ready
            // For now we just keep the UI/validation behavior.

            console.log("Update doctor profile", values);
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
            <Form className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Doctor"
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl object-cover"
                />
                <div className="flex-1">
                  <div className="mt-2">
                    <Button type="button" variant="grayOutline" size="sm">
                      Change Photo
                    </Button>
                  </div>
                </div>
              </div>

              <Input
                label="Full Name *"
                name="fullName"
                placeholder="Enter full name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName ? errors.fullName : ""}
              />

              <div>
                <label className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                  <Input
                    name="countryCode"
                    placeholder="+00"
                    value={values.countryCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.countryCode ? errors.countryCode : ""}
                    containerClass="col-span-1"
                  />
                  <Input
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phoneNumber ? errors.phoneNumber : ""}
                    containerClass="col-span-2"
                  />
                </div>
              </div>

              <Input
                label="Specialty *"
                name="specialty"
                placeholder="Enter specialty"
                value={values.specialty}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.specialty ? errors.specialty : ""}
              />

              <Input
                label="Experience *"
                name="experience"
                placeholder="e.g. 10+ Year"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.experience ? errors.experience : ""}
              />

              <Input
                label="Organization *"
                name="organization"
                placeholder="Enter organization"
                value={values.organization}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.organization ? errors.organization : ""}
              />

              <Input
                label="RCMF Number *"
                name="rcmfNumber"
                placeholder="RCMFxxxxxx"
                value={values.rcmfNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.rcmfNumber ? errors.rcmfNumber : ""}
              />

              <Input
                label="Authorization Number (optional)"
                name="authorizationNumber"
                placeholder="AUTxxxxxxx"
                value={values.authorizationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.authorizationNumber ? errors.authorizationNumber : ""
                }
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <Input
                  label="DOB *"
                  name="dob"
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.dob ? errors.dob : ""}
                />

                <div>
                  <label className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Blood Group *
                  </label>
                  <select
                    name="bloodGroup"
                    value={values.bloodGroup}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-10 sm:h-12 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all text-xs sm:text-sm ${
                      touched.bloodGroup && errors.bloodGroup
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                  {touched.bloodGroup && errors.bloodGroup ? (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.bloodGroup}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full h-10 sm:h-12 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all text-xs sm:text-sm ${
                      touched.gender && errors.gender
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
                    }`}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {touched.gender && errors.gender ? (
                    <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                  ) : null}
                </div>
              </div>

              <Input
                label="Work Location *"
                name="workLocation"
                placeholder="Enter work location"
                value={values.workLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.workLocation ? errors.workLocation : ""}
              />

              <Input
                label="Consultation Fees *"
                name="consultationFees"
                placeholder="e.g. 500 CAD"
                value={values.consultationFees}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.consultationFees ? errors.consultationFees : ""}
              />

              <div>
                <p className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Available Day&apos;s &amp; Time
                </p>
                <div className="space-y-3">
                  {[
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((day) => (
                    <div
                      key={day}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 items-center"
                    >
                      <p className="text-xs sm:text-sm text-gray-700">{day}</p>
                      <TimeInput
                        name={`availability.${day}.from`}
                        value={values.availability[day].from}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <TimeInput
                        name={`availability.${day}.to`}
                        value={values.availability[day].to}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <Input
                label="Website"
                name="website"
                placeholder="https://"
                value={values.website}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.website ? errors.website : ""}
              />

              <div>
                <p className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-2">
                  Payment Methods
                </p>

                <div className="relative">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    <Input
                      name="paymentMethodName"
                      placeholder="Payment method"
                      value={values.paymentMethodName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <Input
                      name="paymentMethodNumber"
                      placeholder="Account number"
                      value={values.paymentMethodNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <Button type="button" variant="link" size="sm">
                    Add Account
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
              >
                Update Profile
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default DoctorSettingsEditProfile;
