import React from "react";
import { Star } from "lucide-react";

import Card from "../../../../components/ui/Card";
import CustomAvatar from "../../../../components/ui/Avatar";

const Stars = ({ value = 5 }) => {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 ${
            idx < full ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={idx < full ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

const DoctorSettingsReviews = () => {
  const reviews = [
    {
      id: "r1",
      name: "Emily Anderson",
      rating: 5.0,
      date: "September 18, 2024",
      text: "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
    },
  ];

  return (
    <div className="w-full">
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <h2 className="text-xl font-semibold text-text">Patients Reviews</h2>

        <div className="mt-6 space-y-4">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-gray-50 p-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-start gap-4 min-w-0">
                  <CustomAvatar
                    name={r.name}
                    size="52"
                    round={true}
                    bgColor="#0EBE7F"
                  />

                  <div className="min-w-0">
                    <p className="font-semibold text-text">{r.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Stars value={r.rating} />
                      <span className="text-sm text-gray-700 font-medium">
                        {r.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-gray-500 text-sm whitespace-nowrap">
                  {r.date}
                </span>
              </div>

              <p className="text-gray-700 mt-4 leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DoctorSettingsReviews;
