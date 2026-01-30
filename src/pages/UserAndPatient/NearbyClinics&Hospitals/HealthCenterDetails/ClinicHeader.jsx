import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MapPin, Clock, Stethoscope } from "lucide-react";

const ClinicHeader = () => {
  return (
    <Card padding="sm" className="bg-secondary text-text-light rounded-2xl">
      <div className="flex items-center gap-4">
        <img
          src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
          alt="clinic"
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h2 className="text-lg font-semibold text-text-light">
            Elite Care Clinic
          </h2>
          <p className="text-sm opacity-90 text-text-light">
            A Place For Humanity
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ClinicHeader;
