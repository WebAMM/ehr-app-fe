import React, { useRef } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import { FaPlus, FaTrash, FaUpload, FaImage } from "react-icons/fa";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { toastSuccess, toastError } from "@/components/ui/Toast";
import { useUpdateClinicProfileMutation } from "@/services";
import GooglePlaceInput from "@/components/ui/GooglePlaceInput";
import { COUNTRIES } from "@/constant/Countries";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "@/redux";
import { authCookies } from "@/utils/cookieUtils";
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PlaceField = ({
  label,
  type,
  placeholder,
  error,
  onPlaceSelect,
  value,
  onChange,
}) => {
  const autoRef = useRef(null);

  const getTypes = () => {
    if (type === "city") return ["(cities)"];
    if (type === "(regions)") return ["(regions)"];
    if (type === "establishment") return ["establishment"];
    return ["address"];
  };

  const handlePlaceChanged = () => {
    const place = autoRef.current?.getPlace?.();
    if (!place?.geometry?.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const getComponent = (t) =>
      place.address_components?.find((c) => c.types.includes(t))?.long_name;

    let formattedData = {};

    if (type === "city") {
      formattedData = {
        name: getComponent("locality") || place.formatted_address || place.name,
        location: { type: "Point", coordinates: [lng, lat] },
      };
    } else if (type === "(regions)") {
      formattedData = {
        name:
          getComponent("administrative_area_level_1") ||
          getComponent("locality") ||
          place.name,
        location: { type: "Point", coordinates: [lng, lat] },
      };
    } else {
      formattedData = {
        address: place.formatted_address || place.name || "",
        location: { type: "Point", coordinates: [lng, lat] },
      };
    }

    if (onPlaceSelect) onPlaceSelect(formattedData);
  };

  return (
    <div>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <Autocomplete
        onLoad={(ac) => (autoRef.current = ac)}
        onPlaceChanged={handlePlaceChanged}
        options={{ types: getTypes() }}
      >
        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full px-2 sm:px-4 py-2 sm:py-3 border h-8 sm:h-12 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
          }`}
        />
      </Autocomplete>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

const ClinicUpdateSchema = Yup.object({
  typeOfHealthCenter: Yup.string()
    .oneOf(["clinic", "laboratory"], "Select a valid type")
    .required("Type of health center is required"),
  about: Yup.string().required("About is required"),
  logo: Yup.mixed().optional(),
  gallery: Yup.array().optional(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  zipCode: Yup.string().required("Zip code is required"),
  website: Yup.string().url("Enter a valid URL").optional(),
  RCCMIFNumber: Yup.string().required("RCCMIF number is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  countryCode: Yup.string().required("Country code is required"),

  status: Yup.string(),
  addAccount: Yup.object({
    teleMoney: Yup.string(),
    orangeMoney: Yup.string(),
  }),
  availableDayAndTime: Yup.array().of(
    Yup.object({
      day: Yup.string().required("Day is required"),
      openingTime: Yup.string().required("Opening time is required"),
      closingTime: Yup.string().required("Closing time is required"),
      available: Yup.boolean(),
    }),
  ),
});

const convertTo12HourFormat = (time24) => {
  const [hours, minutes] = time24.split(":");
  let hour = parseInt(hours, 10);
  const minute = minutes;
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  return `${hour}:${minute}${ampm}`;
};

const ClinicAndLabUpdateForm = ({ initialData = {} }) => {
  const [updateClinicProfile, { isLoading }] = useUpdateClinicProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const galleryRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const initialValues = {
    typeOfHealthCenter: initialData.typeOfHealthCenter || "clinic",
    logo: null,
    about: initialData.about || "",
    gallery: [],
    city: "",
    state: "",
    address: "",
    zipCode: "",
    website: "",
    RCCMIFNumber: "",
    addAccount: {
      teleMoney: "",
      orangeMoney: "",
    },
    phoneNumber: "",
    longitude: "",
    latitude: "",
    availableDayAndTime: initialData?.availableDayAndTime?.length
      ? initialData.availableDayAndTime
      : DAYS_OF_WEEK.map((day) => ({
          day,
          available: false,
          openingTime: "06:00",
          closingTime: "21:00",
        })),
    countryCode: initialData.countryCode || "",
    status: initialData.status || "",
  };
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("typeOfHealthCenter", values.typeOfHealthCenter);
      formData.append("about", values.about);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("address", values.address);
      formData.append("zipCode", values.zipCode);
      formData.append("website", values.website);
      formData.append("RCCMIFNumber", values.RCCMIFNumber);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("countryCode", values.countryCode);
      formData.append("longitude", values.longitude);
      formData.append("latitude", values.latitude);
      formData.append("status", "clinic");
      formData.append("addAccount[teleMoney]", values.addAccount.teleMoney);
      formData.append("addAccount[orangeMoney]", values.addAccount.orangeMoney);
      if (values.logo) {
        formData.append("logo", values.logo);
      }

      values.gallery.forEach((file) => {
        if (file) formData.append("gallery", file);
      });

      values.availableDayAndTime.forEach((slot, i) => {
        formData.append(
          `availableDayAndTime[${i}][day]`,
          slot.day.toLowerCase(),
        );
        formData.append(
          `availableDayAndTime[${i}][openingTime]`,
          convertTo12HourFormat(slot.openingTime),
        );
        formData.append(
          `availableDayAndTime[${i}][closingTime]`,
          convertTo12HourFormat(slot.closingTime),
        );
        formData.append(`availableDayAndTime[${i}][available]`, slot.available);
      });
      const response = await updateClinicProfile(formData).unwrap();

      if (response.message) {
        const updatedUserData = response?.data || response;
        dispatch(updateUser(updatedUserData));
        authCookies.updateUser(updatedUserData);
        toastSuccess(response?.message || "Profile updated successfully!");
        navigate("/sign-in");
      }
    } catch (error) {
      toastError(
        error?.data?.message || "Failed to update profile. Please try again.",
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ClinicUpdateSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form className="space-y-6">
          {/* Type of Health Center */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Type of Health Center <span className="text-red-500">*</span>
            </label>
            <select
              name="typeOfHealthCenter"
              value={values.typeOfHealthCenter}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-2 sm:py-3 border h-8 sm:h-12 text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all bg-white ${
                touched.typeOfHealthCenter && errors.typeOfHealthCenter
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              }`}
            >
              <option value="">Select type</option>
              <option value="clinic">Clinic</option>
              <option value="laboratory">Laboratory</option>
            </select>
            {touched.typeOfHealthCenter && errors.typeOfHealthCenter && (
              <p className="mt-1 text-xs text-red-500">
                {errors.typeOfHealthCenter}
              </p>
            )}
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Logo
            </label>
            <input
              ref={logoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                setFieldValue("logo", e.currentTarget.files[0] || null)
              }
            />
            <div
              onClick={() => logoRef.current?.click()}
              className="flex items-center gap-3 px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0ebe7f] hover:bg-[#0ebe7f]/5 transition-all"
            >
              <FaUpload className="text-gray-400" size={14} />
              <span className="text-sm text-gray-500">
                {values.logo ? values.logo.name : "Click to upload logo"}
              </span>
            </div>
            {values.logo && (
              <div className="mt-4 flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                  <img
                    src={URL.createObjectURL(values.logo)}
                    alt="Logo preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Preview:</span>{" "}
                    {values.logo.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => setFieldValue("logo", null)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                  >
                    <FaTrash size={12} /> Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              About <span className="text-red-500">*</span>
            </label>
            <textarea
              name="about"
              value={values.about}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={4}
              placeholder="Tell us about your clinic/laboratory"
              className={`w-full px-4 py-3 border text-xs sm:text-sm rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all resize-none ${
                touched.about && errors.about
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              }`}
            />
            {touched.about && errors.about && (
              <p className="mt-1 text-xs text-red-500">{errors.about}</p>
            )}
          </div>

          {/* Gallery Upload */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Gallery
            </label>
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.currentTarget.files);
                setFieldValue("gallery", [...values.gallery, ...files]);
              }}
            />
            <div
              onClick={() => galleryRef.current?.click()}
              className="flex items-center gap-3 px-4 py-3 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0ebe7f] hover:bg-[#0ebe7f]/5 transition-all"
            >
              <FaUpload className="text-gray-400" size={14} />
              <span className="text-sm text-gray-500">
                {values.gallery.length > 0
                  ? `${values.gallery.length} file(s) selected`
                  : "Click to upload gallery images"}
              </span>
            </div>
            {values.gallery.length > 0 && (
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    Gallery Preview ({values.gallery.length} image
                    {values.gallery.length === 1 ? "" : "s"})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {values.gallery.map((file, i) => (
                      <div key={i} className="relative group">
                        <div className="relative w-full aspect-square rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Gallery ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue(
                                  "gallery",
                                  values.gallery.filter((_, idx) => idx !== i),
                                )
                              }
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                              title="Remove image"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 truncate text-center">
                          {file.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setFieldValue("gallery", [])}
                    className="text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                  >
                    <FaTrash size={12} /> Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => galleryRef.current?.click()}
                    className="text-sm font-medium text-[#0ebe7f] hover:text-[#0daa6f] flex items-center gap-1"
                  >
                    <FaPlus size={12} /> Add More
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <PlaceField
              label="City *"
              type="city"
              placeholder="Search city"
              error={touched.city && errors.city ? errors.city : ""}
              onPlaceSelect={(data) => {
                setFieldValue("city", data.name || "");
                setFieldValue("latitude", data.location.coordinates[1]);
                setFieldValue("longitude", data.location.coordinates[0]);
              }}
              value={values.city}
              onChange={(val) => setFieldValue("city", val)}
            />
            <PlaceField
              label="State *"
              type="(regions)"
              placeholder="Search state / region"
              error={touched.state && errors.state ? errors.state : ""}
              onPlaceSelect={(data) => setFieldValue("state", data.name || "")}
              value={values.state}
              onChange={(val) => setFieldValue("state", val)}
            />
            <Input
              label="Zip Code *"
              name="zipCode"
              placeholder="e.g. 54000"
              value={values.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.zipCode && errors.zipCode ? errors.zipCode : ""}
            />
          </div>

          {/* Website */}
          <Input
            label="Website"
            name="website"
            placeholder="https://example.com"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.website && errors.website ? errors.website : ""}
          />

          {/* RCCMIF Number */}
          <Input
            label="RCCMIF Number *"
            name="RCCMIFNumber"
            placeholder="e.g. RC123456"
            value={values.RCCMIFNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.RCCMIFNumber && errors.RCCMIFNumber
                ? errors.RCCMIFNumber
                : ""
            }
          />
          <div className="grid grid-cols-4 gap-3">
            <div className="">
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
                {COUNTRIES?.map((country) => (
                  <option key={country.id} value={`+${country.phone_code}`}>
                    {country.name} (+{country.phone_code})
                  </option>
                ))}
              </select>
              {touched.countryCode && errors.countryCode && (
                <p className=" text-sm text-red-500">{errors.countryCode}</p>
              )}
            </div>
            <div className="col-span-3">
              <Input
                label="Phone Number *"
                name="phoneNumber"
                placeholder="e.g. 75504171"
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.phoneNumber && errors.phoneNumber
                    ? errors.phoneNumber
                    : ""
                }
              />
            </div>
          </div>
          {isLoaded ? (
            <GooglePlaceInput
              name="location"
              label="Address *"
              type="establishment"
              placeholder="Search for your address"
              formik={{
                values,
                setFieldValue,
                handleBlur,
                touched,
                errors,
              }}
              onPlaceSelect={(data) => {
                setFieldValue("address", data.address || "");
                setFieldValue("longitude", data.location.coordinates[0]);
                setFieldValue("latitude", data.location.coordinates[1]);
              }}
            />
          ) : (
            <div className="text-sm text-gray-500">Loading Google Maps...</div>
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Add Account</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Tele Money"
                name="addAccount.teleMoney"
                placeholder="Tele Money account number"
                value={values.addAccount.teleMoney}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                label="Orange Money"
                name="addAccount.orangeMoney"
                placeholder="Orange Money account number"
                value={values.addAccount.orangeMoney}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </div>
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-700">
              Available Days & Time
            </label>
            <div className="space-y-3">
              {values.availableDayAndTime.map((day, index) => (
                <div
                  key={day.day}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2 w-32">
                    <input
                      type="checkbox"
                      checked={day.available}
                      onChange={(e) => {
                        const updated = values.availableDayAndTime.map(
                          (item, i) =>
                            i === index
                              ? { ...item, available: e.target.checked }
                              : item,
                        );
                        setFieldValue("availableDayAndTime", updated);
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">{day.day}</span>
                  </div>
                  {day.available && (
                    <div className="flex items-center gap-2 flex-1">
                      <input
                        type="time"
                        value={day.openingTime}
                        onChange={(e) => {
                          const updated = values.availableDayAndTime.map(
                            (item, i) =>
                              i === index
                                ? { ...item, openingTime: e.target.value }
                                : item,
                          );
                          setFieldValue("availableDayAndTime", updated);
                        }}
                        className="p-2 border border-gray-300 rounded text-sm"
                      />
                      <span className="text-sm">to</span>
                      <input
                        type="time"
                        value={day.closingTime}
                        onChange={(e) => {
                          const updated = values.availableDayAndTime.map(
                            (item, i) =>
                              i === index
                                ? { ...item, closingTime: e.target.value }
                                : item,
                          );
                          setFieldValue("availableDayAndTime", updated);
                        }}
                        className="p-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  )}
                </div>
              ))}
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
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ClinicAndLabUpdateForm;
