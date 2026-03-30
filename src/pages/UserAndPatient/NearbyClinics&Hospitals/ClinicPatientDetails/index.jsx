import PatientDetails from "@/components/common/DoctorBookingAppointments/PatientDetails";
import React from "react";
import { useLocation } from "react-router-dom";

const ClinicPatientDetails = () => {
  const location = useLocation();
  console.log("ClinicPatientDetails location:", location);
  return (
    <>
      <PatientDetails isClinic={true} stateData={location} />
    </>
  );
};

export default ClinicPatientDetails;
