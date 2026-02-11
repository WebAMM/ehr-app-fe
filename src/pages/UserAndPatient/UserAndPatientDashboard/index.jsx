import React from "react";
import clsx from "clsx";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  BsCalendar,
  BsCameraVideo,
  BsFileText,
  BsSearch,
  BsActivity,
} from "react-icons/bs";
import QuickAction from "./QuickAction";
import AppointmentCard from "./AppointmentCard";
import { AlertCircle, Info } from "lucide-react";

const UserAndPatientDashboard = () => {
  const quickActions = [
    {
      icon: BsSearch,
      title: "Find Doctors",
      desc: "Search specialists",
      style: {
        cardBg: "bg-blue/5",
        iconColor: "text-blue",
        iconBg: "bg-blue/20",
      },
    },
    {
      icon: BsCalendar,
      title: "My Bookings",
      desc: "View appointments",
      style: {
        cardBg: "bg-secondary/10",
        iconColor: "text-secondary",
        iconBg: "bg-secondary/20",
      },
    },
    {
      icon: BsFileText,
      title: "Medical Records",
      desc: "View history",
      style: {
        cardBg: "bg-blue/10",
        iconColor: "text-blue",
        iconBg: "bg-blue/20",
      },
    },
    {
      icon: BsCameraVideo,
      title: "Telemedicine",
      desc: "Start consultation",
      style: {
        cardBg: "bg-linear-to-r from-secondary to-primary/90",
        iconColor: "text-white",
        iconBg: "bg-blue/20",
        cardText: "text-white",
      },
    },
  ];

  const appointments = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      time: "10:00 AM",
      location: "Online",
      mode: "Video Call",
      gradient: true,
      bg: "bg-linear-to-r from-transparent to-blue/5",
    },
    {
      name: "Dr. Michael Chen",
      specialty: "General Practitioner",
      time: "2:30 PM",
      location: "Dakar Medical Center",
      mode: "In-Person",
      gradient: false,
      bg: "bg-primary/5",
    },
  ];

  const reminders = [
    { text: "Medication Due", sub: "Take Aspirin - 2:00 PM" },
    { text: "Lab Test Reminder", sub: "Blood test scheduled for Dec 26" },
  ];

  const activities = [
    {
      text: "Appointment confirmed with Dr. Sarah Johnson",
      time: "2 hours ago",
    },
    { text: "Lab results uploaded", time: "1 day ago" },
    { text: "Prescription renewed", time: "3 days ago" },
  ];

  return (
    <div className="p-6 space-y-6 bg-bg min-h-screen">
      <PageHeader
        title="Welcome back, Jean!"
        subtitle="Here's your health overview for today"
        align="left"
        size="md"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <QuickAction key={index} {...action} index={index} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card shadow="md" padding="lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-text">Upcoming Appointments</h2>
                <span className="cursor-pointer text-secondary font-medium hover:opacity-80 transition">
                  View All
                </span>
              </div>

              {appointments?.map((appt, index) => (
                <AppointmentCard key={index} {...appt} />
              ))}
              <div className="border border-dashed border-border rounded-xl p-6 text-center flex flex-col items-center justify-center">
                <p className="text-sm text-text opacity-70">
                  No more upcoming appointments
                </p>
                <Button variant="link" className="mt-2 text-secondary">
                  Book an appointment →
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card shadow="md" padding="lg" className="max-w-md">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">
                Health Reminders
              </h3>
              {reminders?.map((reminder, index) => {
                const isWarning = index === 0;
                return (
                  <div
                    key={index}
                    className={clsx(
                      "flex items-start gap-3 rounded-xl border p-4",
                      {
                        "bg-orange-50 border-orange-200": isWarning,
                        "bg-blue-50 border-blue-200": !isWarning,
                      },
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={clsx(
                        "flex h-8 w-8 items-center justify-center rounded-full",
                        {
                          "bg-orange-100 text-orange-600": isWarning,
                          "bg-blue-100 text-blue-600": !isWarning,
                        },
                      )}
                    >
                      {isWarning ? (
                        <AlertCircle size={18} />
                      ) : (
                        <Info size={18} />
                      )}
                    </div>

                    <div className="space-y-0.5">
                      <p
                        className={clsx("text-sm font-medium", {
                          "text-orange-800": isWarning,
                          "text-blue-800": !isWarning,
                        })}
                      >
                        {reminder.text}
                      </p>
                      <p className="text-sm text-gray-600">{reminder.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card shadow="md" padding="lg">
            <div className="space-y-4">
              <h3 className="text-base font-semibold text-gray-900">
                Recent Activity
              </h3>
              {activities?.map((activity, index) => {
                const colors = [
                  "text-green-500",
                  "text-blue-500",
                  "text-purple-500",
                ];
                const icons = ["●", "●", "●"];

                return (
                  <div key={index} className="flex items-start gap-3">
                    <span className={clsx("text-lg", colors[index])}>
                      {icons[index]}
                    </span>

                    <div className="space-y-0.5">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.text}
                      </p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserAndPatientDashboard;
