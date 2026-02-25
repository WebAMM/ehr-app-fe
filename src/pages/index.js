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
import UserMessagesPage from "./UserAndPatient/MessagesPage";
import SelectLocation from "./UserAndPatient/SelectLocation";
import SubscriptionPlans from "./UserAndPatient/SubscriptionPlans";
import UserSettings from "./UserAndPatient/Settings";
import EditProfilePage from "./UserAndPatient/Settings/EditProfile";
import FavoritesPage from "./UserAndPatient/Settings/FavoritesPage";
import MedicalPrescriptions from "./UserAndPatient/Settings/MedicalPrescriptions";
import PaymentHistory from "./UserAndPatient/Settings/PaymentHistory";
import HelpSupport from "./UserAndPatient/Settings/HelpSupport";
import DoctorDashboard from "./Doctor/DoctorDashboard"; 
import AppointmentsPage from "./Doctor/Appointments";
import DoctorMessages from "./Doctor/DoctorMessages";
import SubscriptionPage from "./Doctor/SubscriptionPage";
import DoctorSettings from "./Doctor/DoctorSettings";
import LaboratoriesDashboard from "./Laboratories/LaboratoriesDashboard";
import Appointments from "./Laboratories/Appointments";
import ClinicMembers from "./Laboratories/ClinicMembers";
import ClinicMessage from "./Laboratories/ClinicMessage";
import ClinicSubscription from "./Laboratories/ClinicSubscription";
import DoctorProfileRegister from "./Doctor/DoctorProfileRegister";
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
  USER_MESSAGES_PAGE: UserMessagesPage,
  SELECT_LOCATION: SelectLocation,
  SUBSCRIPTION_PLANS: SubscriptionPlans,
  USER_SETTINGS: UserSettings,
  EDIT_PROFILE: EditProfilePage,
  FAVORITES_PAGE: FavoritesPage,
  MEDICAL_PRESCRIPTIONS: MedicalPrescriptions,
  PAYMENT_HISTORY: PaymentHistory,
  HELP_SUPPORT: HelpSupport,
  DOCTOR_DASHBOARD: DoctorDashboard,
  APPOINTMENTS_PAGE: AppointmentsPage,
  DOCTOR_MESSAGES: DoctorMessages,
  SUBSCRIPTION_PAGE: SubscriptionPage,
  DOCTOR_SETTING: DoctorSettings,
  LABORATORIES_DASHBOARD: LaboratoriesDashboard,
  LABORATORIES_APPOINTMENTS: Appointments,
  CLINIC_MEMBERS: ClinicMembers,
  CLINIC_MESSAGE: ClinicMessage,
  CLINIC_SUBSCRIPTION: ClinicSubscription,
  DOCTOR_PROFILE_REGISTER: DoctorProfileRegister,
};
export { WEB_PAGES };
