import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { WEB_PAGES } from "../pages";
import { PATH } from "../../config";
import PublicRoute from "./routeGuards/PublicRoute";
import PrivateRoute from "./routeGuards/PrivateRoute";
import ModerateRoute from "./routeGuards/ModerateRoute";
import { INITIAL_VALUE } from "./DataRouteConfig";
export const RouterConfig = () => {
  return (
    <div>
      <Routes>
        {INITIAL_VALUE?.map((item, index) => (
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
