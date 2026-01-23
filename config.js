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
  RESET_PASSWORD: "/reset-password"
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
