import React from "react";
import Card from "@/components/ui/Card";
import {
  Clock,
  Globe,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  TestTube,
} from "lucide-react";

const ActionButtons = ({ clinicDetails }) => {
  return (
    <div className="space-y-6">
      <Card padding="sm" className="bg-secondary text-text-light rounded-2xl">
        <div className="flex items-center gap-4">
          <img
            src={clinicDetails?.logo}
            alt={clinicDetails?.name || "clinic"}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-text-light">
              {clinicDetails?.fullName}
            </h2>
          </div>
        </div>
      </Card>
      <Card padding="md" className="bg-white/90 rounded-2xl   ">
        <div className="space-y-6 p-4">
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 gap-2 border-b  pb-4">
            <div className="flex items-center gap-2 text-base text-gray-700">
              <MapPin size={18} className="text-primary" />
              <span className="font-medium">
                {clinicDetails?.address || "N/A"}
              </span>
              <span className="text-gray-400">|</span>
              <span>{clinicDetails?.city || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-base text-gray-700">
              <Phone size={18} className="text-primary" />
              <span>{clinicDetails?.phoneNumber || "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 text-base text-gray-700">
              <Mail size={18} className="text-primary" />
              <span>{clinicDetails?.email || "N/A"}</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Stethoscope size={18} className="text-primary" />
              <h3 className="text-lg font-semibold text-gray-800 mb-0">
                About
              </h3>
            </div>
            <p className="text-base text-gray-700 leading-relaxed bg-primary/5 rounded-md px-3 py-2">
              {clinicDetails?.about || (
                <span className="italic text-gray-400">
                  No description available.
                </span>
              )}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} className="text-primary" />
              <span className="text-lg font-semibold text-gray-800">
                Availability
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {clinicDetails?.availableDayAndTime?.filter(
                (slot) => slot?.available,
              ).length === 0 ? (
                <span className="text-gray-400 italic">
                  No availability info
                </span>
              ) : (
                clinicDetails?.availableDayAndTime.map(
                  (slot, index) =>
                    slot?.available && (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-primary/5 border border-primary/20 shadow-sm text-sm hover:bg-primary/20 transition-all min-w-40"
                      >
                        <span className="font-semibold text-primary text-sm">
                          {slot.day}:
                        </span>
                        <span className="text-sm text-text">
                          {slot.openingTime} - {slot.closingTime}
                        </span>
                      </div>
                    ),
                )
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <TestTube size={20} className="text-primary" />
              <span className="text-lg font-semibold text-gray-800">
                Medical Exam Types Provided
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {clinicDetails?.medicalExamTypesProvided?.length === 0 ? (
                <span className="text-gray-400 italic">
                  No exam types listed
                </span>
              ) : (
                clinicDetails?.medicalExamTypesProvided.map(
                  (examType, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20 shadow-sm hover:bg-primary/20 transition-all min-w-[140px]"
                    >
                      <span className="font-semibold text-primary text-sm">
                        {examType}
                      </span>
                    </div>
                  ),
                )
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActionButtons;
