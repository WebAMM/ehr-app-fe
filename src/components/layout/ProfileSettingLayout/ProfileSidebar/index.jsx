import React from "react";
import { NavLink } from "react-router-dom";
import {
  User,
  Edit,
  Eye,
  Bell,
  CreditCard,
  Star,
  HelpCircle,
  LogOut,
} from "lucide-react";

const ProfileSidebar = () => {
  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      icon: User,
      path: "/doctor-settings/profile",
    },
    {
      id: "edit",
      label: "Edit Profile",
      icon: Edit,
      path: "/doctor-settings/edit",
    },
    {
      id: "password",
      label: "Change Password",
      icon: Eye,
      path: "/doctor-settings/change-password",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      path: "/doctor-settings/notifications",
    },
    {
      id: "billing",
      label: "Billing History",
      icon: CreditCard,
      path: "/doctor-settings/billing",
    },
    {
      id: "reviews",
      label: "My Reviews",
      icon: Star,
      path: "/doctor-settings/reviews",
    },
    {
      id: "help",
      label: "Help Center",
      icon: HelpCircle,
      path: "/doctor-settings/help",
    },
  ];

  return (
    <div className="w-[320px] bg-bg rounded-2xl shadow-md border border-border p-6">
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Doctor"
          className="w-24 h-24 rounded-2xl object-cover mb-4"
        />

        <h2 className="text-xl font-semibold text-primary">Dr. David Patel</h2>
        <p className="text-gray-500 text-sm mt-1">+221 77 123 4567</p>
      </div>
      <div className="space-y-2">
        {menuItems.map((item) => {
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
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <NavLink
          to="/logout"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </NavLink>
      </div>
    </div>
  );
};

export default ProfileSidebar;
