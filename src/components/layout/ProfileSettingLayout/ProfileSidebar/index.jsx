import React from "react";
import { NavLink } from "react-router-dom";
import { menuItems as doctorMenuItems } from "./MenuItem";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux";

const ProfileSidebar = ({ menuItems }) => {
  const user = useSelector(selectUser);
  const currentUser = user;
  const items = menuItems || doctorMenuItems;
  return (
    <div className="w-full md:w-[320px] shrink-0 bg-bg rounded-2xl shadow-md border border-border p-4 sm:p-6">
      <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
        {currentUser?.attachDoc || currentUser?.logo ? (
          <img
            src={
              currentUser?.attachDoc ||
              currentUser?.logo ||
              "/default-avatar.png"
            }
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover mb-4"
          />
        ) : (
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-secondary">
              {currentUser?.fullName?.charAt(0)?.toUpperCase() || "?"}
            </span>
          </div>
        )}
        <h2 className="text-xl font-semibold text-primary">
          {currentUser?.fullName}
        </h2>
        <p className="text-gray-500 text-sm mt-1">{currentUser?.email}</p>
      </div>
      <div className="space-y-2">
        {items?.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.id}
              to={item.path}
              end
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
