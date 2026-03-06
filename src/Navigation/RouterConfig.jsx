import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { WEB_PAGES } from "../pages";
import { PATH } from "../../config";
import PublicRoute from "./routeGuards/PublicRoute";
import PrivateRoute from "./routeGuards/PrivateRoute";
import ModerateRoute from "./routeGuards/ModerateRoute";
import { INITIAL_VALUE } from "./DataRouteConfig";
import ProfileSettingLayout from "../components/layout/ProfileSettingLayout";
import DoctorSettingsProfile from "../pages/Doctor/DoctorSettings/Profile";
import DoctorSettingsEditProfile from "../pages/Doctor/DoctorSettings/EditProfile";
import DoctorSettingsChangePassword from "../pages/Doctor/DoctorSettings/ChangePassword";
import DoctorSettingsNotifications from "../pages/Doctor/DoctorSettings/Notifications";
import DoctorSettingsBillingHistory from "../pages/Doctor/DoctorSettings/BillingHistory";
import DoctorSettingsReviews from "../pages/Doctor/DoctorSettings/Reviews";
import DoctorSettingsHelpCenter from "../pages/Doctor/DoctorSettings/HelpCenter";
import DoctorSettingsNotFound from "../pages/Doctor/DoctorSettings/NotFound";
import { clinicMenuItems } from "../components/layout/ProfileSettingLayout/ProfileSidebar/ClinicMenuItem";
import ClinicSettingsProfile from "../pages/Laboratories/ClinicSettings/Profile";
import ClinicSettingsAppearance from "../pages/Laboratories/ClinicSettings/Appearance";
import ClinicSettingsNotifications from "../pages/Laboratories/ClinicSettings/Notifications";
import ClinicSettingsSecurity from "../pages/Laboratories/ClinicSettings/Security";
import ClinicSettingsBilling from "../pages/Laboratories/ClinicSettings/Billing";
import ClinicSettingsNotFound from "../pages/Laboratories/ClinicSettings/NotFound";
import EditClinicProfile from "@/pages/Laboratories/ClinicSettings/EditClinicProfile";

export const RouterConfig = () => {
  return (
    <div>
      <Routes>
        <Route
          path={PATH.DOCTOR_SETTING}
          element={
            <PrivateRoute>
              <ProfileSettingLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<DoctorSettingsProfile />} />
          <Route path="edit" element={<DoctorSettingsEditProfile />} />
          <Route
            path="change-password"
            element={<DoctorSettingsChangePassword />}
          />
          <Route
            path="notifications"
            element={<DoctorSettingsNotifications />}
          />
          <Route path="billing" element={<DoctorSettingsBillingHistory />} />
          <Route path="reviews" element={<DoctorSettingsReviews />} />
          <Route path="help" element={<DoctorSettingsHelpCenter />} />
          <Route path="*" element={<DoctorSettingsNotFound />} />
        </Route>

        <Route
          path={PATH.CLINIC_SETTING}
          element={
            <PrivateRoute>
              <ProfileSettingLayout menuItems={clinicMenuItems} />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ClinicSettingsProfile />} />
          <Route path="appearance" element={<ClinicSettingsAppearance />} />
          <Route
            path="notifications"
            element={<ClinicSettingsNotifications />}
          />
          <Route path="profile-edit" element={<EditClinicProfile />} />
          <Route path="security" element={<ClinicSettingsSecurity />} />
          <Route path="billing" element={<ClinicSettingsBilling />} />
          <Route path="*" element={<ClinicSettingsNotFound />} />
        </Route>

        {INITIAL_VALUE?.filter(
          (item) => item?.path !== PATH.DOCTOR_SETTING,
        )?.map((item, index) => (
          <React.Fragment key={index}>
            {item?.route === "PublicRoute" ? (
              <Route
                path={item?.path}
                element={<PublicRoute>{item?.page}</PublicRoute>}
              ></Route>
            ) : item?.route === "ModerateRoute" ? (
              <Route
                path={item?.path}
                element={<ModerateRoute>{item?.page}</ModerateRoute>}
              ></Route>
            ) : (
              <Route
                path={item?.path}
                element={<PrivateRoute>{item?.page}</PrivateRoute>}
              ></Route>
            )}
          </React.Fragment>
        ))}
        <Route path="*" element={<Navigate to={PATH.SIGN_IN} replace />} />
      </Routes>
    </div>
  );
};
