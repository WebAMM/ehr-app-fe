import React from "react";
import { Copy, AlertCircle } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { useGetAppointmentByIdQuery } from "@/services";
import { LoaderCenter } from "../../components/ui/Loader";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
const AppointmentDetailsModal = ({ isOpen, onClose, appointmentData }) => {
  const {
    data: apiResponse,
    isLoading: apiLoading,
    isError: apiError,
    error: apiErrorDetails,
  } = useGetAppointmentByIdQuery({
    id: appointmentData?._id || appointmentData,
  });
  const navigate = useNavigate();
  const appointment = apiResponse?.data?.claimRequest;
  const isLoading = apiLoading;
  const isError = apiError;
  const error = apiErrorDetails;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      className="p-0"
      title="Appointment Details"
    >
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <LoaderCenter />
          <p className="text-gray-600 text-sm mt-4">
            Loading appointment details...
          </p>
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <AlertCircle size={48} className="text-red-500 mb-4" />
          <p className="text-red-600 font-semibold text-center mb-2">
            Failed to load appointment
          </p>
          <p className="text-gray-600 text-sm text-center mb-4">
            {error?.data?.message ||
              error?.message ||
              "Something went wrong. Please try again."}
          </p>
        </div>
      ) : appointment ? (
        <div className="flex flex-col py-8 px-6 max-h-[90vh] overflow-y-auto">
          <div className="mb-6">
            <p className="text-gray-600 text-sm mb-1">Your Appointment ID</p>
            <h3 className="text-3xl font-bold text-green-600">
              {appointment?._id || "N/A"}
            </h3>
          </div>

          <div className="mb-6">
            <p className="text-gray-900 font-semibold text-sm mb-4">
              Pay for respective Account
            </p>

            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded"></div>
                <h4 className="font-bold text-gray-900">
                  {appointment?.paymentMethod === "orangeMoney"
                    ? "Orange Money"
                    : appointment?.paymentMethod || "N/A"}
                </h4>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Amount:</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${appointment?.amountPaid || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Patient Information
            </h4>
            <div className="space-y-3">
              <DetailRow
                label="Patient Name:"
                value={
                  appointment?.appointmentId?.patientDetails?.patientName ||
                  "N/A"
                }
              />
              <DetailRow
                label="Phone Number:"
                value={
                  appointment?.appointmentId?.patientDetails?.patientMobileNo ||
                  "N/A"
                }
                fontWeight="font-bold"
              />
              <DetailRow
                label="Gender"
                value={
                  appointment?.appointmentId?.patientDetails?.gender || "N/A"
                }
              />
              <DetailRow
                label="Age"
                value={appointment?.appointmentId?.patientDetails?.age || "N/A"}
              />
              <DetailRow
                label="Problem"
                value={
                  appointment?.appointmentId?.patientDetails?.problem || "N/A"
                }
              />
              <DetailRow
                label="Insurance Number"
                value={
                  appointment?.appointmentId?.patientDetails?.insuranceNo ||
                  "N/A"
                }
              />
              <DetailRow
                label="Insurance Name"
                value={
                  appointment?.appointmentId?.patientDetails?.insuranceName ||
                  "N/A"
                }
              />
              {appointment?.appointmentId?.patientDetails?.attachDoc && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Attached Document:</span>
                  <a
                    href={appointment?.appointmentId?.patientDetails?.attachDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    View
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Doctor Information
            </h4>
            <div className="space-y-3">
              <DetailRow
                label="Doctor Name:"
                value={appointment?.doctorId?.fullName || "N/A"}
              />
              <DetailRow
                label="Consultation Type:"
                value={appointment?.doctorId?.type || "N/A"}
              />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Appointment Schedule
            </h4>
            <div className="space-y-3">
              <DetailRow
                label="Date:"
                value={
                  typeof appointment?.appointmentId?.slotId === "object"
                    ? new Date(
                        appointment?.appointmentId?.slotId?.date,
                      ).toLocaleDateString()
                    : "N/A"
                }
              />
              <DetailRow
                label="Time:"
                value={
                  typeof appointment?.appointmentId?.slotId === "object"
                    ? appointment?.appointmentId?.slotId?.time
                    : "N/A"
                }
              />
              <DetailRow
                label="Duration:"
                value={
                  typeof appointment?.appointmentId?.slotId === "object"
                    ? `${appointment?.appointmentId?.slotId?.duration || 0} minutes`
                    : "N/A"
                }
              />
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">
              Payment Summary
            </h4>
            <div className="space-y-3">
              <DetailRow
                label="Payment Status"
                value={appointment?.payment?.status || "N/A"}
                valueClass="text-orange-600 font-semibold"
              />
              <DetailRow
                label="Payment Amount"
                value={`$${appointment?.payment?.amount || 0}`}
                valueClass="text-green-600 font-semibold"
              />
              <DetailRow
                label="Payment Method"
                value={
                  appointment?.payment?.method === "orange_money"
                    ? "Orange Money"
                    : appointment?.payment?.method || "N/A"
                }
              />
            </div>
          </div>

          <Button onClick={() => navigate("/my-bookings")} variant="success">
            View Schedule
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <AlertCircle size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 font-semibold text-center">
            No appointment data available
          </p>
        </div>
      )}
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
