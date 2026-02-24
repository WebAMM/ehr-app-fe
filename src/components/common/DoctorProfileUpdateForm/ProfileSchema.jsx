import * as Yup from "yup";
export const validationSchema = Yup.object({
  fullName: Yup.string().trim().required("Full name is required"),
  phoneNumber: Yup.string().trim().required("Phone number is required"),
  about: Yup.string().trim(),
  type: Yup.string().trim().required("Consultation type is required"),
  consultationFee: Yup.string().trim().required("Consultation fee is required"),
  specialty: Yup.string().trim().required("Specialty is required"),
  experience: Yup.string().trim().required("Experience is required"),
  authorizationNumber: Yup.string().trim(),
  dob: Yup.string().trim().required("DOB is required"),
  bloodGroup: Yup.string().trim().required("Blood group is required"),
  gender: Yup.string().trim().required("Gender is required"),
});
