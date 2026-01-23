import React, { useRef } from "react";
import { Formik, Form } from "formik";
import { otpSchema } from "./validation";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { IMAGES } from "../../assets/images";
import Button from "../../components/ui/Button";
import AuthHero from "./AuthHero";
const Otp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";
  const inputRefs = useRef([]);

  const handleOtpChange = (index, value, otpValue, setFieldValue) => {
    const sanitized = value.replace(/\D/g, "").slice(0, 1);
    const otpArray = otpValue.split("").slice(0, 6);
    while (otpArray.length < 6) otpArray.push("");
    otpArray[index] = sanitized;
    const nextValue = otpArray.join("");
    setFieldValue("otp", nextValue);
    if (sanitized && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, event, otpValue, setFieldValue) => {
    if (event.key === "Backspace" && !otpValue[index] && index > 0) {
      const otpArray = otpValue.split("");
      otpArray[index - 1] = "";
      setFieldValue("otp", otpArray.join(""));
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (event, setFieldValue) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    setFieldValue("otp", pasted);
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  const initialValues = { otp: "" };

  const handleSubmit = (values, actions) => {
    console.log("OTP submitted:", values.otp);
    setTimeout(() => {
      actions.setSubmitting(false);
      navigate("/reset-password", { state: { email } });
    }, 500);
  };

  const otpInputClass =
    "w-12 h-12 bg-white text-center text-gray-800 text-lg font-semibold border border-gray-300 rounded-md transition focus:outline-none focus:border-[#0ebe7f] focus:ring-2 focus:ring-[#0ebe7f]/30";

  return (
    <div className="min-h-screen bg-[#f6f8fb] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-7xl min-h-[90vh] grid lg:grid-cols-2 gap-8 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <AuthHero image={IMAGES.OTP} />

        <div className="px-4 sm:px-8 py-10 flex items-center ">
          <div className="w-full h-full">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
            >
              <FiArrowLeft className="mr-2" /> Back
            </button>
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 text-center">
                Enter OTP
              </h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed text-center ">
                We have sent a code to your registered email address
                <br />
                <span className="font-semibold text-gray-800">{email}</span>
              </p>

              <Formik
                initialValues={initialValues}
                validationSchema={otpSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, setFieldValue, isSubmitting }) => {
                  const digits = Array.from(
                    { length: 6 },
                    (_, idx) => values.otp[idx] || "",
                  );

                  return (
                    <Form className="space-y-8">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="flex items-center justify-center space-x-2">
                          {digits.map((digit, index) => (
                            <input
                              key={index}
                              ref={(el) => (inputRefs.current[index] = el)}
                              type="text"
                              inputMode="numeric"
                              maxLength="1"
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(
                                  index,
                                  e.target.value,
                                  values.otp,
                                  setFieldValue,
                                )
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(
                                  index,
                                  e,
                                  values.otp,
                                  setFieldValue,
                                )
                              }
                              onPaste={
                                index === 0
                                  ? (e) => handlePaste(e, setFieldValue)
                                  : undefined
                              }
                              className={otpInputClass}
                            />
                          ))}
                        </div>
                        {touched.otp && errors.otp && (
                          <p className="text-sm text-red-500">{errors.otp}</p>
                        )}
                        <p className="text-sm text-gray-600">
                          Didn't receive the code?{" "}
                          <button
                            type="button"
                            onClick={() => console.log("Resend OTP")}
                            className="text-[#0ebe7f] font-semibold hover:text-[#0eb2ad]"
                          >
                            Resend
                          </button>
                        </p>
                      </div>

                      <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        fullWidth
                        loading={isSubmitting}
                        disabled={isSubmitting || values.otp.length !== 6}
                        className="shadow-md shadow-[#0ebe7f]/25"
                      >
                        {isSubmitting ? "Verifying..." : "Verify"}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
