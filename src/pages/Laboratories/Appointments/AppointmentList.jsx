import React from "react";
import Card from "@/components/ui/Card";
import AppointmentCard from "./AppointmentCard";

const AppointmentList = ({ visibleAppointments, headerDateText }) => {
  return (
    <Card
      padding="md"
      shadow="sm"
      className="space-y-4"
      parentClass="w-full  lg:col-span-2"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-text">
          Appointments ({visibleAppointments.length})
        </h3>
        <div className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
          {headerDateText}
        </div>
      </div>

      <div className="space-y-4">
        {visibleAppointments.map((a) => (
          <AppointmentCard key={a.id} appointment={a} />
        ))}
      </div>
    </Card>
  );
};

export default AppointmentList;
