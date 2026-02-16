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
import { useAuthStorage } from "@/hooks/useAuthStorage";
import AllStaff from "./AllStaff";
import clsx from "clsx";

const doctorData = [
  {
    id: "appointments",
    icon: Calendar,
    iconClassName: "text-purple-500",
    bgColor: "bg-purple-100",
    value: "256k",
    label: "Appointments",
    growth: "37.8%",
  },
  {
    id: "new-patient",
    icon: Users,
    iconClassName: "text-pink-500",
    bgColor: "bg-pink-100",
    value: "1.2k",
    label: "New Patient",
    growth: "37.8%",
  },
  {
    id: "clinic-consultation",
    icon: MapPin,
    iconClassName: "text-yellow-500",
    bgColor: "bg-yellow-100",
    value: "128",
    label: "Clinic Consultation",
    growth: "37.8%",
  },
  {
    id: "video-consultation",
    icon: Video,
    iconClassName: "text-blue-500",
    bgColor: "bg-blue-100",
    value: "80",
    label: "Video Consultation",
    growth: "37.8%",
  },
];
const labData = [
  {
    id: "appointments",
    icon: Calendar,
    iconClassName: "text-purple-600",
    bgColor: "bg-purple-100",
    value: "256k",
    label: "Appointments",
    growth: "37.8%",
  },
  {
    id: "new-patient",
    icon: Users,
    iconClassName: "text-pink-600",
    bgColor: "bg-pink-100",
    value: "1.2k",
    label: "New Patient",
    growth: "37.8%",
  },
  {
    id: "clinic-member",
    icon: Stethoscope,
    iconClassName: "text-blue-600",
    bgColor: "bg-blue-100",
    value: "10",
    label: "Clinic Member",
    growth: "37.8%",
  },
  {
    id: "doctors",
    icon: UserCheck,
    iconClassName: "text-green-600",
    bgColor: "bg-green-100",
    value: "12",
    label: "Doctors",
    growth: "37.8%",
  },
];

const Dashboard = () => {
  const { getRole } = useAuthStorage();
  const role = getRole();

  return (
    <div className="p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader
        title={
          role === "doctor" ? "Welcome back, Dr. Stephen!" : "Hello, Welcome 🎉"
        }
        subtitle={role === "doctor" ? "" : "Keta Mind Clinic"}
        size="lg"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {(role === "doctor" ? doctorData : labData).map(
          ({
            id,
            icon: Icon,
            iconClassName,
            bgColor,
            value,
            label,
            growth,
          }) => (
            <StatsCard
              key={id}
              icon={<Icon className={iconClassName} />}
              bgColor={bgColor}
              value={value}
              label={label}
              growth={growth}
            />
          ),
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
