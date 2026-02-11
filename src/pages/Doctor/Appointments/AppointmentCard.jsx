import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Calendar, Clock, Video, MapPin, MoreVertical } from "lucide-react";

const AppointmentCard = ({ data }) => {
  const { name, patientId, date, time, type, fee, status, image } = data;

  return (
    <Card padding="md" shadow="sm" className="space-y-4">
      <div className="flex gap-5  items-start max-lg:flex-col">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-lg object-cover"
        />

        <div className="space-y-4 w-full">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div>
                <h3 className="font-semibold text-text">{name}</h3>
                <p className="text-sm text-gray-500">Patient ID: {patientId}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs bg-secondary/10 text-primary rounded-full">
                {status}
              </span>
              <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-gray-500 text-xs">Date</p>
                <p className="font-medium">{date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-gray-500 text-xs">Time</p>
                <p className="font-medium">{time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {type === "Video Call" ? (
                <Video className="w-4 h-4 text-green-600" />
              ) : (
                <MapPin className="w-4 h-4 text-green-600" />
              )}
              <div>
                <p className="text-gray-500 text-xs">Type</p>
                <p className="font-medium">{type}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-xs text-gray-500">Consultation Fee</p>
              <p className="text-green-600 font-semibold">{fee} CFA</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button variant="successOutline" size="sm">
                View Details
              </Button>

              {type === "Video Call" && (
                <Button variant="success" size="sm">
                  Join Call
                </Button>
              )}

              <Button variant="dangerOutline" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCard;
