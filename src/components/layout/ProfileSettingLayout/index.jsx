import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";

const ProfileSettingLayout = () => {
  return (
    <div className="flex bg-pageBackground min-h-screen p-5">
      <ProfileSidebar />
      <div className="flex-1 ml-5">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileSettingLayout;
