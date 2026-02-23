import React from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../config";
import { PrivateLayout } from "../../components/layout/PrivateLayout";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectToken } from "@/redux";

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectToken);

  if (isAuthenticated && token) {
    return <PrivateLayout>{children}</PrivateLayout>;
  } else {
    return <Navigate to={PATH.SIGN_IN} replace />;
  }
}

export default PrivateRoute;
