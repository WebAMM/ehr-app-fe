import React, { Children } from "react";
import ProfileSidebar from "./ProfileSidebar";

const ProfileSettingLayout = ({ children }) => {
  return (
    <div className="flex">
      <ProfileSidebar />
      <div>{children}</div>
    </div>
  );
};

export default ProfileSettingLayout;
