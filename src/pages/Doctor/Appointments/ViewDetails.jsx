import Button from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  Video,
  MapPin,
  MoreVertical,
  X,
  Download,
} from "lucide-react";
import React from "react";
import { handleDownload } from "./handleDownload";

const ViewDetails = ({ setShowDetailsModal, data, setShowCancelModal }) => {
  return (
    <div className="relative w-full">
      <button
        onClick={() => setShowDetailsModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="mb-6 pr-8">
        <h2 className="text-2xl font-bold text-text mb-2">
          Appointment Details
        </h2>
        <p className="text-gray-500">
          Complete information for this appointment
        </p>
      </div>
      <div className="space-y-6 max-h-[70vh] overflow-y-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-text mb-4">
            Patient Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Patient Name
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.patientName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Phone
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.patientMobileNo}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Gender
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.gender}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Age
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.age}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Problem
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.problem}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Insurance No
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.insuranceNo}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Insurance Provider
              </p>
              <p className="font-medium text-text">
                {data?.patientDetails?.insuranceName}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-text mb-4">
            Appointment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Date
              </p>
              <p className="font-medium text-text flex items-center gap-2">
                <Calendar className="w-4 h-4 text-green-600" />
                {data?.slotId?.date?.split("T")[0]}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Time
              </p>
              <p className="font-medium text-text flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                {data?.slotId?.time}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Duration
              </p>
              <p className="font-medium text-text">{data?.slotId?.duration}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Type
              </p>
              <p className="font-medium text-text flex items-center gap-2">
                {data?.doctorType === "In-Clinic Consultation" ? (
                  <>
                    <MapPin className="w-4 h-4 text-green-600" />
                    In-Clinic
                  </>
                ) : (
                  <>
                    <Video className="w-4 h-4 text-green-600" />
                    Video Call
                  </>
                )}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Appointment Status
              </p>
              <span className="px-3 py-1 text-xs bg-secondary/10 text-primary rounded-full font-medium">
                {data?.status}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-text mb-4">
            Payment Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Amount
              </p>
              <p className="font-medium text-lg text-green-600">
                {data?.payment?.amount || 0} CFA
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Payment Status
              </p>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium ${
                  data?.payment?.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {data?.payment?.status || "N/A"}
              </span>
            </div>
            {data?.payment?.method && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Payment Method
                </p>
                <p className="font-medium text-text">{data?.payment?.method}</p>
              </div>
            )}
            {data?.payment?.transactionId && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Transaction ID
                </p>
                <p className="font-medium text-text text-sm">
                  {data?.payment?.transactionId}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-text mb-4">
            Additional Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Appointment ID
              </p>
              <p className="font-medium text-text text-sm">{data?._id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Patient ID
              </p>
              <p className="font-medium text-text text-sm">{data?.userId}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Created At
              </p>
              <p className="font-medium text-text text-sm">
                {new Date(data?.createdAt).toLocaleDateString()}
              </p>
            </div>
            {data?.cancellationReason && (
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Cancellation Reason
                </p>
                <p className="font-medium text-text">
                  {data?.cancellationReason}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 flex gap-3 justify-end">
        {(data?.status === "pending" || data?.status === "confirmed") && (
          <Button
            variant="dangerOutline"
            size="sm"
            onClick={() => setShowCancelModal(true)}
          >
            Cancel
          </Button>
        )}
        <Button
          variant="success"
          size="sm"
          onClick={() => handleDownload(data)}
          className="flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Details
        </Button>
      </div>
    </div>
  );
};

export default ViewDetails;
