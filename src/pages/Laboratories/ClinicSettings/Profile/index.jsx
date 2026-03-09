import React from "react";
import { useSelector } from "react-redux";
import Card from "@/components/ui/Card";
import { selectUser } from "@/redux";

const Item = ({ label, value }) => (
  <div className="space-y-1">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-text">{value || "N/A"}</p>
  </div>
);

const Badge = ({ text }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
    {text}
  </span>
);

const ClinicSettingsProfile = () => {
  const user = useSelector(selectUser);

  const fullAddress = [user?.address, user?.city, user?.state, user?.zipCode]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="w-full space-y-4">
      {/* Header with logo */}
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {user?.logo ? (
            <img
              src={user.logo}
              alt="Clinic Logo"
              className="w-24 h-24 rounded-2xl object-cover shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-secondary">
                {user?.fullName?.charAt(0)?.toUpperCase() || "C"}
              </span>
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="text-xl font-semibold text-primary">
              {user?.fullName || "N/A"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium capitalize">
                {user?.typeOfHealthCenter || user?.status || "clinic"}
              </span>
              {user?.isVerified === "true" && (
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
                  Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card
        title="General Information"
        padding="lg"
        shadow="sm"
        parentClass="rounded-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Item label="Clinic Name" value={user?.fullName} />
          <Item label="Email Address" value={user?.email} />
          <Item label="Country Code" value={user?.countryCode || "—"} />
          <Item label="Phone Number" value={user?.phoneNumber} />
          <Item label="RCCM / NIF Number" value={user?.RCCMNIFNumber} />
          <Item label="Website" value={user?.website || "—"} />
          <Item label="Address" value={fullAddress || "—"} />
        </div>
      </Card>
      {(user?.servicesProvided?.length > 0 ||
        user?.medicalExamTypesProvided?.length > 0) && (
        <Card
          title="Services & Exams"
          padding="lg"
          shadow="sm"
          parentClass="rounded-2xl"
        >
          {user?.servicesProvided?.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-gray-500 font-medium">
                Services Provided
              </p>
              <div className="flex flex-wrap gap-2">
                {user.servicesProvided.map((s, i) => (
                  <Badge key={i} text={s} />
                ))}
              </div>
            </div>
          )}
          {user?.medicalExamTypesProvided?.length > 0 && (
            <div className="space-y-2 mt-4">
              <p className="text-sm text-gray-500 font-medium">
                Medical Exam Types
              </p>
              <div className="flex flex-wrap gap-2">
                {user.medicalExamTypesProvided.map((e, i) => (
                  <Badge key={i} text={e} />
                ))}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Availability */}
      {user?.availableDayAndTime?.length > 0 && (
        <Card
          title="Working Hours"
          padding="lg"
          shadow="sm"
          parentClass="rounded-2xl"
        >
          <div className="space-y-2">
            {user.availableDayAndTime.map((slot) => (
              <div
                key={slot._id}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <span
                  className={`text-sm font-medium capitalize w-28 ${
                    slot.available ? "text-text" : "text-gray-400"
                  }`}
                >
                  {slot.day}
                </span>
                {slot.available ? (
                  <span className="text-sm text-gray-600">
                    {slot.openingTime} — {slot.closingTime}
                  </span>
                ) : (
                  <span className="text-xs text-gray-400 italic">Closed</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ClinicSettingsProfile;
