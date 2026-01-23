import ForgotPassword from "./auth/ForgotPassword";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Otp from "./auth/Otp";
import ResetPassword from "./auth/ResetPassword";
const WEB_PAGES = {
  SIGN_IN: Login,
  REGISTER: Register,
  FORGOT_PASSWORD: ForgotPassword,
  OTP_VERIFICATION: Otp,
  RESET_PASSWORD: ResetPassword,
};
export { WEB_PAGES };
