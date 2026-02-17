import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileSettingLayout = () => {
  return (
    <div className="flex flex-col md:flex-row bg-pageBackground min-h-screen p-4 sm:p-5 gap-4 md:gap-5">
      <ProfileSidebar />
      <div className="flex-1 min-w-0 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileSettingLayout;
