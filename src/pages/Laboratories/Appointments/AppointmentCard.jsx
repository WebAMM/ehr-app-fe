import React from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import AppointmentDetailModal from "./AppointmentDetailModal";
import DeclineAppointmentModal from "./DeclineAppointmentModal";
import { CheckCircle, X, Eye, Phone, AlertCircle } from "lucide-react";
import CustomAvatar from "@/components/ui/Avatar";
import { useUpdateStatusAndSendNotificationMutation } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { toastError, toastSuccess } from "@/components/ui/Toast";

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

const AppointmentCard = ({ appointment }) => {
  const statusLower = appointment.status?.toLowerCase();
  const [imageError, setImageError] = React.useState(false);
  const [showDetailModal, setShowDetailModal] = React.useState(false);
  const [showDeclineModal, setShowDeclineModal] = React.useState(false);
  const { getUser } = authCookies;

  const Id = getUser()?._id;
  const [updateStatusAndSendNotification, { isLoading: isUpdating }] =
    useUpdateStatusAndSendNotificationMutation();

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await updateStatusAndSendNotification({
        id: id,
        body: { status: newStatus },
      }).unwrap();
      if (response) {
        toastSuccess(
          response.message || `Appointment status updated to ${newStatus}`,
        );
      }
    } catch (error) {
      toastError(error?.data?.message || "Failed to update appointment status");
    }
  };

  const handleDeclineSubmit = async (reason) => {
    try {
      const response = await updateStatusAndSendNotification({
        id: appointment.id,
        body: {
          status: "cancelled",
          cancellationReason: reason,
        },
      }).unwrap();
      if (response) {
        toastSuccess(response.message || "Appointment declined successfully");
        setShowDeclineModal(false);
      }
    } catch (error) {
      toastError(error?.data?.message || "Failed to decline appointment");
    }
  };

  const renderActionButtons = () => {
    const showCancel =
      statusLower !== "cancelled" && statusLower !== "completed";

    let primaryButton = null;

    switch (statusLower) {
      case "pending":
        primaryButton = (
          <Button
            variant="secondary"
            size="md"
            className="rounded-xl"
            icon={CheckCircle}
            onClick={() => handleStatusUpdate(appointment.id, "confirmed")}
            disabled={isUpdating}
          >
            {isUpdating ? "Confirming..." : "Confirm"}
          </Button>
        );
        break;

      case "confirmed":
        primaryButton = (
          <Button
            variant="secondary"
            size="md"
            className="rounded-xl"
            icon={CheckCircle}
            onClick={() => handleStatusUpdate(appointment.id, "completed")}
            disabled={isUpdating}
          >
            {isUpdating ? "Completing..." : "Complete"}
          </Button>
        );
        break;

      default:
        primaryButton = null;
    }

    return (
      <div className="flex flex-wrap gap-2 pt-2">
        {primaryButton && primaryButton}
        <Button
          variant="grayOutline"
          size="md"
          className="rounded-xl"
          icon={Eye}
          onClick={() => setShowDetailModal(true)}
        >
          View Details
        </Button>
        {showCancel && (
          <Button
            variant="grayOutline"
            size="md"
            className="rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-red-200"
            icon={X}
            title="Cancel appointment"
            onClick={() => setShowDeclineModal(true)}
            disabled={isUpdating}
          >
            {isUpdating ? "Cancelling..." : "Cancel"}
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4 pb-3 border-b border-gray-100">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {appointment?.patientDetails?.attachDoc && !imageError ? (
            <img
              src={appointment.patientDetails.attachDoc}
              alt={appointment?.patientDetails?.patientName}
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
              onError={() => setImageError(true)}
            />
          ) : (
            <CustomAvatar name={appointment?.patientDetails?.patientName} />
          )}

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-sm text-text">
              {appointment.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Patient ID: {appointment.patientId}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex px-3 py-1 rounded-full text-[10px] font-semibold shrink-0 ${getStatusBadgeClasses(appointment.status)}`}
        >
          {appointment.status}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <p className="text-xs text-gray-500">Gender</p>
          <p className="text-sm font-medium text-text">
            {appointment?.patientDetails?.gender || "—"}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-gray-500">Contact</p>
          <p className="text-sm font-medium text-text flex items-center gap-1 ">
            <Phone className="w-3 h-3" />
            {appointment?.patientDetails?.patientMobileNo || "—"}
          </p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-3 space-y-2">
        <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Appointment Details
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-500">Date & Time</p>
            <p className="text-sm font-medium text-text">{appointment.time}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Duration</p>
            <p className="text-sm font-medium text-text">30 mins</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Problem/Reason</p>
            <p className="text-sm font-medium text-text">
              {appointment?.patientDetails?.problem || "—"}
            </p>
          </div>
        </div>
      </div>

      {renderActionButtons()}

      <Modal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        title="Appointment Details"
        size="lg"
      >
        <div className="max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
          <AppointmentDetailModal
            appointment={appointment}
            imageError={imageError}
            setImageError={setImageError}
          />
        </div>
      </Modal>

      <DeclineAppointmentModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onSubmit={handleDeclineSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default AppointmentCard;
