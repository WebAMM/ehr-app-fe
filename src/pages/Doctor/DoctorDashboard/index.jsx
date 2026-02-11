// DashboardPage.jsx
import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import StatsCard from "./StatsCard";
import TodayAppointments from "./TodayAppointments";
import GenderChart from "./GenderChart";
import BalanceCard from "./BalanceCard";

import { Calendar, Users, MapPin, Video } from "lucide-react";

const DoctorDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader title="Welcome back, Dr. Stephen!" size="lg" />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard
          icon={<Calendar className="text-purple-500" />}
          bgColor="bg-purple-100"
          value="256k"
          label="Appointments"
          growth="37.8%"
        />
        <StatsCard
          icon={<Users className="text-pink-500" />}
          bgColor="bg-pink-100"
          value="1.2k"
          label="New Patient"
          growth="37.8%"
        />
        <StatsCard
          icon={<MapPin className="text-yellow-500" />}
          bgColor="bg-yellow-100"
          value="128"
          label="Clinic Consultation"
          growth="37.8%"
        />
        <StatsCard
          icon={<Video className="text-blue-500" />}
          bgColor="bg-blue-100"
          value="80"
          label="Video Consultation"
          growth="37.8%"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TodayAppointments />
        </div>

        <GenderChart />
      </div>

      <BalanceCard />
    </div>
  );
};

export default DoctorDashboard;
