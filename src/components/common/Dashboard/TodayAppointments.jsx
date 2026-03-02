import React from "react";
import Card from "@/components/ui/Card";
import CustomAvatar from "@/components/ui/Avatar";
import { authCookies } from "@/utils/cookieUtils";
import {
  useGetClinicTodayAppointmentsQuery,
  useGetTodaysAppointmentsQuery,
} from "@/services";
import Error from "@/components/ui/Error";
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
  const role = getUser()?.status;
  const limit = 10;
  const doctorId = getUser()?._id;
  const today = new Date().toISOString().split("T")[0];
  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    isError: doctorError,
    error: doctorErrorMsg,
    refetch: refetchDoctorAppointments,
  } = useGetTodaysAppointmentsQuery(
    {
      doctorId: doctorId,
      page: 1,
      date: today,
      limit,
    },
    { skip: role !== "doctor" },
  );

  const {
    data: clinicAppointments,
    isLoading: clinicAppointmentsLoading,
    isError: clinicError,
    error: clinicErrorMsg,
    refetch: refetchClinicAppointments,
  } = useGetClinicTodayAppointmentsQuery(
    {
      id: doctorId,
      date: today,
    },
    { skip: role !== "clinic" },
  );

  const isLoading = appointmentsLoading || clinicAppointmentsLoading;
  const hasError = doctorError || clinicError;
  const errorMsg =
    doctorErrorMsg?.message ||
    clinicErrorMsg?.message ||
    "Failed to load appointments";

  const isDoctor = role === "doctor";
  const appointments = isDoctor
    ? appointmentsData?.data || []
    : clinicAppointments?.data || [];

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
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <LoaderCenter />
        </div>
      ) : hasError ? (
        <Error
          message={errorMsg}
          refetch={() => {
            if (doctorError) refetchDoctorAppointments();
            if (clinicError) refetchClinicAppointments();
          }}
        />
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
