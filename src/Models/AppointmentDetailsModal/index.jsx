import React from "react";
import { Copy } from "lucide-react";
import Modal from "../../components/ui/Modal";

const AppointmentDetailsModal = ({
  isOpen,
  onClose,
  appointmentData,
  onClaimRequest,
  onViewSchedule,
}) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  console.log("Appointment Data:", appointmentData);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className="p-0"
      title="Appointment Details"
    >
      <div className="flex flex-col py-8 px-6 max-h-[90vh] overflow-y-auto">
        <div className="mb-6">
          <p className="text-gray-600 text-sm mb-1">Your Appointment ID</p>
          <h3 className="text-3xl font-bold text-green-600">
            {appointmentData?._id || "N/A"}
          </h3>
        </div>

        <div className="mb-6">
          <p className="text-gray-900 font-semibold text-sm mb-4">
            Pay for respective Account
          </p>

          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
            {/* <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-orange-500 rounded"></div>
              <h4 className="font-bold text-gray-900">
                {appointmentData?.paymentMethod || "N/A"}
              </h4>
            </div> */}

            {/* <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Account Name:</p>
                <p className="text-sm font-medium text-gray-900">
                  {appointmentData?.patientDetails?.accountName || "N/A"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Account Number:</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {appointmentData?.accountNumber || "N/A"}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(appointmentData?.accountNumber)
                    }
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy account number"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div> */}
          </div>

          <button
            onClick={onClaimRequest}
            className="w-full bg-red-400 hover:bg-red-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Claim Request
          </button>
        </div>

        <div className="bg-green-50 rounded-lg p-4 mb-6">
          <div className="space-y-3">
            <DetailRow
              label="Patient Name:"
              value={appointmentData?.patientDetails?.patientName || "N/A"}
            />
            <DetailRow
              label="Phone Number:"
              value={appointmentData?.patientDetails?.patientMobileNo || "N/A"}
              fontWeight="font-bold"
            />
            <DetailRow
              label="Gender"
              value={appointmentData?.patientDetails?.gender || "N/A"}
            />
            <DetailRow
              label="Age"
              value={appointmentData?.patientDetails?.age || "N/A"}
            />
            <DetailRow
              label="Problem"
              value={appointmentData?.patientDetails?.problem || "N/A"}
            />
            <DetailRow
              label="Insurance Number"
              value={appointmentData?.patientDetails?.insuranceNo || "N/A"}
            />
            <DetailRow
              label="Insurance Name"
              value={appointmentData?.patientDetails?.insuranceName || "N/A"}
            />
            <DetailRow
              label="Payment Status"
              value={appointmentData?.payment?.status || "N/A"}
              valueClass="text-orange-600 font-semibold"
            />
            <DetailRow
              label="Payment Amount"
              value={`$${appointmentData?.payment?.amount || 0}`}
              valueClass="text-green-600 font-semibold"
            />
            <DetailRow
              label="Doctor ID"
              value={appointmentData?.doctorId || "N/A"}
            />
            <DetailRow
              label="Appointment Date"
              value={
                new Date(appointmentData?.createdAt).toLocaleDateString() ||
                "N/A"
              }
            />
          </div>
        </div>

        {/* View Schedule Button */}
        <button
          onClick={onViewSchedule}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          View Schedule
        </button>
      </div>
    </Modal>
  );
};

const DetailRow = ({
  label,
  value,
  fontWeight = "font-normal",
  valueClass = "text-gray-900",
}) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-600">{label}</span>
      <span className={`${fontWeight} ${valueClass}`}>{value}</span>
    </div>
  );
};

export default AppointmentDetailsModal;
