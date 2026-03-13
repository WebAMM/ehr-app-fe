import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Heart,
  FileText,
  CreditCard,
  HelpCircle,
  Camera,
  ChevronRight,
  Key,
} from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useGetUserByIdQuery, useUpdateUserProfileMutation } from "@/services";
import { toastError } from "@/components/ui/Toast";
import { updateUser } from "@/redux";
import { useDispatch } from "react-redux";

const ProfileSettingsPage = () => {
  const dispatch = useDispatch();
  const { data: userData } = useGetUserByIdQuery();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [profileImage, setProfileImage] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg",
  );
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
    try {
      const formData = new FormData();
      if (file) {
        formData.append("attachDoc", file);
      }
      const response = await updateUserProfile(formData).unwrap();
      if (response?.data) {
        dispatch(updateUser(response.data));
      }
    } catch (error) {
      toastError(
        error.message || "Failed to upload profile picture. Please try again.",
      );
    }
  };

  const settings = [
    {
      icon: User,
      title: "Edit Profile",
      desc: "Update your personal information",
      path: "/edit-profile",
    },
    {
      icon: Key,
      title: "Update Password",
      desc: "Update your Password",
      path: "/update-profile-password",
    },
    {
      icon: Heart,
      title: "Favorites",
      desc: "View your favorite doctors and facilities",
      path: "/favorites",
    },
    {
      icon: FileText,
      title: "My Medical Prescriptions",
      desc: "Access your prescriptions and medical documents",
      path: "/medical-prescriptions",
    },
    {
      icon: CreditCard,
      title: "Payment History",
      desc: "View your transaction history",
      path: "/payment-history",
    },
    {
      icon: HelpCircle,
      title: "Help and Support",
      desc: "Get assistance and contact support",
      path: "/help-support",
    },
  ];

  const handleSettingClick = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className=" bg-pageBackground p-7">
      <div className="max-w-4xl   space-y-6 ">
        <PageHeader
          title="Profile & Settings"
          subtitle="Manage your account and preferences"
        />
        <Card padding="lg" shadow="sm">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <img
                src={userData?.data?.attachDoc || profileImage}
                alt="Profile"
                className="w-40 h-40 rounded-full object-cover border-6 border-gray-100 shadow-sm "
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-5 right-3 bg-secondary text-white rounded-full p-2 shadow cursor-pointer"
                disabled={isUpdating}
              >
                <Camera className="w-5 h-5" />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={isUpdating}
              />
              {isUpdating && (
                <div className="absolute top-1/2 left-1/2 w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin -translate-x-1/2 -translate-y-1/2"></div>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-lg text-text">
                {userData?.data?.fullName || "Daniel Martinez"}
              </h3>
              <p className="text-sm text-text opacity-70">
                {userData?.data?.countryCode}{" "}
                {userData?.data?.phoneNo || "+123 856479683"}
              </p>
            </div>
          </div>
        </Card>

        <Card padding="md" shadow="sm">
          <div className="divide-y divide-secondary/20">
            {settings.map((item, index) => (
              <div
                key={index}
                onClick={() => handleSettingClick(item.path)}
                className="flex items-center justify-between py-4 px-2 rounded-md cursor-pointer hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-4">
                  <Icon icon={item.icon} iconClass="text-secondary" bg />
                  <div>
                    <p className="font-medium text-text">{item.title}</p>
                    <p className="text-sm text-text opacity-70">{item.desc}</p>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-text opacity-40" />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
