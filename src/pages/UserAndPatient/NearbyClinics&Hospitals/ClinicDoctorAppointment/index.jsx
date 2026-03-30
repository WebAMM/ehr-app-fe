import DoctorBookingAppointment from "@/components/common/DoctorBookingAppointments/DoctorAppointment";
import React from "react";

const ClinicDoctorAppointment = () => {
  return (
    <>
      <DoctorBookingAppointment isClinic={true} />
    </>
  );
};

export default ClinicDoctorAppointment;
