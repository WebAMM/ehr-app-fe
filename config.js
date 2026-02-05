const ERROR = {
  SYSTEM_ERROR: "System error. Please try again later!",
};
const PATH = {
  NOPAGE: "*",
  SIGN_IN: "/sign-in",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFICATION: "/otp",
  DASHBOARD: "/dashboard",
  RESET_PASSWORD: "/reset-password",
  USER_AND_PATIENT_DASHBOARD: "/user-and-patient-dashboard",
  FIND_DOCTORS: "/find-doctors",
  DOCTOR_DETAILS: "/doctor-details",
  DOCTOR_BOOKING_APPOINTMENT: "/doctor-booking-appointment",
  NEARBY_CLINICS_AND_HOSPITALS: "/nearby-clinics-and-hospitals",
  HEALTH_CENTER_DETAILS: "/health-center-details",
  LABORATORIES_AND_DIAGNOSTICS: "/laboratories-and-diagnostics",
  CLINIC_CENTER_DETAILS: "/clinic-center-details",
  MY_BOOKINGS: "/my-bookings",
  CALL_SCREEN: "/call-screen",
  CONSULTATION_ENDED: "/consultation-ended",
  DOCTOR_APPOINTMENT_DETAILS: "/doctor-appointment-details",
  MEDICAL_RECORDS: "/medical-records",
  USER_MESSAGES_PAGE: "/user-messages",
  SELECT_LOCATION: "/location",
  SUBSCRIPTION_PLANS: "/subscription-plans",
};

const TOASTER_STYLING_VALUES = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const PAGINATION_PAGE_SIZE = 10;

export { ERROR, PATH, TOASTER_STYLING_VALUES, PAGINATION_PAGE_SIZE };
