import React, { useState } from "react";
import { IMAGES } from "@/assets/images";
import { useJsApiLoader } from "@react-google-maps/api";
import AuthHero from "../AuthHero";
import UserRegisterForm from "./UserRegisterForm";
import DoctorRegisterForm from "./DoctorRegisterForm";
import ClinicRegisterForm from "./ClinicRegisterForm";
const TABS = ["User", "Doctor", "Clinic"];
const Register = () => {
  const [activeTab, setActiveTab] = useState("User");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <AuthHero image={IMAGES.BG_AUTH_MAIN} />

        <div className="px-4 sm:px-8 py-8 flex items-center">
          <div className="w-full">
            <div className="flex justify-center lg:justify-start mb-6">
              <div className="rounded-full border-2 border-[#0ebe7f]/60 p-2 bg-white shadow-sm">
                <img
                  src={IMAGES.LOGO}
                  alt="Brand logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center lg:text-left">
              Register your account
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center lg:text-left">
              Enter your details to create your account.
            </p>

            <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-[#0ebe7f] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === "User" && <UserRegisterForm isLoaded={isLoaded} />}
            {activeTab === "Doctor" && (
              <DoctorRegisterForm isLoaded={isLoaded} />
            )}
            {activeTab === "Clinic" && <ClinicRegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
