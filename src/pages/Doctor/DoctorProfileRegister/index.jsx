import DoctorProfileUpdateForm from "@/components/common/DoctorProfileUpdateForm";
import PendingVerification from "./PendingVerification";
import React from "react";

const DoctorProfileRegister = () => {
  return (
    <div className="bg-pageBackground min-h-screen p-10 max-md:p-5">
      <div className="max-w-5xl mx-auto p-10 bg-white rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
        <DoctorProfileUpdateForm />
      </div>
    </div>
  );
};

export default DoctorProfileRegister;
