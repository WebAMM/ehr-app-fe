import ForgotPassword from "./Authentication/ForgotPassword"; 
import Login from "./Authentication/Login";  
import Register from "./Authentication/Register"; 
import Otp from "./Authentication/Otp"; 
import ResetPassword from "./Authentication/ResetPassword"; 
import UserAndPatientDashboard from "./UserAndPatient/UserAndPatientDashboard";
import FindDoctors from "./UserAndPatient/FindDoctors";
import DoctorDetailsPage from "./UserAndPatient/FindDoctors/DoctorDetails";
import DoctorBookingAppointment from "./UserAndPatient/FindDoctors/DoctorBookingpointment";
import NearbyClinicsAndHospitals from "./UserAndPatient/NearbyClinics&Hospitals/MainPage";
const WEB_PAGES = {
  SIGN_IN: Login,
  REGISTER: Register,
  FORGOT_PASSWORD: ForgotPassword,
  OTP_VERIFICATION: Otp,
  RESET_PASSWORD: ResetPassword,
  USER_AND_PATIENT_DASHBOARD: UserAndPatientDashboard,
  FIND_DOCTORS: FindDoctors,
  DOCTOR_DETAILS: DoctorDetailsPage,
  DOCTOR_BOOKING_APPOINTMENT: DoctorBookingAppointment,
  NEARBY_CLINICS_AND_HOSPITALS: NearbyClinicsAndHospitals,
};
export { WEB_PAGES };
