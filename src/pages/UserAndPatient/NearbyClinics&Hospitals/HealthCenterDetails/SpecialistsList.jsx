import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star, Clock, Pin, MapPin, Check, CircleCheckBig } from "lucide-react";
import { useGetClinicDoctorsDetailsQuery } from "@/services";
import { useNavigate } from "react-router-dom";

function mapDoctorData(data) {
  return {
    id: data?._id,
    fullName: data?.fullName,
    about: data?.about,
    specialty: data?.specialty,
    experience: data?.experience,
    consultationFee: data?.consultationFee,
    gender: data?.gender,
    phoneNumber: data?.phoneNumber,
    countryCode: data?.countryCode,
    organization: data?.organization,
    location: data?.location,
    attachDoc: data?.attachDoc,
    dob: data?.dob,
    availableDayAndTime: Array.isArray(data?.availableDayAndTime)
      ? data.availableDayAndTime.filter((day) => day.available)
      : [],
  };
}

const SpecialistsList = ({ clinicId }) => {
  const [limit, setLimit] = React.useState(3);
  const {
    data: clinicDetails,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetClinicDoctorsDetailsQuery({
    id: clinicId,
    limit,
    page: 1,
  });
  const navigate = useNavigate();
  const doctorsRaw = clinicDetails?.data?.clinicDoctors || [];
  const doctors = doctorsRaw.map(mapDoctorData);
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse p-4 rounded-xl bg-gray-100">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-300" />
              <div className="flex-1 space-y-3">
                <div className="h-4 w-1/3 bg-gray-300 rounded" />
                <div className="h-3 w-2/3 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ✅ Error State
  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-semibold">Failed to load doctors 😔</p>
        <p className="text-sm text-gray-500 mt-1">
          {error?.data?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-primary mb-2">
        Specialists Doctors{" "}
        <span className="text-secondary font-normal">
          {clinicDetails?.data?.pagination?.totalRecords || 0}
        </span>
      </h3>
      {doctors.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No doctors available
        </div>
      ) : (
        doctors?.map((doc) => (
          <Card key={doc.id} className="p-2 bg-white">
            <div className="flex gap-6 items-start">
              <img
                src={
                  doc?.attachDoc ||
                  "https://randomuser.me/api/portraits/men/32.jpg"
                }
                alt={doc?.fullName}
                className="w-24 h-24 rounded-full object-cover border-4 border-primary/10 shadow"
              />

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-lg text-primary">
                    {doc?.fullName}
                  </h4>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-0.5 rounded-full ml-2">
                    {doc?.specialty}
                  </span>
                </div>

                <p className="text-xs text-gray-500 mb-1">{doc?.about}</p>

                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    {doc?.experience} Experience
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {doc?.gender}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} /> {doc?.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Pin size={14} /> {doc?.organization}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Star size={14} /> Phone:
                    <span className="font-semibold ml-1">
                      {doc?.countryCode} {doc?.phoneNumber}
                    </span>
                  </span>
                </div>

                <div className="mt-2">
                  <span className="font-semibold text-sm">Available Days:</span>

                  <ul className="mt-1">
                    {doc.availableDayAndTime.length === 0 ? (
                      <li className="text-xs text-gray-400 italic">
                        Not available this week
                      </li>
                    ) : (
                      doc.availableDayAndTime.map((day) => (
                        <li
                          key={day._id}
                          className="text-xs flex items-center gap-2 mb-1"
                        >
                          <CircleCheckBig
                            size={14}
                            className="text-green-500"
                          />
                          <span className="font-medium text-gray-700">
                            {day?.day}:
                          </span>
                          <span className="text-gray-600">
                            {day?.openingTime} - {day?.closingTime}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center bg-primary/5 p-3 rounded-lg mt-4">
              <span>
                Fee:{" "}
                <span className="font-semibold">{doc?.consultationFee}</span>
              </span>

              <Button
                size="sm"
                variant="gradient"
                onClick={() =>
                  navigate("/clinic-doctor-details", {
                    state: { doctorID: doc?.id, clinicId },
                  })
                }
              >
                Book Appointment
              </Button>
            </div>
          </Card>
        ))
      )}

      {clinicDetails?.data?.pagination?.totalRecords > limit && (
        <div className="flex items-center justify-center mt-4">
          <Button
            size="md"
            variant="gradient"
            onClick={() => setLimit(limit + 3)}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default SpecialistsList;
