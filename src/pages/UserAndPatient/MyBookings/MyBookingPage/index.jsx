import React, { useState } from "react";
import clsx from "clsx";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import ToggleTabs from "@/components/common/ToggleTabs";
import { FaCalendarAlt, FaClock, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TABS = ["Upcoming", "Completed", "Cancelled"];

const BOOKINGS = {
  Upcoming: [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Jan 15, 2024",
      time: "10:00 AM",
      price: "15,000 FCFA",
      type: "Video Consultation",
      status: "Upcoming",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      doctor: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "Jan 15, 2024",
      time: "10:00 AM",
      price: "15,000 FCFA",
      type: "Video Consultation",
      status: "Upcoming",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
  ],
  Completed: [],
  Cancelled: [],
};
const getStatusClasses = (status) => {
  switch (status) {
    case "Upcoming":
      return "bg-green-100 text-green-700";
    case "Completed":
      return "bg-blue-100 text-blue-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
const MyBookings = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const navigate = useNavigate();

  return (
    <div className="space-y-6 bg-pageBackground min-h-screen p-6">
      <PageHeader
        title="My Bookings"
        subtitle="Find diagnostic centers and book medical tests near you"
      />

      <ToggleTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="space-y-4">
        {BOOKINGS[activeTab]?.map((booking) => (
          <Card key={booking.id} padding="md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={booking.image}
                  alt={booking.doctor}
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-text">{booking.doctor}</h3>
                  <p className="text-sm text-text opacity-70">
                    {booking.specialty}
                  </p>

                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-text opacity-70">
                    <span className="flex items-center gap-2">
                      <FaCalendarAlt size={14} />
                      {booking.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaClock size={14} />
                      {booking.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <FaVideo size={14} />
                      {booking.type}
                    </span>
                  </div>
                </div>
              </div>

              <span
                className={clsx(
                  "text-xs font-medium px-3 py-1 rounded-full",
                  getStatusClasses(booking.status),
                )}
              >
                {booking.status}
              </span>
            </div>
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <p className="font-semibold text-text">{booking.price}</p>

              <div className="flex gap-3">
                <Button
                  variant="successOutline"
                  size="sm"
                  onClick={() => navigate("/doctor-appointment-details")}
                >
                  View Details
                </Button>

                <Button
                  variant="success"
                  size="sm"
                  onClick={() => navigate("/call-screen")}
                >
                  Join Call
                </Button>

                <Button variant="dangerOutline" size="sm">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ))}
        {BOOKINGS[activeTab]?.length === 0 && (
          <Card>
            <p className="text-center text-text opacity-70 py-10">
              No {activeTab.toLowerCase()} bookings found
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
