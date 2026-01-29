import React from "react";
import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

const EmergencyBanner = () => {
  return (
    <div className="border border-red-200 bg-red-50 rounded-lg p-6 flex flex-col   gap-4">
      <div>
        <h4 className="font-semibold text-red-600 flex items-center gap-2">
          <Phone size={18} />
          Emergency Services
        </h4>
        <p className="text-sm text-red-500 mt-1">
          In case of medical emergency, call emergency hotline or visit nearest
          hospital
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="danger">Call Emergency 15</Button>
        <Button variant="dangerOutline">Find Nearest Emergency Room</Button>
      </div>
    </div>
  );
};

export default EmergencyBanner;
