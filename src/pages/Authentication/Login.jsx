import { IMAGES } from "../../assets/images";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "./AuthValidation";
import AuthHero from "./AuthHero";
import { Form, Formik } from "formik";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Checkbox from "@/components/ui/Checkbox";
import {
  useClinicLoginMutation,
  useDoctorLoginMutation,
  useUserLoginMutation,
} from "@/services";
import { toastError, toastSuccess } from "@/components/ui/Toast";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux";
import { PATH } from "../../../config";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
    role: "user",
  };
  const [userLogin, { isLoading: isUserLoading }] = useUserLoginMutation();
  const [doctorLogin, { isLoading: isDoctorLoading }] =
    useDoctorLoginMutation();
  const [clinicLogin, { isLoading: isClinicLoading }] =
    useClinicLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = isUserLoading || isDoctorLoading || isClinicLoading;
  const handleSubmit = async (values) => {
    try {
      let response;
      if (values.role === "user") {
        response = await userLogin({
          email: values.email,
          password: values.password,
        }).unwrap();
      } else if (values.role === "doctor") {
        response = await doctorLogin({
          email: values.email,
          password: values.password,
        }).unwrap();
      } else if (values.role === "clinic") {
        response = await clinicLogin({
          email: values.email,
          password: values.password,
        }).unwrap();
      }
      let userStatus;
      if (response?.data?.token) {
        toastSuccess(response.message || "Login successful!");
        if (values.role === "user") {
          dispatch(
            loginSuccess({
              token: response.data.token,
              user: response.data.user,
            }),
          );
          userStatus = response.data.user.status;
        } else if (values.role === "doctor") {
          dispatch(
            loginSuccess({
              token: response.data.token,
              user: response.data.doctor,
            }),
          );
          userStatus = response.data.doctor.status;
        } else if (values.role === "clinic") {
          dispatch(
            loginSuccess({
              token: response.data.token,
              user: response.data.clinic,
            }),
          );
          userStatus = response.data.clinic.status;
        }

        if (userStatus === "clinic" || userStatus === "laboratory") {
          navigate(PATH.LABORATORIES_DASHBOARD);
        } else if (userStatus === "doctor") {
          const doctor = response.data.doctor;

          if (doctor?.gender?.trim() && doctor?.specialty?.trim()) {
            navigate(PATH.DOCTOR_DASHBOARD);
          } else {
            navigate("/doctor-settings/edit");
          }
        } else if (userStatus === "patient" || userStatus === "user") {
          navigate(PATH.USER_AND_PATIENT_DASHBOARD);
        } else {
          navigate(PATH.USER_AND_PATIENT_DASHBOARD);
        }
      }
    } catch (error) {
      toastError(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className=" min-h-screen bg-[#f6f8fb] flex items-center justify-center px-8 py-10">
      <div className="w-full  min-h-[90vh] grid lg:grid-cols-5 gap-0 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden ">
        <div className="min-h-full col-span-3">
          <AuthHero />
        </div>
        <div className="px-4 sm:px-8 py-8 flex items-center  min-h-full h-full col-span-2">
          <div className="w-full h-full flex  justify-center flex-col">
            <div className="flex justify-center  mb-16 lg:justify-start">
              <div className="rounded-full border-2 border-[#0ebe7f]/60 p-2 bg-white shadow-sm">
                <img
                  src={IMAGES.LOGO}
                  alt="Brand logo"
                  className="w-14 h-14 object-contain"
                />
              </div>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center lg:text-left">
              Log in to Tracksanté
            </h2>
            <p className="text-sm text-gray-600 mb-6 text-center lg:text-left">
              Welcome back! Please enter your details.
            </p>

            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,

                setFieldValue,
              }) => (
                <Form className="space-y-5">
                  <div className="space-y-1">
                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email ? errors.email : ""}
                      height={48}
                      className="text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <Input
                      label="Password"
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                      height={48}
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Role
                    </label>
                    <select
                      name="role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ebe7f] focus:border-transparent text-sm"
                    >
                      <option value="user">User</option>
                      <option value="doctor">Doctor</option>
                      <option value="clinic">Clinic</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        label="Remember me"
                        name="rememberMe"
                        checked={values.rememberMe}
                        onChange={(e) =>
                          setFieldValue("rememberMe", e.target.checked)
                        }
                        className="text-[#0ebe7f]"
                      />
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    type="submit"
                    variant="gradient"
                    size="lg"
                    fullWidth
                    loading={loading}
                    loaderSize={25}
                    disabled={loading}
                    className="shadow-md shadow-[#0ebe7f]/25"
                  >
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </Form>
              )}
            </Formik>
            <div className="mt-6">
              Does not have an account?{" "}
              <Link
                to="/register"
                className="text-secondary hover:text-[#0ebe7f]/80 font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
