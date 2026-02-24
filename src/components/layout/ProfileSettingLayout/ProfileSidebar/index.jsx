import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems } from "./MenuItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux";

const ProfileSidebar = () => {
  const user = useSelector(selectUser);
  const currentUser = user;
  return (
    <div className="w-full md:w-[320px] shrink-0 bg-bg rounded-2xl shadow-md border border-border p-4 sm:p-6">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        {currentUser?.attachDoc ? (
          <img
            src={currentUser?.attachDoc || "/default-avatar.png"}
            alt="Doctor-Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover mb-4"
          />
        ) : (
          <CustomAvatar
            name={currentUser?.fullName}
            size="48"
            round={true}
            bgColor="#C2184B"
            fgColor="#fff"
          />
        )}
        <h2 className="text-xl font-semibold text-primary">
          {currentUser?.fullName}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{currentUser?.email}</p>
      </div>
      <div className="space-y-2">
        {menuItems?.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-secondary/10 text-secondary font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              <Icon size={20} />
              <span className="flex-1 min-w-0 truncate">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSidebar;
