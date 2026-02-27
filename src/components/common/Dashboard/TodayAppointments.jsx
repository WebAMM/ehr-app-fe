import React, { useState } from "react";
import Card from "@/components/ui/Card";
import CustomAvatar from "@/components/ui/Avatar";
import { authCookies } from "@/utils/cookieUtils";
import { useGetTodaysAppointmentsQuery } from "@/services";

import { MdError } from "react-icons/md";
import { LoaderCenter } from "@/components/ui/Loader";

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-600",
  confirmed: "bg-green-100 text-green-600",
  cancelled: "bg-red-100 text-red-600",
  completed: "bg-blue-100 text-blue-600",
  ongoing: "bg-purple-100 text-purple-600",
};

const TodayAppointments = () => {
  const { getUser } = authCookies;
  const [limit, setLimit] = useState(10);
  const doctorId = getUser()?._id;
  const today = new Date().toISOString().split("T")[0];
  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    isError,
    error,
  } = useGetTodaysAppointmentsQuery({
    doctorId: doctorId,
    page: 1,
    date: today,
    limit,
  });

  const appointments = appointmentsData?.data || [];

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <Card
      title="Today Appointments"
      subtitle=""
      padding="md"
      shadow="sm"
      className="space-y-4"
    >
      {appointmentsLoading ? (
        <div className="flex justify-center items-center py-8">
          <LoaderCenter />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-8 text-red-600">
          <MdError className="text-2xl mb-2" />
          <p className="text-sm">
            {error?.message || "Failed to load appointments"}
          </p>
        </div>
      ) : appointments?.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-text opacity-60">
          <p className="text-sm">No appointments today</p>
        </div>
      ) : (
        appointments?.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-secondary/10 rounded-lg p-5"
          >
            <div className="flex items-center gap-3">
              <CustomAvatar
                name={item.patientDetails?.patientName || "N/A"}
                size="40"
                bgColor="#10B981"
              />
              <div>
                <p className="text-sm font-medium text-text">
                  {item.patientDetails?.patientName || "N/A"}
                </p>
                <p className="text-xs text-text opacity-60">
                  {item.doctorType || "N/A"}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-text opacity-70">
                {item?.slotId?.time || "N/A"}
              </p>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  statusStyles[item.status?.toLowerCase()] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {formatStatus(item?.status || "pending")}
              </span>
            </div>
          </div>
        ))
      )}
    </Card>
  );
};

export default TodayAppointments;
