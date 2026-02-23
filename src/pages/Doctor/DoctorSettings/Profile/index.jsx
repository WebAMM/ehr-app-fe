import React from "react";

import Card from "@/components/ui/Card";
import { authCookies } from "@/utils/cookieUtils";

const Item = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-text">{value}</p>
  </div>
);

const DoctorSettingsProfile = () => {
  const { getUser } = authCookies;
  console.log("User data from cookies:", getUser());
  const user = getUser();
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
        <Item label="Full Name" value={user?.fullName || "N/A"} />
        <Item label="Phone Number" value={user?.phoneNumber || "N/A"} />
        <Item label="Email Address" value={user?.email || "N/A"} />
        <Item label="Specialty" value={user?.specialty || "N/A"} />
        <Item label="Experience" value={user?.experience || "N/A"} />
        <Item
          label="Consultation Fees"
          value={user?.consultationFee || "N/A"}
        />
        <Item label="About Me" value={user?.about || "N/A"} />
      </Card>
    </div>
  );
};

export default DoctorSettingsProfile;
