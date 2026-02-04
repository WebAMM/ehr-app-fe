import React, { useState } from "react";
import StickyHeader from "@/components/ui/StickyHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star } from "lucide-react";

const DoctorAppointmentDetails = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-pageBackground pb-24">
      <StickyHeader
        linkTo="/my-bookings"
        linkText="Doctor Details"
        showFavorite
        isFavorite={isFavorite}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <Card>
          <div className="flex gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/46.jpg"
              alt="Doctor"
              className="w-14 h-14 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="font-semibold text-text">Dr. David Patel</h3>
              <p className="text-sm text-text opacity-70">Cardiologist</p>
              <p className="text-xs text-text opacity-50 mt-1">
                MBBS, FCP (Internal Medicine)
              </p>

              <div className="flex items-center gap-1 mt-2 text-sm">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-text">5</span>
                <span className="text-text opacity-60">| 1,872 Reviews</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <p className="text-sm text-center text-text opacity-60 mb-1">
            Your Appointment ID
          </p>
          <h3 className="text-center text-2xl font-semibold text-green-600">
            1,099,862,969
          </h3>
        </Card>
        <Card title="About me">
          <p className="text-sm text-text opacity-70 leading-relaxed">
            Dr. David Patel, a dedicated cardiologist, brings a wealth of
            experience to Golden Gate Cardiology Center in Golden Gate, CA.{" "}
            <span className="text-secondary cursor-pointer">view more</span>
          </p>
        </Card>
        <Card title="Scheduled Appointment">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-text opacity-60">Date</span>
            <span className="text-text font-medium text-right">
              August 24, 2024
            </span>

            <span className="text-text opacity-60">Time</span>
            <span className="text-text font-medium text-right">
              10:00 - 10:30 (30 minute)
            </span>
          </div>
        </Card>
        <Card title="Patient Info">
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <span className="text-text opacity-60">Full Name</span>
            <span className="text-right font-medium">Esther Howard</span>

            <span className="text-text opacity-60">Gender</span>
            <span className="text-right font-medium">Male</span>

            <span className="text-text opacity-60">Age</span>
            <span className="text-right font-medium">27</span>

            <span className="text-text opacity-60">Problem</span>
            <span className="text-right font-medium">Lorem Ipsum dolor</span>
          </div>
        </Card>
      </div>

      <div className=" mt-3 bg-pageBackground  border-border p-4">
        <Button variant="secondary" size="lg" fullWidth>
          Video Call (Start at 10:00 PM)
        </Button>
      </div>
    </div>
  );
};

export default DoctorAppointmentDetails;
