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
import HealthCenterDetails from "./UserAndPatient/NearbyClinics&Hospitals/HealthCenterDetails";
import LaboratoriesAndDiagnostics from "./UserAndPatient/LaboratoriesAndDiagnostics/MainPage";
import ClinicCenterDetails from "./UserAndPatient/LaboratoriesAndDiagnostics/ClinicCenterDetails"; 
import MyBookings from "./UserAndPatient/MyBookings/MyBookingPage";
import CallScreenPage from "./UserAndPatient/MyBookings/CallScreen"; 
import ConsultationEnded from "./UserAndPatient/MyBookings/ConsultationEnded";
import DoctorAppointmentDetails from "./UserAndPatient/MyBookings/DoctorAppointmentDetails";
import MedicalRecords from "./UserAndPatient/MedicalRecords";
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
  HEALTH_CENTER_DETAILS: HealthCenterDetails,
  LABORATORIES_AND_DIAGNOSTICS: LaboratoriesAndDiagnostics,
  CLINIC_CENTER_DETAILS: ClinicCenterDetails,
  MY_BOOKINGS: MyBookings,
  CALL_SCREEN: CallScreenPage,
  CONSULTATION_ENDED: ConsultationEnded,
  DOCTOR_APPOINTMENT_DETAILS: DoctorAppointmentDetails,
  MEDICAL_RECORDS: MedicalRecords,
};
export { WEB_PAGES };
