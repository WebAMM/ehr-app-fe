import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatsCard from "./StatsCard";
import TodayAppointments from "./TodayAppointments";
import GenderChart from "./GenderChart";
import BalanceCard from "./BalanceCard";

import {
  Calendar,
  Users,
  MapPin,
  Video,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import AllStaff from "./AllStaff";
import clsx from "clsx";
import { authCookies } from "@/utils/cookieUtils";
import {
  useDoctorConsultationStatsQuery,
  useGetClinicAppointmentsQuery,
  useGetClinicClaimRequestsQuery,
  useGetClinicDoctorsDetailsQuery,
  useGetClinicPatientCountQuery,
  useTotalDoctorAppointmentsQuery,
  useTotalDoctorPatientsQuery,
} from "@/services";
import Error from "@/components/ui/Error";
import { StatsCardSkeleton } from "./StatsCardSkeleton";

const Dashboard = () => {
  const { getUser } = authCookies;
  const role = getUser()?.status;
  const {
    data: consultationStats,
    isLoading: consultationLoading,
    error: consultationError,
    refetch: refetchConsultation,
  } = useDoctorConsultationStatsQuery(
    { id: getUser()?._id },
    { skip: role !== "doctor" },
  );
  const {
    data: totalAppointments,
    isLoading: appointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useTotalDoctorAppointmentsQuery(
    {
      id: getUser()?._id,
    },
    { skip: role !== "doctor" },
  );

  const {
    data: totalPatients,
    isLoading: patientsLoading,
    error: patientsError,
    refetch: refetchPatients,
  } = useTotalDoctorPatientsQuery(
    {
      id: getUser()?._id,
    },
    { skip: role !== "doctor" },
  );
  const {
    data: clinicDoctorsData,
    isLoading: clinicDoctorsLoading,
    error: clinicDoctorsError,
  } = useGetClinicDoctorsDetailsQuery(
    { id: getUser()?._id },
    { skip: role !== "clinic" },
  );
  const {
    data: clinicAppointmentsData,
    isLoading: clinicAppointmentsLoading,
    error: clinicAppointmentsError,
    refetch: refetchClinicAppointments,
  } = useGetClinicAppointmentsQuery(
    { id: getUser()?._id },
    { skip: role !== "clinic" },
  );

  const {
    data: clinicPatientCountData,
    isLoading: clinicPatientCountLoading,
    error: clinicPatientCountError,
    refetch: refetchClinicPatientCount,
  } = useGetClinicPatientCountQuery(
    { id: getUser()?._id },
    { skip: role !== "clinic" },
  );
  const {
    data: clinicClaimRequestsData,
    isLoading: clinicClaimRequestsLoading,
    error: clinicClaimRequestsError,
    refetch: refetchClinicClaimRequests,
  } = useGetClinicClaimRequestsQuery(
    { id: getUser()?._id },
    { skip: role !== "clinic" },
  );

  const isAnyLoading =
    consultationLoading ||
    appointmentsLoading ||
    patientsLoading ||
    clinicAppointmentsLoading ||
    clinicDoctorsLoading ||
    clinicPatientCountLoading ||
    clinicClaimRequestsLoading;

  const hasError =
    consultationError ||
    appointmentsError ||
    patientsError ||
    clinicAppointmentsError ||
    clinicPatientCountError ||
    clinicClaimRequestsError;
  const errorMessage =
    consultationError?.message ||
    appointmentsError?.message ||
    patientsError?.message ||
    clinicAppointmentsError?.message ||
    clinicPatientCountError?.message ||
    clinicClaimRequestsError?.message ||
    "Failed to load dashboard data";
  const doctorData = [
    {
      id: "appointments",
      icon: Calendar,
      iconClassName: "text-purple-500",
      bgColor: "bg-purple-100",
      value: totalAppointments?.data?.totalAppointments?.totalAppointments || 0,
      label: "Appointments",
      growth: `${totalAppointments?.data?.totalAppointments?.percentage || 0}%`,
    },
    {
      id: "new-patient",
      icon: Users,
      iconClassName: "text-pink-500",
      bgColor: "bg-pink-100",
      value: totalPatients?.data?.totalPatients?.totalPatients || 0,
      label: "New Patient",
      growth: `${totalPatients?.data?.totalPatients?.percentage || 0}%`,
    },
    {
      id: "clinic-consultation",
      icon: MapPin,
      iconClassName: "text-yellow-500",
      bgColor: "bg-yellow-100",
      value: consultationStats?.data?.inClinicConsultations || 0,
      label: "Clinic Consultation",
      growth: `${consultationStats?.data?.inClinicPercentage || 0}%`,
    },
    {
      id: "video-consultation",
      icon: Video,
      iconClassName: "text-blue-500",
      bgColor: "bg-blue-100",
      value: `${consultationStats?.data?.videoConsultations || 0}`,
      label: "Video Consultation",
      growth: `${consultationStats?.data?.videoConsultationPercentage || 0}%`,
    },
  ];
  const labData = [
    {
      id: "appointments",
      icon: Calendar,
      iconClassName: "text-purple-600",
      bgColor: "bg-purple-100",
      value:
        clinicAppointmentsData?.data?.totalAppointments?.totalAppointments || 0,
      label: "Appointments",
      growth: `${clinicAppointmentsData?.data?.totalAppointments?.percentage || 0}%`,
    },
    {
      id: "new-patient",
      icon: Users,
      iconClassName: "text-pink-600",
      bgColor: "bg-pink-100",
      value: clinicPatientCountData?.data?.totalPatients?.totalPatients || 0,
      label: "New Patient",
      growth: `${clinicPatientCountData?.data?.totalPatients?.percentage || 0}%`,
    },
    {
      id: "clinic-member",
      icon: Stethoscope,
      iconClassName: "text-blue-600",
      bgColor: "bg-blue-100",
      value: clinicClaimRequestsData?.data?.uniqueUserCount || 0,
      label: "Clinic Member",
    },
    {
      id: "doctors",
      icon: UserCheck,
      iconClassName: "text-green-600",
      bgColor: "bg-green-100",
      value: clinicDoctorsData?.data?.pagination?.totalRecords || 0,
      label: "Doctors",
    },
  ];

  return (
    <div className="p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader
        title={
          role === "doctor" ? "Welcome back, Dr. Stephen!" : "Hello, Welcome 🎉"
        }
        subtitle={role === "doctor" ? "" : "Keta Mind Clinic"}
        size="lg"
      />
      {hasError && (
        <Error
          message={errorMessage}
          refetch={() => {
            if (consultationError) refetchConsultation();
            if (appointmentsError) refetchAppointments();
            if (patientsError) refetchPatients();

            if (clinicAppointmentsError) refetchClinicAppointments();
            if (clinicPatientCountError) refetchClinicPatientCount();
            if (clinicClaimRequestsError) refetchClinicClaimRequests();
          }}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {isAnyLoading ? (
          <>
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
            <StatsCardSkeleton />
          </>
        ) : role === "doctor" ? (
          doctorData?.map(
            ({
              id,
              icon: IconComponent,
              iconClassName,
              bgColor,
              value,
              label,
              growth,
            }) => (
              <StatsCard
                key={id}
                icon={<IconComponent className={iconClassName} />}
                bgColor={bgColor}
                value={value}
                label={label}
                growth={growth}
              />
            ),
          )
        ) : (
          labData?.map(
            ({
              id,
              icon: IconComponent,
              iconClassName,
              bgColor,
              value,
              label,
              growth,
            }) => (
              <StatsCard
                key={id}
                icon={<IconComponent className={iconClassName} />}
                bgColor={bgColor}
                value={value}
                label={label}
                growth={growth}
              />
            ),
          )
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayAppointments />
        </div>

        <GenderChart />
      </div>
      <div
        className={clsx(
          role !== "doctor"
            ? "flex items-start gap-6 justify-between max-lg:flex-col"
            : "",
        )}
      >
        {role !== "doctor" && <AllStaff />}
        <BalanceCard />
      </div>
    </div>
  );
};

export default Dashboard;
