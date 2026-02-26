export const handleDownload = (data) => {
  const content = `
APPOINTMENT DETAILS
${"=".repeat(80)}

PATIENT INFORMATION
${"-".repeat(80)}
Patient Name: ${data?.patientDetails?.patientName || "N/A"}
Phone: ${data?.patientDetails?.patientMobileNo || "N/A"}
Gender: ${data?.patientDetails?.gender || "N/A"}
Age: ${data?.patientDetails?.age || "N/A"}
Problem: ${data?.patientDetails?.problem || "N/A"}
Insurance No: ${data?.patientDetails?.insuranceNo || "N/A"}
Insurance Provider: ${data?.patientDetails?.insuranceName || "N/A"}

APPOINTMENT DETAILS
${"-".repeat(80)}
Date: ${data?.slotId?.date?.split("T")[0] || "N/A"}
Time: ${data?.slotId?.time || "N/A"}
Duration: ${data?.slotId?.duration || "N/A"}
Type: ${data?.doctorType === "In-Clinic Consultation" ? "In-Clinic" : "Video Call"}
Status: ${data?.status || "N/A"}

PAYMENT INFORMATION
${"-".repeat(80)}
Amount: ${data?.payment?.amount || 0} CFA
Payment Status: ${data?.payment?.status || "N/A"}
Payment Method: ${data?.payment?.method || "N/A"}
Transaction ID: ${data?.payment?.transactionId || "N/A"}

ADDITIONAL INFORMATION
${"-".repeat(80)}
Appointment ID: ${data?._id || "N/A"}
Patient ID: ${data?.userId || "N/A"}
Created At: ${new Date(data?.createdAt).toLocaleDateString() || "N/A"}
Cancellation Reason: ${data?.cancellationReason || "N/A"}

Generated on: ${new Date().toLocaleString()}
    `.trim();

  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = `Appointment_${data?._id || "Details"}_${new Date().toISOString().split("T")[0]}.txt`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
