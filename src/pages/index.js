import ForgotPassword from "./Authentication/ForgotPassword"; 
import Login from "./Authentication/Login";  
import Register from "./Authentication/Register"; 
import Otp from "./Authentication/Otp"; 
import ResetPassword from "./Authentication/ResetPassword"; 
import UserAndPatientDashboard from "./UserAndPatient/UserAndPatientDashboard";
const WEB_PAGES = {
  SIGN_IN: Login,
  REGISTER: Register,
  FORGOT_PASSWORD: ForgotPassword,
  OTP_VERIFICATION: Otp,
  RESET_PASSWORD: ResetPassword,
  USER_AND_PATIENT_DASHBOARD: UserAndPatientDashboard,
};
export { WEB_PAGES };
