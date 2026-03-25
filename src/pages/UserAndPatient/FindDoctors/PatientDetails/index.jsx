import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";
import { Upload } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBookAppointmentMutation } from "@/services/userApi";
import { toastError, toastSuccess } from "@/components/ui/Toast";
import PaymentMethodModal from "@/Models/PaymentMethodModal";
import ConfirmAppointment from "@/Models/ConfirmAppointmentModal";
import AppointmentDetailsModal from "@/Models/AppointmentDetailsModal";
import PaymentWithOrange from "@/Models/PayementWithOrange";
import { useClaimFeeWithOrangeMoneyMutation } from "@/services/doctorApi";

const PatientDetailsSchema = Yup.object().shape({
  patientName: Yup.string()
    .required("Patient name is required")
    .min(2, "Patient name must be at least 2 characters"),
  mobileNo: Yup.string()
    .required("Mobile number is required")
    .matches(/^[\d+\-\s()]+$/, "Mobile number must be valid"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number()
    .required("Age is required")
    .min(0, "Age must be positive")
    .max(150, "Age must be valid"),
  problem: Yup.string()
    .required("Please describe your problem")
    .min(10, "Problem description must be at least 10 characters"),
  insuranceNo: Yup.string(),
  insuranceName: Yup.string(),
});

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const INSURANCE_NAME_OPTIONS = [
  { label: "ASCOMA", value: "ASCOMA" },
  { label: "SUNU", value: "SUNU" },
  { label: "ASK GRA SA", value: "ASK GRA SA" },
  { label: "OLEA", value: "OLEA" },
];

export default function PatientDetails() {
  const location = useLocation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isAppointmentDetailsModalOpen, setIsAppointmentDetailsModalOpen] =
    useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentWithOrangeModalOpen, setPaymentWithOrangeModalOpen] =
    useState(false);
  const [confirmationData, setConfirmationData] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [fileError, setFileError] = useState("");
  const [claimFeeWithOrangeMoney, { isLoading: isClaiming }] =
    useClaimFeeWithOrangeMoneyMutation();

  const slotData = location.state?.slotData || {};
  const { slotId, doctorId } = slotData;

  const [bookAppointment, { isLoading: isBooking }] =
    useBookAppointmentMutation();

  const formik = useFormik({
    initialValues: {
      patientName: "",
      mobileNo: "",
      gender: "",
      age: "",
      problem: "",
      insuranceNo: "",
      insuranceName: "",
    },
    validationSchema: PatientDetailsSchema,
    onSubmit: async (values) => {
      if (!slotId) {
        toastError("Slot information is missing. Please try again.");
        return;
      }
      try {
        const formData = new FormData();

        formData.append("doctorId", doctorId);
        formData.append("slotId", slotId);
        formData.append("patientDetails[patientName]", values.patientName);
        formData.append("patientDetails[patientMobileNo]", values.mobileNo);
        formData.append("patientDetails[gender]", values.gender);
        formData.append("patientDetails[age]", values.age);
        formData.append("patientDetails[problem]", values.problem);
        formData.append("patientDetails[insuranceNo]", values.insuranceNo);
        formData.append("patientDetails[insuranceName]", values.insuranceName);

        if (selectedFile) {
          formData.append("patientDetails[attachDoc]", selectedFile);
        }
        const response = await bookAppointment({ body: formData }).unwrap();
        if (response) {
          toastSuccess(response.message || "Appointment booked successfully!");
          const appointmentData = response.data?.data?.appointment;
          setIsPaymentModalOpen(true);
          setConfirmationData({ appointmentData });
        }
      } catch (error) {
        toastError(
          error?.data?.message ||
            "Failed to book appointment. Please try again.",
        );
      }
    },
  });
  const handlePaymentMethodChange = (methodId) => {
    if (methodId === "orange") {
      setPaymentWithOrangeModalOpen(true);
    } else if (methodId === "cash") {
      setIsConfirmationModalOpen(true);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (!validTypes.includes(file.type)) {
        setFileError("Only PDF, JPG, and PNG files are allowed");
        return;
      }
      if (file.size > maxSize) {
        setFileError("File size must be less than 5MB");
        return;
      }

      setSelectedFile(file);
      setFileError("");
    }
  };
  const handleClaimRequest = async () => {
    const payload = {
      appointmentId: confirmationData.appointmentData?._id,
      doctorId: confirmationData?.appointmentData?.doctorId?._id,
      paymentMethod: "orangeMoney",
      amountPaid: confirmationData?.appointmentData?.doctorId?.consultationFee,
      userId: confirmationData?.appointmentData?.userId,
      accountName: "orangeMoney",
      accountNo: accountNumber,
      customerMsisdn: "72906251",
      actionType: "consultation",
    };
    try {
      const response = await claimFeeWithOrangeMoney({
        body: payload,
      }).unwrap();
      if (response) {
        toastSuccess("Claim request submitted successfully!");
        setPaymentWithOrangeModalOpen(false);
        setAppointmentId(response?.data?.claimRequest?.userId);
        setIsAppointmentDetailsModalOpen(true);
      }
    } catch (error) {
      toastError(
        error?.data?.message ||
          "Failed to submit claim request. Please try again.",
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <StickyHeader
        linkTo="/doctor-booking-appointment"
        linkText="Patient Details"
        showFavorite={false}
      />

      <div className="flex justify-center px-3 sm:px-4 py-4 sm:py-6">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm p-4 sm:p-6 space-y-5 sm:space-y-6">
          <Input
            label="Patient Name"
            name="patientName"
            placeholder="Enter patient name"
            value={formik.values.patientName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.patientName && formik.errors.patientName
                ? formik.errors.patientName
                : ""
            }
            required
          />
          <Input
            label="Patient Mobile No."
            name="mobileNo"
            type="tel"
            placeholder="Enter phone number"
            value={formik.values.mobileNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.mobileNo && formik.errors.mobileNo
                ? formik.errors.mobileNo
                : ""
            }
            required
          />

          <div>
            <label
              htmlFor="gender"
              className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-xs sm:text-sm outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
                formik.touched.gender && formik.errors.gender
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              }`}
            >
              <option value="">Select gender</option>
              {GENDER_OPTIONS.map((gender) => (
                <option key={gender.value} value={gender.value}>
                  {gender.label}
                </option>
              ))}
            </select>
            {formik.touched.gender && formik.errors.gender && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.gender}
              </p>
            )}
          </div>

          <Input
            label="Your Age"
            name="age"
            type="number"
            placeholder="Enter age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.age && formik.errors.age ? formik.errors.age : ""
            }
            required
          />

          <div>
            <label
              htmlFor="problem"
              className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Write your Problem <span className="text-red-500">*</span>
            </label>
            <textarea
              id="problem"
              name="problem"
              placeholder="Write here..."
              value={formik.values.problem}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="4"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-xs sm:text-sm resize-none outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
                formik.touched.problem && formik.errors.problem
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              }`}
            />
            {formik.touched.problem && formik.errors.problem && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.problem}
              </p>
            )}
          </div>

          <Input
            label="Insurance No"
            name="insuranceNo"
            placeholder="Enter insurance number"
            value={formik.values.insuranceNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.insuranceNo && formik.errors.insuranceNo
                ? formik.errors.insuranceNo
                : ""
            }
          />

          <div>
            <label
              htmlFor="insuranceName"
              className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-1"
            >
              Insurance Name
            </label>
            <select
              id="insuranceName"
              name="insuranceName"
              value={formik.values.insuranceName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-xs sm:text-sm outline-none focus:ring-2 focus:ring-opacity-50 transition-all ${
                formik.touched.insuranceName && formik.errors.insuranceName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
              }`}
            >
              <option value="">Select insurance company</option>
              {INSURANCE_NAME_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formik.touched.insuranceName && formik.errors.insuranceName && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.insuranceName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-start text-xs sm:text-sm font-medium text-gray-700 mb-2">
              Attach Doc <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
              <label className="flex items-center gap-2 bg-secondary text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg cursor-pointer hover:bg-secondary-dark transition-colors text-xs sm:text-sm font-medium">
                <Upload className="w-4 h-4" />
                <span>Choose File</span>
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
              </label>
            </div>

            {selectedFile && (
              <div className="mt-2 text-xs sm:text-sm text-green-600">
                ✓ {selectedFile.name}
              </div>
            )}

            {fileError && (
              <p className="mt-2 text-sm text-red-500">{fileError}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="secondary"
            size="lg"
            fullWidth
            onClick={formik.handleSubmit}
            disabled={isBooking}
            loading={isBooking}
          >
            {isBooking ? "Booking..." : "Go for Pay"}
          </Button>
        </div>
      </div>

      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        setSelectedPayment={setSelectedPayment}
        selectedPayment={selectedPayment}
        handlePaymentMethodChange={handlePaymentMethodChange}
      />
      <ConfirmAppointment
        isOpen={isConfirmationModalOpen}
        appointmentData={confirmationData}
        onClose={() => setIsConfirmationModalOpen(false)}
      />
      <AppointmentDetailsModal
        isOpen={isAppointmentDetailsModalOpen}
        onClose={() => setIsAppointmentDetailsModalOpen(false)}
        appointmentData={appointmentId}
      />
      <PaymentWithOrange
        isOpen={paymentWithOrangeModalOpen}
        onClose={() => setPaymentWithOrangeModalOpen(false)}
        isSubscribing={isClaiming}
        handlePayNow={handleClaimRequest}
        accountNumber={accountNumber}
        setAccountNumber={setAccountNumber}
      />
    </div>
  );
}
