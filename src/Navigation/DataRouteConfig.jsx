import { PATH } from "../../config";
import { WEB_PAGES } from "../pages";

let PathName = Object.keys(PATH, "path");
PathName.splice(0, 1);

export const INITIAL_VALUE = PathName.map((item) => {
  let Val = WEB_PAGES[item];

  if (
    item === "SIGN_IN" ||
    item === "REGISTER" ||
    item === "FORGOT_PASSWORD" ||
    item === "OTP_VERIFICATION" ||
    item === "RESET_PASSWORD" ||
    item === "DOCTOR_PROFILE_REGISTER" ||
    item === "PENDING_VERIFICATION"
  ) {
    return { path: PATH[item], page: <Val />, route: "PublicRoute" };
  } else if (item === "LANDING_PAGE") {
    return { path: PATH[item], page: <Val />, route: "ModerateRoute" };
  }
  return { path: PATH[item], page: <Val />, route: "PrivateRoute" };
});
