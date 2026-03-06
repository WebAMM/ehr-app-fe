import React, { useState, useRef } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { toastError, toastSuccess } from "@/components/ui/Toast";
import { authCookies } from "@/utils/cookieUtils";

import { useJsApiLoader } from "@react-google-maps/api";
import GooglePlaceInput from "@/components/ui/GooglePlaceInput";
import {
  useAddClinicDoctorMutation,
  useUpdateClinicDoctorProfileMutation,
} from "@/services";
import { COUNTRIES } from "@/constant/Countries";
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  countryCode: Yup.string().required("Country code is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  about: Yup.string().required("About is required"),
  consultationFee: Yup.string().required("Consultation fee is required"),
  specialty: Yup.string().required("Specialty is required"),
  experience: Yup.string().required("Experience is required"),
  RCCMNIFNumber: Yup.string(),
  authorizationNumber: Yup.string().required(
    "Authorization number is required",
  ),
  dob: Yup.string().required("Date of birth is required"),
  bloodGroup: Yup.string().required("Blood group is required"),
  gender: Yup.string().required("Gender is required"),
  organization: Yup.string().required("Organization is required"),
  location: Yup.mixed().required("Location is required"),
});
const AddClinicDoctorForm = ({ onClose, onSuccess, doctorData }) => {
  const fileInputRef = useRef(null);
  const isEditMode = !!doctorData;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [addClinicDoctor, { isLoading: isAdding }] =
    useAddClinicDoctorMutation();
  const [updateClinicDoctor, { isLoading: isUpdating }] =
    useUpdateClinicDoctorProfileMutation();
  const isLoading = isAdding || isUpdating;

  const { getUser } = authCookies;
  const clinicId = getUser()?._id;

  const [availableDayAndTime, setAvailableDayAndTime] = useState(
    doctorData?.availableDayAndTime ||
      DAYS_OF_WEEK.map((day) => ({
        day,
        available: false,
        openingTime: "09:00 AM",
        closingTime: "05:00 PM",
      })),
  );
  const [attachDoc, setAttachDoc] = useState(null);
  const [imagePreview, setImagePreview] = useState(doctorData?.image || null);

  const initialValues = {
    fullName: doctorData?.name || "",
    countryCode: doctorData?.countryCode || "",
    phoneNumber: doctorData?.phone || "",
    about: doctorData?.about || "",
    consultationFee: doctorData?.consultationFee || "",
    specialty: doctorData?.role || "",
    experience: doctorData?.meta || "",
    RCCMNIFNumber: doctorData?.RCCMNIFNumber || "",
    authorizationNumber: doctorData?.authorizationNumber || "",
    dob: doctorData?.dob
      ? new Date(doctorData.dob).toISOString().split("T")[0]
      : "",
    bloodGroup: doctorData?.bloodGroup || "A+",
    gender: doctorData?.gender || "Male",
    organization: doctorData?.organization || "",
    location: doctorData?.location ? { address: doctorData.location } : null,
    longitude: "",
    latitude: "",
  };

  const handleDayAvailabilityChange = (index, value) => {
    setAvailableDayAndTime((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, available: value } : item,
      ),
    );
  };

  const handleTimeChange = (index, timeType, value) => {
    setAvailableDayAndTime((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [timeType]: value } : item,
      ),
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAttachDoc(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      const hasChanged = (key) => {
        return initialValues[key] !== values[key];
      };

      if (isEditMode) {
        if (hasChanged("fullName"))
          formData.append("fullName", values.fullName);
        if (hasChanged("countryCode"))
          formData.append("countryCode", values.countryCode);
        if (hasChanged("phoneNumber"))
          formData.append("phoneNumber", values.phoneNumber);
        if (hasChanged("about")) formData.append("about", values.about);
        if (hasChanged("consultationFee"))
          formData.append("consultationFee", values.consultationFee);
        if (hasChanged("specialty"))
          formData.append("specialty", values.specialty);
        if (hasChanged("experience"))
          formData.append("experience", values.experience);
        if (hasChanged("RCCMNIFNumber"))
          formData.append("RCCMNIFNumber", values.RCCMNIFNumber || "");
        if (hasChanged("authorizationNumber"))
          formData.append("authorizationNumber", values.authorizationNumber);
        if (hasChanged("dob")) formData.append("dob", values.dob);
        if (hasChanged("bloodGroup"))
          formData.append("bloodGroup", values.bloodGroup);
        if (hasChanged("gender")) formData.append("gender", values.gender);
        if (hasChanged("organization"))
          formData.append("organization", values.organization);
        if (hasChanged("location")) {
          formData.append(
            "location",
            values.location?.address || values.location || "",
          );
        }
      } else {
        // In add mode, send all fields
        formData.append("fullName", values.fullName);
        formData.append("countryCode", values.countryCode);
        formData.append("phoneNumber", values.phoneNumber);
        formData.append("about", values.about);
        formData.append("consultationFee", values.consultationFee);
        formData.append("specialty", values.specialty);
        formData.append("experience", values.experience);
        formData.append("RCCMNIFNumber", values.RCCMNIFNumber || "");
        formData.append("authorizationNumber", values.authorizationNumber);
        formData.append("dob", values.dob);
        formData.append("bloodGroup", values.bloodGroup);
        formData.append("gender", values.gender);
        formData.append("organization", values.organization);
        formData.append(
          "location",
          values.location?.address || values.location || "",
        );
      }

      // Always check availability changes and file changes
      if (
        JSON.stringify(availableDayAndTime) !==
        JSON.stringify(doctorData?.availableDayAndTime || [])
      ) {
        availableDayAndTime.forEach((day, index) => {
          formData.append(`availableDayAndTime[${index}][day]`, day.day);
          formData.append(
            `availableDayAndTime[${index}][openingTime]`,
            day.openingTime,
          );
          formData.append(
            `availableDayAndTime[${index}][closingTime]`,
            day.closingTime,
          );
          formData.append(
            `availableDayAndTime[${index}][available]`,
            day.available,
          );
        });
      }

      if (!isEditMode) {
        formData.append("clinicId[0]", clinicId);
      }

      if (attachDoc) {
        formData.append("attachDoc", attachDoc);
      }

      let response;
      if (isEditMode) {
        response = await updateClinicDoctor({
          doctorData: formData,
          id: doctorData.id,
        }).unwrap();
      } else {
        response = await addClinicDoctor({
          doctorData: formData,
        }).unwrap();
      }

      if (response?.message) {
        toastSuccess(
          response?.message ||
            (isEditMode
              ? "Doctor updated successfully!"
              : "Doctor added successfully!"),
        );
        onSuccess?.();
        onClose();
      }
    } catch (error) {
      toastError(
        error?.data?.message ||
          `Failed to ${isEditMode ? "update" : "add"} doctor. Please try again.`,
      );
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto px-1">
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
          setFieldValue,
        }) => (
          <Form className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-xs">No Image</span>
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="grayOutline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Photo
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG or PDF (Max 5MB)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="Dr. John Doe"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.fullName && errors.fullName ? errors.fullName : ""
                }
                height={40}
              />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Country Code
                </label>
                <select
                  name="countryCode"
                  value={values.countryCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-2.5 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Country</option>
                  {COUNTRIES.map((country) => (
                    <option key={country.id} value={`+${country.phone_code}`}>
                      {country.name} (+{country.phone_code})
                    </option>
                  ))}
                </select>
                {touched.countryCode && errors.countryCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.countryCode}
                  </p>
                )}
              </div>

              <Input
                label="Phone Number"
                type="text"
                name="phoneNumber"
                placeholder="1234567890"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : ""
                }
                height={40}
              />
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.specialty}
                  </p>
                )}
              </div>

              <Input
                label="Experience"
                type="text"
                name="experience"
                placeholder="e.g., 5 years"
                value={values.experience}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.experience && errors.experience
                    ? errors.experience
                    : ""
                }
                height={40}
              />

              <Input
                label="Consultation Fee"
                type="text"
                name="consultationFee"
                placeholder="e.g., 5000 XAF"
                value={values.consultationFee}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.consultationFee && errors.consultationFee
                    ? errors.consultationFee
                    : ""
                }
                height={40}
              />

              <Input
                label="Date of Birth"
                type="date"
                name="dob"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dob && errors.dob ? errors.dob : ""}
                height={40}
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
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
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
                  className="w-full p-2.5 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <Input
                label="Authorization Number"
                type="text"
                name="authorizationNumber"
                placeholder="AUTH123456"
                value={values.authorizationNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.authorizationNumber && errors.authorizationNumber
                    ? errors.authorizationNumber
                    : ""
                }
                height={40}
              />

              <Input
                label="RCCM/NIF Number (Optional)"
                type="text"
                name="RCCMNIFNumber"
                placeholder="RCCM123456"
                value={values.RCCMNIFNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                height={40}
              />

              <Input
                label="Organization"
                type="text"
                name="organization"
                placeholder="Hospital/Clinic name"
                value={values.organization}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.organization && errors.organization
                    ? errors.organization
                    : ""
                }
                height={40}
              />

              {/* <Input
                label="Location"
                type="text"
                name="location"
                placeholder="City, Country"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.location && errors.location ? errors.location : ""
                }
                height={40}
              /> */}
              {isLoaded ? (
                <GooglePlaceInput
                  name="location"
                  label="Location"
                  type="establishment"
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
                <div className="text-sm text-gray-500">
                  Loading Google Maps...
                </div>
              )}
            </div>

            {/* About */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                About
              </label>
              <textarea
                name="about"
                rows={3}
                placeholder="Brief description about the doctor..."
                value={values.about}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full p-2.5 text-gray-700 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {touched.about && errors.about && (
                <p className="text-red-500 text-xs mt-1">{errors.about}</p>
              )}
            </div>
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Available Days & Time
              </label>
              <div className="space-y-3">
                {availableDayAndTime.map((day, index) => (
                  <div
                    key={day.day}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-2 w-32">
                      <input
                        type="checkbox"
                        checked={day.available}
                        onChange={(e) =>
                          handleDayAvailabilityChange(index, e.target.checked)
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{day.day}</span>
                    </div>
                    {day.available && (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="time"
                          value={day.openingTime}
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "openingTime",
                              e.target.value,
                            )
                          }
                          className="p-2 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-sm">to</span>
                        <input
                          type="time"
                          value={day.closingTime}
                          onChange={(e) =>
                            handleTimeChange(
                              index,
                              "closingTime",
                              e.target.value,
                            )
                          }
                          className="p-2 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                type="button"
                variant="grayOutline"
                onClick={onClose}
                disabled={isSubmitting || isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="secondary" disabled={isLoading}>
                {isLoading
                  ? isEditMode
                    ? "Updating..."
                    : "Adding..."
                  : isEditMode
                    ? "Update Doctor"
                    : "Add Doctor"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddClinicDoctorForm;
