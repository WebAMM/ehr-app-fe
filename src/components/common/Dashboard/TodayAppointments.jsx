// TodayAppointments.jsx
import React from "react";
import Card from "@/components/ui/Card";
import CustomAvatar from "@/components/ui/Avatar";

const appointments = [
  {
    id: 1,
    name: "Zaire Kanumba",
    type: "Clinic Consulting",
    time: "10:00 PM",
    status: "Ongoing",
  },
  {
    id: 2,
    name: "Zaire Kanumba",
    type: "Video Consulting",
    time: "10:00 PM",
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Zaire Kanumba",
    type: "Clinic Consulting",
    time: "10:00 PM",
    status: "Declined",
  },
];

const statusStyles = {
  Ongoing: "bg-blue-100 text-blue-600",
  Confirmed: "bg-green-100 text-green-600",
  Declined: "bg-red-100 text-red-600",
};

const TodayAppointments = () => {
  return (
    <Card
      title="Today Appointments"
      subtitle=""
      padding="md"
      shadow="sm"
      className="space-y-4"
    >
      {appointments.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-secondary/10 rounded-lg p-5"
        >
          <div className="flex items-center gap-3">
            <CustomAvatar name={item.name} size="40" bgColor="#10B981" />
            <div>
              <p className="text-sm font-medium text-text">{item.name}</p>
              <p className="text-xs text-text opacity-60">{item.type}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-text opacity-70">{item.time}</p>
            <span
              className={`text-xs px-2 py-1 rounded-full ${statusStyles[item.status]}`}
            >
              {item.status}
            </span>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default TodayAppointments;
