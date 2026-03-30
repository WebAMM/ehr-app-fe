import DoctorDetailsPage from "@/components/common/DoctorBookingAppointments/DoctorDetails";
import React from "react";
import { useLocation } from "react-router-dom";

const ClinicDoctorDetails = () => {
  const location = useLocation();
  return (
    <>
      <DoctorDetailsPage isClinic={true} stateData={location?.state} />
    </>
  );
};

export default ClinicDoctorDetails;
