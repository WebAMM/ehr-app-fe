import React from "react";

import Card from "../../../../components/ui/Card";

const Item = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-text">{value}</p>
  </div>
);

const DoctorSettingsProfile = () => {
  const doctor = {
    fullName: "Dr. David Patel",
    phoneNumber: "+221 77 123 4567",
    specialty: "Cardiologist",
    experience: "10+ Year",
    organization: "Golden Gate Cardiology Center",
    consultationFees: "500 CFA",
    aboutMe:
      "Dr. David Patel, a dedicated cardiologist, brings a wealth of experience to Golden Gate Cardiology Center in Golden Gate, CA.",
  };

  return (
    <div className="w-full">
      <Card
        title="Doctor Profile"
        padding="lg"
        shadow="sm"
        className="space-y-6"
        parentClass="rounded-2xl"
      >
        <Item label="Full Name" value={doctor.fullName} />
        <Item label="Phone Number" value={doctor.phoneNumber} />
        <Item label="Specialty" value={doctor.specialty} />
        <Item label="Experience" value={doctor.experience} />
        <Item label="Organization" value={doctor.organization} />
        <Item label="Consultation Fees" value={doctor.consultationFees} />
        <Item label="About Me" value={doctor.aboutMe} />
      </Card>
    </div>
  );
};

export default DoctorSettingsProfile;
