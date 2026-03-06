import * as Yup from "yup";
export const ClinicUpdateSchema = Yup.object({
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
