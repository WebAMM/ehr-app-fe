import React from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../config";
import { PrivateLayout } from "../../components/common/PrivateLayout";

function PrivateRoute({ children }) {
  const jwtToken = JSON.parse(localStorage.getItem("userToken"));
  if (jwtToken) {
    return <PrivateLayout>{children}</PrivateLayout>;
  } else {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }
}

export default PrivateRoute;
