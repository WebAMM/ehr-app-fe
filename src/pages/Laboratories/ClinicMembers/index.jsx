import React, { useEffect, useMemo, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Modal from "@/components/ui/Modal";
import { MapPin, Plus, Search } from "lucide-react";
import { authCookies } from "@/utils/cookieUtils";
import { useGetClinicDoctorsDetailsQuery } from "@/services";
import { MemberCard } from "./MemberCard";
import { LoaderCenter } from "@/components/ui/Loader";
import useModal from "@/hooks/useModal";
import AddClinicDoctorForm from "./AddClinicDoctorForm";
const ClinicMembers = () => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [limit, setLimit] = useState(10);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);
  const { isOpen, openModal, closeModal } = useModal();

  const { getUser } = authCookies;
  const role = getUser()?.status;
  const { data, isLoading, error, refetch, isFetching } =
    useGetClinicDoctorsDetailsQuery(
      { id: getUser()?._id, limit: limit, page: 1, search: debouncedSearch },
      { skip: role !== "clinic" },
    );
  const handleAddSuccess = () => {
    refetch();
  };

  const clinicDoctors = useMemo(() => {
    if (!data?.data?.clinicDoctors) return [];
    return data?.data?.clinicDoctors.map((doctor) => ({
      id: doctor._id,
      type: "doctor",
      name: doctor.fullName,
      role: doctor.specialty,
      meta: doctor.experience,
      rating: null,
      reviews: null,
      patients: null,
      email: doctor.email || "N/A",
      phone: doctor.phoneNumber,
      status: "Active",
      image:
        doctor.attachDoc ||
        "https://via.placeholder.com/96x96/cccccc/666666?text=Avatar",
      consultationFee: doctor.consultationFee,
      location: doctor.location,
      gender: doctor.gender,
      about: doctor.about,
      availableDayAndTime: doctor.availableDayAndTime || [],
      RCCMNIFNumber: doctor.RCCMNIFNumber || "",
      authorizationNumber: doctor.authorizationNumber || "",
      dob: doctor.dob || "",
      bloodGroup: doctor.bloodGroup || "",
      organization: doctor.organization || "",
      clinicId: doctor.clinicId || [],
      createdAt: doctor.createdAt || "",
      updatedAt: doctor.updatedAt || "",
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 space-y-6 bg-pageBackground min-h-screen">
        <div className="flex items-center justify-center h-64">
          <LoaderCenter />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-6 space-y-6 bg-pageBackground min-h-screen">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-600">
            Error loading clinic doctors: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-pageBackground min-h-screen">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Clinic Members</h1>
          <p className="text-sm text-text opacity-70">
            Manage doctors and staff members
          </p>
        </div>

        <Button variant="secondary" size="sm" icon={Plus} onClick={openModal}>
          Add New Member
        </Button>
      </div>

      <Card padding="md" shadow="none">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text opacity-50" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, specialty, experience, phone, location or gender..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>
      </Card>

      <Card padding="md" shadow="none">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text">
              Doctors {data.data?.pagination?.totalRecords || 0}
            </p>
            <div className="hidden sm:flex items-center gap-2 text-xs text-text opacity-60">
              <MapPin className="w-4 h-4" />
              <span>Clinic Members</span>
            </div>
          </div>

          {clinicDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text opacity-60">
                {search ? "No doctors found" : "No doctors available"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicDoctors.map((doctor) => (
                <MemberCard
                  key={doctor.id}
                  member={doctor}
                  onRefresh={refetch}
                />
              ))}
            </div>
          )}
        </div>
      </Card>

      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Add New Clinic Doctor"
        size="lg"
        className="max-w-4xl"
      >
        <AddClinicDoctorForm
          onClose={closeModal}
          onSuccess={handleAddSuccess}
        />
      </Modal>

      <div className="text-center py-4">
        <button
          className="text-sm text-secondary underline cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={() => setLimit(limit + 10)}
          disabled={data.data.pagination.totalRecords <= limit || isFetching}
        >
          {isFetching ? "Loading..." : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default ClinicMembers;
