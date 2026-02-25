import React from "react";
import { CheckCircle } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "@/redux";

const PendingVerification = () => {
  const doctor = useSelector(selectUser);
  const navigate = useNavigate();
  return (
    <div className="bg-pageBackground min-h-screen p-10 max-md:p-5 flex flex-col   items-center mx-auto ">
      <div className="max-w-2xl w-full">
        {/* Doctor Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-12">
          <div className="flex items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={doctor?.attachDoc || "/default-doctor-avatar.png"}
                alt={doctor?.fullName}
                className="w-24 h-24 rounded-2xl object-cover"
              />
              <CheckCircle
                className="absolute bottom-0 right-0 w-6 h-6 text-[#0ebe7f] bg-white rounded-full"
                fill="#0ebe7f"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {doctor?.fullName}
              </h2>
              <p className="text-lg text-gray-600 mt-1">{doctor?.specialty}</p>
              <p className="text-sm text-gray-500 mt-2">
                {doctor?.dob || "Not provided"}
              </p>

              {/* Pending Badge */}
              <div className="mt-3 inline-block">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 border border-yellow-200">
                  <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                  <span className="text-sm font-medium text-yellow-700">
                    Pending
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Work In Progress Message */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#0ebe7f] mb-4">
            WORK
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-1 bg-[#0ebe7f] rounded-full w-12"></div>
            <span className="text-5xl md:text-6xl font-bold text-[#0ebe7f]">
              IN
            </span>
            <div className="h-1 bg-[#0ebe7f] rounded-full w-12"></div>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-[#0ebe7f] mb-8">
            PROGRESS
          </h2>

          <div className="w-full h-2 bg-linear-to-r from-[#0ebe7f] via-[#0ebe7f] to-[#0ebe7f] rounded-full overflow-hidden">
            <div className="h-full b-linear-to-r from-[#0ebe7f] to-[#0ebe7f] animate-pulse"></div>
          </div>

          <p className="mt-8 text-gray-600 text-lg max-w-md mx-auto">
            Your profile is under review. Our team will verify your credentials
            and get back to you soon.
          </p>

          <button
            onClick={() => navigate("/sign-in")}
            className="mt-8 px-8 py-3 bg-[#0ebe7f] text-white rounded-lg font-semibold hover:bg-[#0caa6f] transition-colors duration-200 cursor-pointer"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingVerification;
