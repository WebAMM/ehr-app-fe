import React, { useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentList from "./AppointmentList";

const APPOINTMENTS = [
  {
    id: "1",
    initials: "ZK",
    name: "Zaire Kanumba",
    patientId: "156513146",
    doctor: "Dr. David Patel",
    specialty: "Cardiologist",
    time: "10:00 AM",
    fee: "1,500 CFA",
    status: "Confirmed",
  },
  {
    id: "2",
    initials: "AD",
    name: "Amadou Diop",
    patientId: "156513147",
    doctor: "Dr. Sarah Johnson",
    specialty: "Pediatrician",
    time: "11:30 AM",
    fee: "2,000 CFA",
    status: "Confirmed",
  },
  {
    id: "3",
    initials: "FS",
    name: "Fatou Sall",
    patientId: "156513148",
    doctor: "Dr. David Patel",
    specialty: "Cardiologist",
    time: "02:00 PM",
    fee: "1,500 CFA",
    status: "Cancelled",
  },
  {
    id: "4",
    initials: "IK",
    name: "Ibrahim Kane",
    patientId: "156513149",
    doctor: "Dr. Emily Chen",
    specialty: "Dermatologist",
    time: "03:30 PM",
    fee: "1,800 CFA",
    status: "Confirmed",
  },
];

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [monthDate] = useState(() => new Date(2026, 0, 1));
  const [selectedDay, setSelectedDay] = useState(16);

  const headerDateText = useMemo(() => {
    const date = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      selectedDay,
    );
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [monthDate, selectedDay]);

  const visibleAppointments = useMemo(() => {
    if (activeTab === "All") return APPOINTMENTS;
    return APPOINTMENTS.filter((a) => a.status === activeTab);
  }, [activeTab]);

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader
        title="Appointments"
        subtitle="Manage all clinic appointments"
        size="lg"
      />

      <AppointmentFilters activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AppointmentCalendar
          monthDate={monthDate}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
        />

        <AppointmentList
          visibleAppointments={visibleAppointments}
          headerDateText={headerDateText}
        />
      </div>
    </div>
  );
};

export default Appointments;
