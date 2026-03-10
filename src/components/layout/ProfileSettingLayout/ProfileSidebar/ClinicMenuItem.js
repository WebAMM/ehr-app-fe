import { User, Palette, Bell, Shield, CreditCard, Edit, Star } from "lucide-react";

export const clinicMenuItems = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
    path: "/clinic-settings/profile",
  },
  {
    id: "profileEdit",
    label: "Edit Profile",
    icon: Edit,
    path: "/clinic-settings/profile-edit",
  },
 
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    path: "/clinic-settings/notifications",
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    path: "/clinic-settings/security",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    path: "/clinic-settings/billing",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    path: "/clinic-settings/reviews",
  },
];
