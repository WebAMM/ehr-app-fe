import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { MapPin, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ClinicCard = ({ data }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate("/health-center-details", { state: { clinicId: data._id } });
  };

  return (
    <Card padding="none" hover className="flex flex-col">
      <div className="relative mb-4">
        <img
          src={data?.logo || "/placeholder-clinic.jpg"}
          alt={data?.fullName || "Clinic Logo"}
          className="h-60 w-full object-cover rounded-t-lg rounded-b-none"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-text">{data?.fullName}</h3>
        </div>

        <p className="text-sm text-secondary mb-2 capitalize">
          {data?.typeOfHealthCenter}
        </p>

        <div className="flex items-start gap-2 mb-2">
          <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-secondary">Address</span>
            <p className="text-xs text-text opacity-70">{data?.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mb-2">
          <MapPin size={16} className="text-secondary shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-secondary">City</span>
            <p className="text-xs text-text opacity-70">{data?.city}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 mb-3">
          <Phone size={16} className="text-secondary shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="text-xs font-medium text-secondary">Phone</span>
            <p className="text-xs text-text opacity-70">{data?.phoneNumber}</p>
          </div>
        </div>

        {data?.servicesId && data.servicesId.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {data.servicesId.slice(0, 3).map((serviceId) => (
              <span
                key={serviceId}
                className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary"
              >
                Service
              </span>
            ))}
            {data.servicesId.length > 3 && (
              <span className="text-xs px-2 py-1 rounded bg-secondary/10 text-secondary">
                +{data.servicesId.length - 3} more
              </span>
            )}
          </div>
        )}

        <Button variant="secondary" fullWidth onClick={handleViewDetails}>
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default ClinicCard;
