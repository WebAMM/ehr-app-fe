import React from "react";
import Button from "@/components/ui/Button";

const AppointmentCard = ({
  name,
  specialty,
  time,
  location,
  mode,
  gradient,
  bg = "",
}) => {
  const isVideo = mode === "Video Call";

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border border-border bg-bg ${bg}`}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-border overflow-hidden" />

        <div>
          <p className="font-medium text-text">{name}</p>
          <p className="text-sm text-text opacity-70">{specialty}</p>

          <div className="flex items-center gap-3 text-xs text-text opacity-70 mt-1">
            <span>{time}</span>
            <span>•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium
            ${
              isVideo
                ? "bg-secondary/20 text-secondary"
                : "bg-blue/20 text-blue"
            }`}
        >
          {mode}
        </span>

        <Button size="sm" variant={gradient ? "gradient" : "successOutline"}>
          {gradient ? "Join Now" : "View Details"}
        </Button>
      </div>
    </div>
  );
};

export default AppointmentCard;
