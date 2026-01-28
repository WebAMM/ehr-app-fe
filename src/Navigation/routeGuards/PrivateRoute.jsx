import React from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../config";
import { PrivateLayout } from "../../components/layout/PrivateLayout";

function PrivateRoute({ children }) {
  const persistedData = JSON.parse(
    localStorage.getItem("persist:root") || "{}",
  );
  const authData = persistedData.auth ? JSON.parse(persistedData.auth) : null;
  const jwtToken = authData?.token;
  if (jwtToken) {
    return <PrivateLayout>{children}</PrivateLayout>;
  } else {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }
}

export default PrivateRoute;
