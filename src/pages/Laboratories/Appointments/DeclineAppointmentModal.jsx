import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { AlertCircle } from "lucide-react";

const DeclineAppointmentModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const reasons = [
    { id: "unavailable", label: "Unavailable" },
    { id: "technical_issue", label: "Technical Issue" },
    { id: "personal_emergency", label: "Personal Emergency" },
    { id: "scheduling_conflict", label: "Scheduling Conflict" },
    { id: "others", label: "Others" },
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      return;
    }
    const reason = selectedReason === "others" ? otherReason : selectedReason;
    if (selectedReason === "others" && !otherReason.trim()) {
      return;
    }
    onSubmit(reason, selectedReason);

    setSelectedReason("");
    setOtherReason("");
  };

  const handleClose = () => {
    setSelectedReason("");
    setOtherReason("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Decline Appointment"
      size="lg"
    >
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-gray-700">
              Please select the reason for declining this appointment request.
            </p>
          </div>
        </div>

        {/* Reasons Section */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">
            Please select the reason for Decline:
          </p>

          {/* Radio buttons for reasons */}
          <div className="space-y-2">
            {reasons.map((reason) => (
              <label
                key={reason.id}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="decline-reason"
                  value={reason.id}
                  checked={selectedReason === reason.id}
                  onChange={(e) => setSelectedReason(e.target.value)}
                  className="w-4 h-4 text-green-600 border-gray-300 cursor-pointer"
                />
                <span className="text-sm text-gray-700">{reason.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Other reason text area */}
        {selectedReason === "others" && (
          <div className="space-y-2 animate-in fade-in">
            <label
              htmlFor="other-reason"
              className="block text-sm font-medium text-gray-700"
            >
              Other
            </label>
            <textarea
              id="other-reason"
              placeholder="Enter your reason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows="4"
            />
          </div>
        )}
        <div className="flex gap-3 pt-4">
          <Button
            variant="danger"
            size="md"
            className="rounded-xl flex-1 bg-green-600 hover:bg-green-700 text-white border-0"
            onClick={handleSubmit}
            disabled={
              !selectedReason ||
              (selectedReason === "others" && !otherReason.trim()) ||
              isLoading
            }
          >
            {isLoading ? "Declining..." : "Decline Request of Patient"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeclineAppointmentModal;
