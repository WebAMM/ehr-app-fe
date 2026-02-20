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
