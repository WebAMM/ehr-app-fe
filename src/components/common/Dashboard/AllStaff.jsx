import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus, Star, MapPin, Briefcase, DollarSign } from "lucide-react";
import { useGetClinicDoctorsDetailsQuery } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import Error from "@/components/ui/Error";

import CustomAvatar from "@/components/ui/Avatar";

const StaffSkeleton = () => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl animate-pulse">
    <div className="flex items-center gap-4 w-full">
      <div className="w-20 h-20 rounded-xl bg-gray-200"></div>
      <div className="flex-1">
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-40 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
    <div className="flex flex-col items-end gap-3">
      <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
      <div className="h-3 w-20 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const AllStaff = () => {
  const { getUser } = authCookies;
  const role = getUser()?.status;
  const [imageErrors, setImageErrors] = useState({});

  const { data, isLoading, error, refetch } = useGetClinicDoctorsDetailsQuery(
    { id: getUser()?._id },
    { skip: role !== "clinic" },
  );
  const clinicDoctors = data?.data?.clinicDoctors || [];
  const getDoctorStatus = (availableDayAndTime) => {
    if (!availableDayAndTime || availableDayAndTime.length === 0) {
      return "Inactive";
    }
    const hasAvailableDay = availableDayAndTime.some((day) => day.available);
    return hasAvailableDay ? "Active" : "Inactive";
  };
  const transformedStaff = clinicDoctors.map((doctor) => ({
    id: doctor._id,
    name: doctor.fullName || "N/A",
    specialization: doctor.specialty || "N/A",
    qualification: doctor.experience || "N/A",
    rating: 0, // Not provided in API
    reviews: 0, // Not provided in API
    status: getDoctorStatus(doctor.availableDayAndTime),
    phone: doctor.phoneNumber || "N/A",
    image: doctor.attachDoc,
    organization: doctor.organization || "N/A",
    location: doctor.location || "N/A",
    consultationFee: doctor.consultationFee || "N/A",
  }));

  const handleImageError = (doctorId) => {
    setImageErrors((prev) => ({
      ...prev,
      [doctorId]: true,
    }));
  };

  return (
    <Card
      shadow="md"
      padding="md"
      parentClass="bg-white rounded-2xl w-full"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">All Staff</h2>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <StaffSkeleton />
          <StaffSkeleton />
          {/* <StaffSkeleton /> */}
        </div>
      ) : error ? (
        <Error
          message={error?.message || "Failed to load staff"}
          refetch={refetch}
        />
      ) : clinicDoctors.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <p className="text-sm">No staff members found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {transformedStaff.map((staff) => {
            const isActive = staff.status === "Active";
            const hasImageError = imageErrors[staff.id];

            return (
              <div
                key={staff.id}
                className="flex flex-col p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    {hasImageError || !staff.image ? (
                      <CustomAvatar
                        name={staff.name}
                        size="60"
                        bgColor="#10B981"
                      />
                    ) : (
                      <img
                        src={staff.image}
                        alt={staff.name}
                        className="w-16 h-16 rounded-xl object-cover"
                        onError={() => handleImageError(staff.id)}
                      />
                    )}

                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {staff.name}
                      </h3>

                      <p className="text-sm text-gray-600">
                        {staff.specialization}
                      </p>

                      <p className="text-xs text-gray-500">
                        {staff.qualification}
                      </p>
                      {staff.rating > 0 && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center text-yellow-500 text-sm">
                            <Star
                              size={14}
                              className="fill-yellow-400 stroke-yellow-400"
                            />
                            <span className="ml-1 text-yellow-600 font-medium">
                              {staff.rating}
                            </span>
                          </div>

                          <span className="text-xs text-gray-500">
                            {staff.reviews.toLocaleString()} Reviews
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        isActive
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {staff.status}
                    </span>

                    <span className="text-xs text-gray-600 font-medium">
                      {staff.phone}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
                  {/* Organization */}
                  <div className="flex items-start gap-2">
                    <Briefcase
                      size={16}
                      className="text-blue-600 mt-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Organization</p>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {staff.organization}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin
                      size={16}
                      className="text-red-600 mt-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {staff.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <DollarSign
                      size={16}
                      className="text-green-600 mt-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500">Consultation Fee</p>
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {staff.consultationFee}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default AllStaff;
