import { FiGrid, FiSearch, FiHome, FiActivity, FiCalendar, FiMapPin, FiFileText, FiMessageCircle, FiZap, FiSettings, FiLogOut } from "react-icons/fi";

export const roleToFlow = {
  patient: "patient",
  user: "patient",
  doctor: "doctor",
  physician: "doctor",
  clinician: "doctor",
  clinic: "clinic",
  laboratories: "clinic",
  laboratory: "clinic",
  lab: "clinic",
};

export const sidebarMenus = {
  patient: [
    { label: "Dashboard", icon: FiGrid, to: "/user-and-patient-dashboard" },
    { label: "Find Doctors", icon: FiSearch, to: "/find-doctors" },
    { label: "Clinics", icon: FiHome, to: "/nearby-clinics-and-hospitals" },
    { label: "Laboratories", icon: FiActivity, to: "/laboratories-and-diagnostics" },
    { label: "My Bookings", icon: FiCalendar, to: "/my-bookings" },
    { label: "Select Location", icon: FiMapPin, to: "/location" },
    { label: "Medical Records", icon: FiFileText, to: "/medical-records"},
    { label: "Messages", icon: FiMessageCircle, to: "/user-messages" },
    { label: "Subscription", icon: FiZap, to: "/subscription-plans" },
    { label: "Settings", icon: FiSettings, to: "/settings" },
    { label: "Logout", icon: FiLogOut, to: "" },
  ],
  doctor: [
    { label: "Dashboard", icon: FiGrid, to: "/doctor/dashboard" },
    { label: "Appointments", icon: FiCalendar, to: "/doctor/appointments" },
    { label: "Messages", icon: FiMessageCircle, to: "/doctor/messages" },
    { label: "Subscription", icon: FiZap, to: "/doctor/subscription" },
    { label: "Settings", icon: FiSettings, to: "/doctor/settings" },
    { label: "Logout", icon: FiLogOut, to: "" },
  ],
  clinic: [
    { label: "Dashboard", icon: FiGrid, to: "/clinic/dashboard" },
    { label: "Appointments", icon: FiCalendar, to: "/clinic/appointments" },
    { label: "Messages", icon: FiMessageCircle, to: "/clinic/messages" },
    { label: "Subscription", icon: FiZap, to: "/clinic/subscription" },
    { label: "Settings", icon: FiSettings, to: "/clinic/settings" },
    { label: "Logout", icon: FiLogOut, to: "" },
  ],
};
