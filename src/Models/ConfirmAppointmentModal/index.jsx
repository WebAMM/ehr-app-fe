import React from "react";
import { Check } from "lucide-react";
import Modal from "../../components/ui/Modal";
import Button from "@/components/ui/Button";

const ConfirmAppointment = ({ isOpen, onClose, appointmentData }) => {
  console.log("Appointment Data in Confirm Modal:", appointmentData);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" className="p-0">
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
              <Check size={48} className="text-white" strokeWidth={3} />
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-2">Your Appointment ID</p>
        <h3 className="text-2xl font-bold text-green-600 mb-6">
          {appointmentData?.appointmentData?._id || "N/A"}
        </h3>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Congratulations!
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-sm">
          Your appointment has been successfully booked. We look forward to
          seeing you at your scheduled time.
        </p>
        <Button onClick={onClose} variant="success" size="lg" fullWidth>
          Done
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmAppointment;
