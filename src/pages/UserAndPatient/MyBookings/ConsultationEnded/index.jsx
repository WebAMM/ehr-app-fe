import React from "react";
import StickyHeader from "@/components/ui/StickyHeader";
import Button from "@/components/ui/Button";
import { Video } from "lucide-react";

const ConsultationEnded = () => {
  return (
    <div className="min-h-screen bg-pageBackground">
      {/* Header */}
      <StickyHeader linkTo="/my-bookings" linkText="Doctor Details" />

      {/* Content */}
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
              <Video className="text-white w-6 h-6" />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-medium text-text mb-6">
          The Consultation Session has ended
        </h2>
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-md mb-4">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-semibold text-text">Dr. Sarah Johnson</h3>
        <p className="text-sm text-text opacity-70 mt-1">The Consultation</p>

        <p className="text-xs text-text opacity-50 mt-2">
          The Consultation Session has ended
        </p>

        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <Button variant="grayOutline" size="md">
            Back to Home
          </Button>

          <Button variant="success" size="md">
            Leave a Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationEnded;
