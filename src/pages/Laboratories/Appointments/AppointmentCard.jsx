import React from "react";
import Button from "@/components/ui/Button";

const getStatusBadgeClasses = (status) => {
  if (status === "Cancelled") return "bg-red-50 text-red-500";
  return "bg-secondary/10 text-secondary";
};

const AppointmentCard = ({ appointment }) => {
  const showReschedule = appointment.status !== "Completed";

  return (
    <div className="bg-gray-50 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-semibold shrink-0">
            {appointment.initials}
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-sm text-text truncate">
              {appointment.name}
            </div>
            <div className="text-xs text-gray-500">
              ID: {appointment.patientId}
            </div>
            <div className="text-xs text-gray-500">{appointment.doctor}</div>
            <div className="text-xs text-gray-400">{appointment.specialty}</div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="text-xs text-gray-700 font-medium">
            {appointment.time}
          </div>
          <div className="text-sm font-semibold text-secondary">
            {appointment.fee}
          </div>
          <span
            className={`inline-flex px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium mt-1 ${getStatusBadgeClasses(
              appointment.status,
            )}`}
          >
            {appointment.status}
          </span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="md"
          className={showReschedule ? "flex-1 rounded-xl" : "w-full rounded-xl"}
        >
          View Details
        </Button>

        {showReschedule && (
          <Button variant="grayOutline" size="md" className="rounded-xl">
            Reschedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
