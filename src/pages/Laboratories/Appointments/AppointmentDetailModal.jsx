import React from "react";
import { Phone, AlertCircle, Calendar, Clock, FileText } from "lucide-react";
import CustomAvatar from "@/components/ui/Avatar";

const getStatusBadgeClasses = (status) => {
  const lowerStatus = status?.toLowerCase();
  if (lowerStatus === "cancelled")
    return "bg-red-50 text-red-700 border border-red-200";
  if (lowerStatus === "confirmed")
    return "bg-blue-50 text-blue-700 border border-blue-200";
  if (lowerStatus === "completed")
    return "bg-green-50 text-green-700 border border-green-200";
  return "bg-yellow-50 text-yellow-700 border border-yellow-200";
};

const getPaymentStatusClasses = (status) => {
  if (status === "pending") return "bg-yellow-50 text-yellow-700";
  if (status === "completed") return "bg-green-50 text-green-700";
  return "bg-gray-100 text-gray-700";
};

const AppointmentDetailModal = ({ appointment, imageError, setImageError }) => {
  const statusLower = appointment.status?.toLowerCase();

  return (
    <div className="space-y-6 relative">
      {/* Patient Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text">Patient Information</h3>
        <div className="bg-gray-50 rounded-lg p-4 flex items-start gap-4">
          {appointment?.patientDetails?.attachDoc && !imageError ? (
            <img
              src={appointment.patientDetails.attachDoc}
              alt={appointment?.patientDetails?.patientName}
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 shrink-0"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-20 h-20 shrink-0">
              <CustomAvatar name={appointment?.patientDetails?.patientName} />
            </div>
          )}
          <div className="flex-1 space-y-2">
            <h4 className="font-semibold text-text">
              {appointment?.patientDetails?.patientName || "—"}
            </h4>
            <p className="text-sm text-gray-600">
              Patient ID: {appointment?.patientId}
            </p>
            <p className="text-sm text-gray-600">
              Insurance: {appointment?.patientDetails?.insuranceName || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Details Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text">Personal Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Gender</p>
            <p className="font-medium text-text">
              {appointment?.patientDetails?.gender || "—"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Age</p>
            <p className="font-medium text-text">
              {appointment?.patientDetails?.age || "—"} years
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Phone className="w-3 h-3" /> Phone
            </p>
            <p className="font-medium text-text">
              {appointment?.patientDetails?.patientMobileNo || "—"}
            </p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Insurance No</p>
            <p className="font-medium text-text">
              {appointment?.patientDetails?.insuranceNo || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Appointment Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text">Appointment Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
              <Calendar className="w-3 h-3" /> Date
            </p>
            <p className="font-medium text-text">{appointment?.time || "—"}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3 border border-green-200">
            <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3" /> Duration
            </p>
            <p className="font-medium text-text">30 Minutes</p>
          </div>
          <div className="col-span-2 bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p className="text-xs text-gray-600 flex items-center gap-1 mb-1">
              <FileText className="w-3 h-3" /> Problem/Reason
            </p>
            <p className="font-medium text-text">
              {appointment?.patientDetails?.problem || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text">Payment Information</h3>
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Amount</p>
            <p className="font-semibold text-text">{appointment?.fee || "—"}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">Payment Status</p>
            <span
              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusClasses("pending")}`}
            >
              Pending
            </span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text">Status</h3>
        <div
          className={`rounded-lg p-4 ${getStatusBadgeClasses(appointment?.status)}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm">Appointment Status</p>
            <span className="font-semibold">{appointment?.status}</span>
          </div>
        </div>
      </div>

      {statusLower === "cancelled" && appointment?.cancellationReason && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text">
            <AlertCircle className="w-5 h-5 inline-block mr-2 text-red-600" />
            Cancellation Reason
          </h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{appointment?.cancellationReason}</p>
          </div>
        </div>
      )}
      {appointment?.patientDetails?.attachDoc && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Attached Document
          </h3>
          <a
            href={appointment?.patientDetails?.attachDoc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-4 hover:bg-blue-100 transition-colors"
          >
            <p className="text-sm text-blue-700 font-medium">View Attachment</p>
          </a>
        </div>
      )}
    </div>
  );
};

export default AppointmentDetailModal;
