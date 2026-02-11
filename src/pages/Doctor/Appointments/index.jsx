// AppointmentsPage.jsx
import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import AppointmentTabs from "./AppointmentTabs";
import AppointmentCard from "./AppointmentCard";

const dummyAppointments = [
  {
    id: 1,
    name: "Zaire Kanumba",
    patientId: 1,
    date: "Jan 20, 2026",
    time: "10:00 AM",
    type: "Video Call",
    fee: "15,000",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Amadou Diop",
    patientId: 2,
    date: "Jan 22, 2026",
    time: "2:00 PM",
    type: "In-Person",
    fee: "12,000",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    id: 3,
    name: "Fatou Sall",
    patientId: 3,
    date: "Jan 23, 2026",
    time: "11:00 AM",
    type: "Video Call",
    fee: "18,000",
    status: "Upcoming",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 4,
    name: "Fatou Sall",
    patientId: 3,
    date: "Jan 23, 2026",
    time: "11:00 AM",
    type: "Video Call",
    fee: "18,000",
    status: "Completed",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 5,
    name: "Fatou Sall",
    patientId: 3,
    date: "Jan 23, 2026",
    time: "11:00 AM",
    type: "Video Call",
    fee: "18,000",
    status: "Cancelled",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div className="p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader
        title="Appointments"
        subtitle="Manage your appointment schedule and history"
        size="lg"
      />

      <AppointmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="space-y-6">
        {dummyAppointments
          .filter((item) => item.status === activeTab)
          .map((item) => (
            <AppointmentCard key={item.id} data={item} />
          ))}
      </div>
    </div>
  );
};

export default AppointmentsPage;
