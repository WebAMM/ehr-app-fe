import React from "react";
import AddClinicDoctorForm from "./AddClinicDoctorForm";
import Modal from "@/components/ui/Modal";

const UpdateClinicDoctorModal = ({
  doctorData,
  isOpen,
  closeModal,
  onSuccess,
}) => {
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Update Clinic Doctor"
        size="lg"
        className="max-w-4xl"
      >
        <AddClinicDoctorForm
          onClose={closeModal}
          onSuccess={onSuccess}
          doctorData={doctorData}
        />
      </Modal>
    </div>
  );
};

export default UpdateClinicDoctorModal;
