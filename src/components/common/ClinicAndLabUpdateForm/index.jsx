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
const GOOGLE_MAPS_LIBRARIES = ["places"];
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DAY_NAME_MAP = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  thrusday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

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

const createClinicUpdateSchema = ({
  hideTypeField = false,
  showIdentityFields = false,
} = {}) =>
  Yup.object({
    typeOfHealthCenter: hideTypeField
      ? Yup.string().notRequired()
      : Yup.string()
          .oneOf(["clinic", "laboratory"], "Select a valid type")
          .required("Type of health center is required"),
    fullName: showIdentityFields
      ? Yup.string().trim().required("Full name is required")
      : Yup.string().trim(),
    email: showIdentityFields
      ? Yup.string().email("Enter a valid email").required("Email is required")
      : Yup.string().email("Enter a valid email"),
    about: showIdentityFields
      ? Yup.string().trim()
      : Yup.string().trim().required("About is required"),
    logo: Yup.mixed().nullable().optional(),
    gallery: Yup.array().optional(),
    existingGallery: Yup.array().optional(),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    zipCode: Yup.string().required("Zip code is required"),
    website: Yup.string().url("Enter a valid URL").optional(),
    RCCMNIFNumber: Yup.string()
      .required("RCCM / NIF number is required")
      .optional(),
    phoneNumber: Yup.string().required("Phone number is required"),
    countryCode: Yup.string().required("Country code is required"),
    status: Yup.string(),
    addAccount: Yup.object({
      orangeMoney: Yup.string().optional(),
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

const convertTo24HourFormat = (time) => {
  if (!time) return "00:00";
  const cleaned = time.trim().toLowerCase();

  if (/^\d{1,2}:\d{2}$/.test(cleaned)) {
    const [h, m] = cleaned.split(":");
    return `${String(parseInt(h, 10)).padStart(2, "0")}:${m}`;
  }
  const match = cleaned.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!match) return "00:00";
  let hour = parseInt(match[1], 10);
  const minute = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];
  if (period === "pm" && hour !== 12) hour += 12;
  if (period === "am" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const parseAddAccount = (addAccount) => {
  if (!addAccount) return { orangeMoney: "" };

  try {
    const parsed =
      typeof addAccount === "string" ? JSON.parse(addAccount) : addAccount;

    return {
      orangeMoney: parsed?.orangeMoney || "",
    };
  } catch {
    return { orangeMoney: "" };
  }
};

const normalizeCountryCode = (countryCode) => {
  if (!countryCode) return "";

  const trimmed = String(countryCode).trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return trimmed;

  return /^\d+$/.test(trimmed) ? `+${trimmed}` : trimmed;
};

const normalizeDayName = (day) =>
  DAY_NAME_MAP[
    String(day || "")
      .trim()
      .toLowerCase()
  ];

const normalizeAvailabilitySlots = (slots = []) => {
  const normalizedSlots = new Map();

  slots.forEach((slot) => {
    const day = normalizeDayName(slot?.day);
    if (!day || normalizedSlots.has(day)) return;

    normalizedSlots.set(day, {
      day,
      available: Boolean(slot?.available),
      openingTime: convertTo24HourFormat(slot?.openingTime || "06:00"),
      closingTime: convertTo24HourFormat(slot?.closingTime || "21:00"),
    });
  });

  return DAYS_OF_WEEK.map(
    (day) =>
      normalizedSlots.get(day) || {
        day,
        available: false,
        openingTime: "06:00",
        closingTime: "21:00",
      },
  );
};

const ClinicAndLabUpdateForm = ({
  initialData = {},
  hideTypeField = false,
  showIdentityFields = false,
}) => {
  const [updateClinicProfile, { isLoading }] = useUpdateClinicProfileMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoRef = useRef(null);
  const galleryRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: GOOGLE_MAPS_LIBRARIES,
  });
  const validationSchema = createClinicUpdateSchema({
    hideTypeField,
    showIdentityFields,
  });
  const normalizedAddAccount = parseAddAccount(initialData.addAccount);
  const normalizedAvailability = normalizeAvailabilitySlots(
    initialData.availableDayAndTime,
  );

  const initialValues = {
    typeOfHealthCenter: initialData.typeOfHealthCenter || "clinic",
    fullName: initialData.fullName || "",
    email: initialData.email || "",
    logo: null,
    about: initialData.about || "",
    gallery: [],
    existingGallery: Array.isArray(initialData.gallery)
      ? initialData.gallery
      : [],
    city: initialData.city || "",
    state: initialData.state || "",
    address: initialData.address || "",
    location: initialData.address || "",
    zipCode: initialData.zipCode || "",
    website: initialData.website || "",
    RCCMNIFNumber: initialData.RCCMNIFNumber || initialData.RCCMIFNumber || "",
    addAccount: {
      orangeMoney: normalizedAddAccount.orangeMoney,
    },
    phoneNumber: initialData.phoneNumber || "",
    longitude: initialData.location?.coordinates?.[0] || "",
    latitude: initialData.location?.coordinates?.[1] || "",
    availableDayAndTime: normalizedAvailability,
    countryCode: normalizeCountryCode(initialData.countryCode),
    status: initialData.status || "",
  };
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();

      const appendIfChanged = (fieldName, nextValue, previousValue) => {
        if (String(nextValue ?? "") !== String(previousValue ?? "")) {
          formData.append(fieldName, nextValue ?? "");
        }
      };

      const normalizedAddress =
        values.address ||
        values.location?.address ||
        (typeof values.location === "string" ? values.location : "") ||
        "";
      const normalizedCountryCodeValue = normalizeCountryCode(
        values.countryCode,
      );
      const normalizedStatus =
        values.status ||
        values.typeOfHealthCenter ||
        initialValues.status ||
        "clinic";

      appendIfChanged(
        "typeOfHealthCenter",
        values.typeOfHealthCenter,
        initialValues.typeOfHealthCenter,
      );

      if (showIdentityFields) {
        appendIfChanged("fullName", values.fullName, initialValues.fullName);
        appendIfChanged("email", values.email, initialValues.email);
      }

      appendIfChanged("about", values.about, initialValues.about);
      appendIfChanged("city", values.city, initialValues.city);
      appendIfChanged("state", values.state, initialValues.state);
      appendIfChanged("address", normalizedAddress, initialValues.address);
      appendIfChanged("zipCode", values.zipCode, initialValues.zipCode);
      appendIfChanged("website", values.website, initialValues.website);
      appendIfChanged(
        "RCCMNIFNumber",
        values.RCCMNIFNumber,
        initialValues.RCCMNIFNumber,
      );
      appendIfChanged(
        "RCCMIFNumber",
        values.RCCMNIFNumber,
        initialValues.RCCMNIFNumber,
      );
      appendIfChanged(
        "phoneNumber",
        values.phoneNumber,
        initialValues.phoneNumber,
      );
      appendIfChanged(
        "countryCode",
        normalizedCountryCodeValue,
        initialValues.countryCode,
      );
      appendIfChanged("longitude", values.longitude, initialValues.longitude);
      appendIfChanged("latitude", values.latitude, initialValues.latitude);
      appendIfChanged("status", normalizedStatus, initialValues.status);

      if (
        JSON.stringify(values.addAccount) !==
        JSON.stringify(initialValues.addAccount)
      ) {
        formData.append(
          "addAccount[orangeMoney]",
          values.addAccount.orangeMoney || "",
        );
      }

      if (values.logo) {
        formData.append("logo", values.logo);
      }

      if (
        JSON.stringify(values.existingGallery) !==
        JSON.stringify(initialValues.existingGallery)
      ) {
        values.existingGallery.forEach((url) => {
          formData.append("existingGallery", url);
        });
      }

      values.gallery.forEach((file) => {
        if (file) formData.append("gallery", file);
      });

      const normalizedCurrentAvailability = normalizeAvailabilitySlots(
        values.availableDayAndTime,
      );
      if (
        JSON.stringify(normalizedCurrentAvailability) !==
        JSON.stringify(initialValues.availableDayAndTime)
      ) {
        normalizedCurrentAvailability.forEach((slot, i) => {
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
          formData.append(
            `availableDayAndTime[${i}][available]`,
            slot.available,
          );
        });
      }

      if (Array.from(formData.keys()).length === 0) {
        toastError("No changes to update.");
        return;
      }

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
      validationSchema={validationSchema}
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
          {showIdentityFields && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                name="fullName"
                placeholder="e.g. Health Care Clinique"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.fullName && errors.fullName ? errors.fullName : ""
                }
              />
              <Input
                label="Email *"
                name="email"
                type="email"
                placeholder="e.g. clinic@example.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? errors.email : ""}
              />
            </div>
          )}
          {!hideTypeField && (
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
          )}
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
                {values.logo ? values.logo.name : "Click to upload a new logo"}
              </span>
            </div>
            {/* New file selected — show blob preview */}
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
                    <span className="font-medium">New logo:</span>{" "}
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
            {!values.logo && initialData.logo && (
              <div className="mt-4 flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                  <img
                    src={initialData.logo}
                    alt="Current logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-500">
                  Current logo — upload a new one to replace it
                </p>
              </div>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              About{" "}
              {!showIdentityFields && <span className="text-red-500">*</span>}
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
                  ? `${values.gallery.length} new file(s) selected`
                  : "Click to upload gallery images"}
              </span>
            </div>

            {/* Existing server images */}
            {values.existingGallery.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Current Gallery ({values.existingGallery.length} image
                  {values.existingGallery.length === 1 ? "" : "s"})
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {values.existingGallery.map((url, i) => (
                    <div key={url} className="relative group">
                      <div className="relative w-full aspect-square rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                        <img
                          src={url}
                          alt={`Gallery ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "existingGallery",
                                values.existingGallery.filter(
                                  (_, idx) => idx !== i,
                                ),
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                            title="Remove image"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFieldValue("existingGallery", [])}
                  className="mt-2 text-sm font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                >
                  <FaTrash size={12} /> Remove All Existing
                </button>
              </div>
            )}

            {/* Newly added files */}
            {values.gallery.length > 0 && (
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    New Uploads ({values.gallery.length} image
                    {values.gallery.length === 1 ? "" : "s"})
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {values.gallery.map((file, i) => (
                      <div key={i} className="relative group">
                        <div className="relative w-full aspect-square rounded-lg border border-gray-300 overflow-hidden bg-gray-50">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`New ${i + 1}`}
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
                    <FaTrash size={12} /> Clear New
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
            {isLoaded ? (
              <>
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
                  onPlaceSelect={(data) =>
                    setFieldValue("state", data.name || "")
                  }
                  value={values.state}
                  onChange={(val) => setFieldValue("state", val)}
                />
              </>
            ) : (
              <>
                <Input
                  label="City *"
                  name="city"
                  placeholder="Loading..."
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && errors.city ? errors.city : ""}
                />
                <Input
                  label="State *"
                  name="state"
                  placeholder="Loading..."
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && errors.state ? errors.state : ""}
                />
              </>
            )}
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
            label="RCCM / NIF Number *"
            name="RCCMNIFNumber"
            placeholder="e.g. RC123456"
            value={values.RCCMNIFNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.RCCMNIFNumber && errors.RCCMNIFNumber
                ? errors.RCCMNIFNumber
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
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
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
