import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import GooglePlaceInput from "@/components/ui/GooglePlaceInput";
import { useUpdateDoctorProfileMutation } from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";
import { useJsApiLoader } from "@react-google-maps/api";
import { validationSchema } from "./EditProfileSchema";
import { authCookies } from "@/utils/cookieUtils";
import { selectUser, updateUser } from "@/redux/slices/authSlice";
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const DoctorSettingsEditProfile = () => {
  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [updateDoctorProfile, { isLoading }] = useUpdateDoctorProfileMutation();
  const user = useSelector(selectUser);
  const currentUser = user;
  console.log("Current User Data in EditProfile:", currentUser);
  const [availableDayAndTime, setAvailableDayAndTime] = useState(
    DAYS_OF_WEEK.map((day) => ({
      day,
      available: false,
      openingTime: "06:00 AM",
      closingTime: "09:00 PM",
    })),
  );
  const [attachDoc, setAttachDoc] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "1980-05-15";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch {
      return "1980-05-15";
    }
  };
  const parseAddAccount = (addAccount) => {
    if (!addAccount) return { teleMoney: "", orangeMoney: "" };
    try {
      const parsed =
        typeof addAccount === "string" ? JSON.parse(addAccount) : addAccount;
      return {
        teleMoney: parsed?.teleMoney || "",
        orangeMoney: parsed?.orangeMoney || "",
      };
    } catch {
      return { teleMoney: "", orangeMoney: "" };
    }
  };
  const addAccountData = parseAddAccount(currentUser?.addAccount);
  const initialValues = {
    fullName: currentUser?.fullName || "",
    phoneNumber: currentUser?.phoneNumber || "",
    about: currentUser?.about || "",
    type: currentUser?.type || "",
    consultationFee: currentUser?.consultationFee || "",
    specialty: currentUser?.specialty || "",
    experience: currentUser?.experience || "0",

    authorizationNumber: currentUser?.authorizationNumber || "",
    dob: formatDateForInput(currentUser?.dob),
    bloodGroup: currentUser?.bloodGroup || "A+",
    gender: currentUser?.gender || "",
    longitude: currentUser?.location?.coordinates[0] || "",
    latitude: currentUser?.location?.coordinates[1] || "",
    location: currentUser?.address || null,
    teleMoney: addAccountData.teleMoney,
    orangeMoney: addAccountData.orangeMoney,
    merchantCode: currentUser?.merchantCode || "",
    attachDoc: currentUser?.attachDoc || null,
  };

  const handleDayAvailabilityChange = (index, value) => {
    setAvailableDayAndTime((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, available: value } : item,
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
  const handleDoctorUpdate = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("about", values.about);
      formData.append("type", values.type);
      formData.append("consultationFee", values.consultationFee);
      formData.append("specialty", values.specialty);
      formData.append("experience", values.experience);

      formData.append("authorizationNumber", values.authorizationNumber);
      formData.append("dob", values.dob);
      formData.append("bloodGroup", values.bloodGroup);
      formData.append("gender", values.gender);
      formData.append("longitude", parseFloat(values.longitude) || 0);
      formData.append("latitude", parseFloat(values.latitude) || 0);
      formData.append("address", values.location?.address || "");
      formData.append("merchantCode", values.merchantCode);

      formData.append(
        "availableDayAndTime",
        JSON.stringify(availableDayAndTime),
      );
      formData.append(
        "addAccount",
        JSON.stringify({
          teleMoney: Number(values.teleMoney),
          orangeMoney: Number(values.orangeMoney),
        }),
      );
      if (attachDoc) {
        formData.append("attachDoc", attachDoc);
      }
      const response = await updateDoctorProfile({
        doctorData: formData,
      }).unwrap();

      if (response?.message) {
        const updatedUserData = response?.data || response;
        dispatch(updateUser(updatedUserData));
        authCookies.updateUser(updatedUserData);
        setAttachDoc(null);
        setImagePreview(null);
        toastSuccess(response?.message || "Profile updated successfully!");
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Profile update failed. Please try again.",
      );
    }
    setTimeout(() => actions.setSubmitting(false), 600);
  };

  return (
    <div className="w-full p-5">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleDoctorUpdate}
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
            <div className="flex items-center gap-4">
              <img
                src={
                  imagePreview ||
                  currentUser?.attachDoc ||
                  "/default-doctor-avatar.png"
                }
                alt="Doctor"
                className="w-20 h-20 sm:w-20 sm:h-20 rounded-2xl object-cover"
              />
              <div className="flex-1">
                <div className="mt-2">
                  <Button
                    type="button"
                    variant="grayOutline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    hidden
                    onChange={handleFileChange}
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                  />
                </div>
              </div>
            </div>
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
                  <option value="Video Consultation">Video Consultation</option>
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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.specialty}
                  </p>
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
                  touched.experience && errors.experience
                    ? errors.experience
                    : ""
                }
                height={48}
                className="text-sm"
              />
            </div>

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
                  <p className="mt-1 text-sm text-red-500">
                    {errors.bloodGroup}
                  </p>
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

            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Available Day&apos;s & Time
              </label>
              <div className="space-y-2">
                {availableDayAndTime.map((slot, index) => (
                  <div
                    key={slot.day}
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <input
                        type="checkbox"
                        checked={slot.available}
                        onChange={(e) =>
                          handleDayAvailabilityChange(index, e.target.checked)
                        }
                        className="w-4 h-4 accent-[#0ebe7f] cursor-pointer"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {slot.day}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-600">
                        {slot.openingTime}
                      </span>
                      <span className="text-gray-400">-</span>
                      <span className="text-xs text-gray-600">
                        {slot.closingTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Upload Document
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0ebe7f]/30 cursor-pointer"
              />
              {attachDoc && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ File selected: {attachDoc.name}
                </p>
              )}
            </div>

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

                  {/* <div>
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
                  </div> */}
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="gradient"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
              className="shadow-md shadow-[#0ebe7f]/25"
              loaderSize={25}
            >
              {isLoading ? "Updating Profile..." : "Update Profile"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorSettingsEditProfile;
