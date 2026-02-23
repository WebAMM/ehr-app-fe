import { authCookies } from "@/utils/cookieUtils";
import { Navigate } from "react-router-dom";

const ModerateRoute = ({ children }) => {
  const { getAuth } = authCookies;
  const role = getAuth()?.user?.status;
  const rolePaths = {
    patient: "/user-and-patient-dashboard",
    doctor: "/doctor-dashboard",
    clinic: "/laboratories-dashboard",
  };
  if (role && role !== "/sign-in") {
    return <Navigate to={rolePaths[role] || "/"} replace />;
  }

  return <>{children}</>;
};

export default ModerateRoute;
