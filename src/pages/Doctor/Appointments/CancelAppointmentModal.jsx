import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { toastError, toastSuccess } from "@/components/ui/Toast";
import { X } from "lucide-react";
import { useUpdateStatusAndSendNotificationMutation } from "@/services/doctorApi";

const CancelAppointmentModal = ({ isOpen, onClose, appointmentId }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateStatusAndSendNotification] =
    useUpdateStatusAndSendNotificationMutation();

  const reasons = [
    "Decline Appointment",
    "Reschedule Appointment",
    "Contact Doctor",
    "Request Appointment Summary",
    "Cancel Appointment",
  ];
  const handleCancel = async () => {
    if (!selectedReason) {
      toastSuccess("Please select a cancellation reason");
      return;
    }

    if (selectedReason === "Other" && !otherReason.trim()) {
      toastError("Please enter a cancellation reason");
      return;
    }

    setIsLoading(true);

    try {
      const cancellationReason =
        selectedReason === "Other" ? otherReason : selectedReason;

      await updateStatusAndSendNotification({
        id: appointmentId,
        body: {
          status: "cancelled",
          cancellationReason: cancellationReason,
        },
      }).unwrap();
      toastSuccess("Appointment cancelled successfully");
      onClose();
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      toastError(error?.data?.message || "Failed to cancel appointment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setOtherReason("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="lg">
      <div className="relative w-full">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="pr-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-text mb-2">
              Please select the reason for Decline:
            </h2>
          </div>

          <div className="space-y-3">
            {reasons.map((reason) => (
              <label
                key={reason}
                className="flex items-center p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition"
              >
                <input
                  type="radio"
                  name="cancellation-reason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={(e) => {
                    setSelectedReason(e.target.value);
                    setOtherReason("");
                  }}
                  className="w-4 h-4 text-green-600 cursor-pointer"
                />
                <span className="ml-3 text-gray-700">{reason}</span>
              </label>
            ))}
          </div>

          <div className="space-y-2">
            <label className="flex items-center p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition">
              <input
                type="radio"
                name="cancellation-reason"
                value="Other"
                checked={selectedReason === "Other"}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-4 h-4 text-green-600 cursor-pointer"
              />
              <span className="ml-3 text-gray-700 font-medium">Other</span>
            </label>

            {selectedReason === "Other" && (
              <textarea
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Enter Your Reason"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows="4"
              />
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="danger"
              onClick={handleCancel}
              loading={isLoading}
              disabled={isLoading}
              className="flex-1"
            >
              Decline Request of Patient
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CancelAppointmentModal;
