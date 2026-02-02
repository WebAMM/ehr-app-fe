import React from "react";
import Card from "@/components/ui/Card";
import {
  Clock,
  Globe,
  MapPin,
  MessageCircle,
  Phone,
  Stethoscope,
} from "lucide-react";
import Button from "@/components/ui/Button";

const ActionButtons = () => {
  const actions = [
    { icon: Globe, label: "Website" },
    { icon: MessageCircle, label: "Message" },
    { icon: Phone, label: "Call" },
  ];

  return (
    <Card padding="md">
      <div className="mt-3 space-y-2 text-base opacity-90">
        <p className="flex items-center gap-2">Dengue, Skin Care, Eye Care</p>
        <p className="flex items-center gap-2">
          <MapPin size={14} /> Cardiology Center, USA
        </p>
        <p className="flex items-center gap-2">
          <Clock size={14} /> Mon–Fri, 08:00 AM – 08:00 PM
        </p>
      </div>

      <div className="mt-3 text-sm flex flex-col gap-1">
        <span>Clinic Package</span> <strong>10,000 CFA / Month</strong>
      </div>

      <Button fullWidth className="mt-4" variant="secondary" size="md">
        Subscribe All Services
      </Button>
      <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-3 mt-5">
        {actions.map(
          (
            { icon: IconComponent, label }, // eslint-disable-line no-unused-vars
          ) => (
            <button
              key={label}
              className="flex flex-col items-center gap-2 py-3 rounded-lg bg-primary/5 hover:bg-primary/20 transition cursor-pointer"
            >
              <IconComponent className="text-secondary" />
              <span className="text-sm">{label}</span>
            </button>
          ),
        )}
      </div>
    </Card>
  );
};

export default ActionButtons;
