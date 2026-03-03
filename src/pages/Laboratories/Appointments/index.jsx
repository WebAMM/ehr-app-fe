import React, { useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import AppointmentFilters from "./AppointmentFilters";
import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentList from "./AppointmentList";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { LoaderCenter } from "@/components/ui/Loader";
import Error from "@/components/ui/Error";
import { useGetClinicTodayAppointmentsQuery } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { Calendar, Search, X } from "lucide-react";

const Appointments = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [monthDate, setMonthDate] = useState(() => new Date(2026, 0, 1));
  const [selectedDay, setSelectedDay] = useState();
  const [showCalendarModal, setShowCalendarModal] = useState(false);

  const { getUser } = authCookies;
  const role = getUser()?.status;
  const doctorId = getUser()?._id;
  const handlePreviousMonth = () => {
    setMonthDate(
      new Date(monthDate.getFullYear(), monthDate.getMonth() - 1, 1),
    );
  };
  const handleNextMonth = () => {
    setMonthDate(
      new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 1),
    );
  };
  const {
    data: clinicAppointments,
    isLoading: clinicAppointmentsLoading,
    isError: clinicError,
    error: clinicErrorMsg,
    isFetching: clinicAppointmentsFetching,
  } = useGetClinicTodayAppointmentsQuery(
    {
      id: doctorId,
      date: selectedDay,
      limit: 100,
      page: 1,
      status: activeTab,
    },
    { skip: role !== "clinic" },
  );

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

  const handleDateSelect = (day) => {
    setSelectedDay(day);
    setShowCalendarModal(false);
  };

  const visibleAppointments = useMemo(() => {
    if (!clinicAppointments?.data) return [];

    const appointmentsData =
      clinicAppointments.data.appointments || clinicAppointments.data || [];

    let appointments = appointmentsData?.map((appointment) => ({
      id: appointment._id,
      initials: appointment.patientDetails.patientName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      name: appointment.patientDetails.patientName,
      patientId: appointment._id,
      doctor: appointment.slotId?.clinicDoctorId || "N/A",
      specialty: appointment.patientDetails.problem,
      time: appointment.slotId?.time || "N/A",
      fee: appointment.payment?.amount
        ? `${appointment.payment.amount} CFA`
        : "N/A",
      status:
        appointment.status.charAt(0).toUpperCase() +
        appointment.status.slice(1),
      patientDetails: appointment.patientDetails,
      cancellationReason: appointment.cancellationReason,
    }));

    return appointments;
  }, [clinicAppointments]);

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader
        title="Appointments"
        subtitle="Manage all clinic appointments"
        size="lg"
      />
      <div className="flex justify-between md:gap-3 max-md:flex-wrap">
        <AppointmentFilters
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setSelectedDay={setSelectedDay}
        />

        <div className="flex justify-end gap-3 w-48 ">
          <Button
            variant="secondary"
            size="md"
            icon={Calendar}
            onClick={() => setShowCalendarModal(true)}
            className="rounded-lg"
          >
            Filter by Date
          </Button>
        </div>
      </div>

      {clinicAppointmentsLoading || clinicAppointmentsFetching ? (
        <div className="flex justify-center items-center py-20">
          <LoaderCenter />
        </div>
      ) : clinicError ? (
        <Error
          message={clinicErrorMsg?.message || "Failed to load appointments"}
        />
      ) : (
        <AppointmentList
          visibleAppointments={visibleAppointments}
          headerDateText={headerDateText}
        />
      )}
      <Modal
        isOpen={showCalendarModal}
        onClose={() => setShowCalendarModal(false)}
        title="Select Date"
        size="md"
      >
        <div className="relative p-4">
          <div className="mt-4">
            <AppointmentCalendar
              monthDate={monthDate}
              selectedDay={selectedDay}
              setSelectedDay={handleDateSelect}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Appointments;
