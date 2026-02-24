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

 export const menuItems = [
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
