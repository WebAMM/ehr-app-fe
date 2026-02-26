import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Calendar, Clock, Video, MapPin, MoreVertical, X } from "lucide-react";
import CustomAvatar from "@/components/ui/Avatar";
import ViewDetails from "./ViewDetails";
import CancelAppointmentModal from "./CancelAppointmentModal";
import { useUpdateStatusAndSendNotificationMutation } from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";
const AppointmentCard = ({ data, onUpdate }) => {
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [updateStatusAndSendNotification, { isLoading }] =
    useUpdateStatusAndSendNotificationMutation();
  const handleUpdateStatus = async (id, newStatus) => {
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
      onUpdate();
    } catch (error) {
      toastError(error?.data?.message || "Failed to update appointment status");
    }
  };
  return (
    <Card padding="md" shadow="sm" className="space-y-4">
      <div className="flex gap-5  items-start max-lg:flex-col">
        {data?.patientDetails?.attachDoc ? (
          <img
            src={data.patientDetails.attachDoc}
            alt={data?.patientDetails?.patientName}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <CustomAvatar name={data?.patientDetails?.patientName} />
        )}

        <div className="space-y-4 w-full">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div>
                <h3 className="font-semibold text-text">
                  {data?.patientDetails?.patientName}
                </h3>
                <div className="flex flex-col mt-1">
                  <span className="text-sm text-gray-500">
                    Appointment Id: {data?._id}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs bg-secondary/10 text-primary rounded-full">
                {data?.status}
              </span>
              <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-gray-500 text-xs">Date</p>
                <p className="font-medium">
                  {data?.slotId?.date.split("T")[0]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-gray-500 text-xs">Time</p>
                <p className="font-medium">{data?.slotId?.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-gray-500 text-xs">Duration</p>
                <p className="font-medium">{data?.slotId?.duration}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              {data?.doctorType === "In-Clinic Consultation" ? (
                <MapPin className="w-4 h-4 text-green-600" />
              ) : (
                <Video className="w-4 h-4 text-green-600" />
              )}
              <div>
                <p className="text-gray-500 text-xs">Type</p>
                <p className="font-medium">{data?.doctorType}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start flex-wrap gap-3 ">
              <div className="text-sm text-gray-500 flex flex-col ">
                <span>Phone</span>
                <span className="text-primary font-bold">
                  {data?.patientDetails?.patientMobileNo || "N/A"}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex flex-col ">
                <span>Payment status</span>
                <span className="text-primary font-bold">
                  {data?.payment?.status || "N/A"}
                </span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {(data?.status === "pending" || data?.status === "confirmed") && (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() =>
                    handleUpdateStatus(
                      data?._id,
                      data?.status === "pending" ? "confirmed" : "completed",
                    )
                  }
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {data?.status === "pending" ? "Confirm" : "Mark as Completed"}
                </Button>
              )}

              <Button
                variant="successOutline"
                size="sm"
                onClick={() => setShowDetailsModal(true)}
                disabled={isLoading}
              >
                View Details
              </Button>

              {data?.doctorType !== "In-Clinic Consultation" && (
                <Button variant="success" size="sm" disabled={isLoading}>
                  Join Call
                </Button>
              )}
              {(data?.status === "pending" || data?.status === "confirmed") && (
                <Button
                  variant="dangerOutline"
                  size="sm"
                  onClick={() => setShowCancelModal(true)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        size="lg"
      >
        <ViewDetails
          data={data}
          setShowDetailsModal={setShowDetailsModal}
          setShowCancelModal={setShowCancelModal}
        />
      </Modal>

      <CancelAppointmentModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        appointmentId={data?._id}
        onCancelSuccess={onUpdate}
      />
    </Card>
  );
};

export default AppointmentCard;
