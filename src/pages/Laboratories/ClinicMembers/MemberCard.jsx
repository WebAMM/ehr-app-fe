import { DollarSign, MapPin, Pencil, Phone, Star, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { useRemoveClinicDoctorMutation } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { toastSuccess, toastError } from "@/components/ui/Toast";
import UpdateClinicDoctorModal from "./UpdateClinicDoctor";
import useModal from "@/hooks/useModal";
import { useState } from "react";
export const MemberCard = ({ member, onRefresh }) => {
  const showRating = typeof member.rating === "number";
  const { getUser } = authCookies;
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [removeClinicDoctor, { isLoading }] = useRemoveClinicDoctorMutation();
  const {
    isOpen: isUpdateModalOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  const user = getUser();
  const clinicId = user?._id;

  const handleDelete = async (doctorId) => {
    if (!clinicId) {
      toastError("Clinic ID not found. Please login again.");
      return;
    }
    if (!doctorId) {
      toastError("Doctor ID not found. Please refresh the page.");
      return;
    }
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This doctor will be removed from your clinic. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) {
      return;
    }
    try {
      const response = await removeClinicDoctor({
        clinicId: clinicId,
        clinicDoctorId: doctorId,
      }).unwrap();

      toastSuccess(response?.message || "Doctor removed successfully!");
      onRefresh?.();
    } catch (error) {
      console.error("Delete error:", error);
      toastError(
        error?.data?.message || "Failed to remove doctor. Please try again.",
      );
    }
  };
  const handleEdit = (doctorData) => {
    setSelectedDoctor(doctorData);
    openUpdateModal();
  };
  return (
    <div className="bg-bg border border-border rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <img
            src={member.image}
            alt={member.name}
            className="w-12 h-12 rounded-lg object-cover bg-border shrink-0"
            onError={(e) => {
              e.currentTarget.src =
                "https://via.placeholder.com/96x96/cccccc/666666?text=Avatar";
            }}
          />

          <div className="min-w-0">
            <p className="font-semibold text-text truncate">{member.name}</p>
            <p className="text-sm text-text opacity-70 truncate">
              {member.role}
            </p>
            <p className="text-xs text-text opacity-60 truncate mt-0.5">
              {member.meta}
            </p>

            {showRating && (
              <div className="flex items-center gap-1 text-xs text-text opacity-80 mt-2">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span className="font-medium opacity-100">{member.rating}</span>
                <span className="opacity-70">({member.reviews} reviews)</span>
                {typeof member.patients === "number" && (
                  <>
                    <span className="opacity-40">•</span>
                    <span className="opacity-70">
                      {member.patients} patients
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {/* <div>
          <StatusPill status={member.status} />
        </div> */}
      </div>
      <div className="bg-secondary/10 mt-4 p-3 rounded-lg text-sm text-secondary">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  ">
          <div className="flex items-center gap-2 text-xs text-text opacity-70 ">
            <MapPin size={15} /> <span>{member?.location}</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-text opacity-70">
            <Phone className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate">{member.phone}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-text opacity-70 ">
          <DollarSign size={15} /> <span>{member?.consultationFee}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-muted transition text-text opacity-60 hover:opacity-100 cursor-pointer"
            aria-label="Edit"
            onClick={() => handleEdit(member)}
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-muted transition text-red-600/80 hover:text-red-600 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Delete"
            onClick={() => handleDelete(member.id)}
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <UpdateClinicDoctorModal
        isOpen={isUpdateModalOpen}
        closeModal={closeUpdateModal}
        doctorData={selectedDoctor}
        onSuccess={onRefresh}
      />
    </div>
  );
};
