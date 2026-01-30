import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star } from "lucide-react";

const ClinicCard = ({ data }) => {
  return (
    <Card padding="none" hover className="flex flex-col">
      <div className="relative mb-4">
        <img
          src={data.image}
          alt={data.name}
          className="h-60 w-full object-cover rounded-t-lg rounded-b-none"
        />
        <div className="absolute bottom-3 left-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs text-text">
          {data.distance} • {data.time}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2 ">
          <h3 className="font-semibold text-text">{data.name}</h3>
          <div className="flex items-center text-sm text-yellow-500 gap-1">
            <Star size={14} fill="currentColor" />
            {data.rating}
          </div>
        </div>

        <p className="text-sm text-secondary mb-2">{data.type}</p>

        <p className="text-xs text-text opacity-70 mb-2">{data.address}</p>
        <p className="text-xs text-text opacity-70 mb-3">{data.hours}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {data.services.map((service) => (
            <span
              key={service}
              className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary"
            >
              {service}
            </span>
          ))}
        </div>

        <Button variant="secondary" fullWidth>
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ClinicCard;
