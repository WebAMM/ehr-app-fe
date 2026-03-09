import React from "react";
import { Link } from "react-router-dom";

const ClinicSettingsNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
      <p className="text-2xl font-semibold text-text">Page Not Found</p>
      <p className="text-gray-500">
        The settings page you are looking for does not exist.
      </p>
      <Link
        to="/clinic-settings/profile"
        className="text-secondary hover:underline text-sm font-medium"
      >
        Go to Profile
      </Link>
    </div>
  );
};

export default ClinicSettingsNotFound;
