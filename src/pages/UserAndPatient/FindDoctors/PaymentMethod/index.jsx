import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Star } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";

export default function PaymentMethod() {
  const navigate = useNavigate();
  const location = useLocation();
  const doctorDetails = location.state?.doctorDetails;
  const appointmentData = location.state?.appointmentData;
  console.log("Received doctor details:", doctorDetails);
  console.log("Received appointment data:", appointmentData);
  const [selectedPayment, setSelectedPayment] = useState("cash");

  const paymentMethods = [
    {
      id: "bawa1",
      label: "BAWA",
      accountName: "BAWA",
      accountNumber: "+2367290820",
      icon: "orange",
    },
    {
      id: "bawa2",
      label: "BAWA",
      accountName: "BAWA",
      accountNumber: "+2367290820",
      icon: "red",
    },
    {
      id: "cash",
      label: "Cash",
      accountName: "Cash",
      accountNumber: null,
      icon: "cash",
    },
  ];

  const handleSubmit = () => {
    const selectedMethod = paymentMethods.find(
      (method) => method.id === selectedPayment,
    );

    // Navigate to next step or confirmation page
    navigate("/booking-confirmation", {
      state: {
        doctorDetails,
        appointmentData,
        paymentMethod: selectedMethod,
      },
    });
  };

  if (!doctorDetails) {
    return (
      <main className="min-h-screen bg-pageBackground">
        <StickyHeader linkTo="/find-doctors" linkText="Payment Method" />
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-muted-foreground">
            No doctor details found. Please go back and select a doctor.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pageBackground">
      <StickyHeader linkTo="/find-doctors" linkText="Payment Method" />

      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
        {/* Doctor Profile Card */}
        <Card className="mb-8 p-6">
          <div className="flex gap-6">
            <img
              src={doctorDetails?.attachDoc}
              alt={doctorDetails?.fullName}
              className="w-24 h-24 rounded-lg object-cover shrink-0"
            />

            <div className="flex-1">
              <h1 className="text-lg font-bold">{doctorDetails?.fullName}</h1>
              <p className="text-muted-foreground text-sm">
                {doctorDetails?.specialty}
              </p>

              <p className="text-xs text-muted-foreground mt-1">
                {doctorDetails?.qualification}
              </p>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-sm">
                    {doctorDetails?.reviews?.averageRating || "5"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {doctorDetails?.reviews?.totalReviews || "1,872"} Reviews
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div>
                  <p className="text-xs text-muted-foreground">Video</p>
                  <p className="text-sm font-semibold">
                    {appointmentData?.consultationFee || "1800"} CFA
                  </p>
                </div>
              </div>
            </div>

            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </Card>

        {/* Payment Method Selection */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-2">Select Payment Method</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Pay for respective Account
          </p>

          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <input
                  type="radio"
                  name="payment-method"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-5 h-5 cursor-pointer"
                  style={{
                    accentColor: "#0ebe7f",
                  }}
                />

                <div className="flex-1 flex items-center gap-4">
                  {method.icon === "orange" && (
                    <div className="bg-orange-500 rounded px-2 py-1 text-white text-xs font-semibold">
                      orange
                    </div>
                  )}
                  {method.icon === "red" && (
                    <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      i
                    </div>
                  )}
                  {method.icon === "cash" && <div className="text-2xl">💰</div>}

                  <div>
                    <p className="font-semibold text-sm">
                      {method.accountName}
                    </p>
                    {method.accountNumber && (
                      <p className="text-xs text-muted-foreground">
                        Account Number: {method.accountNumber}
                      </p>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>

          <Button
            variant="success"
            fullWidth
            size="lg"
            onClick={handleSubmit}
            className="mt-8"
          >
            Submit
          </Button>
        </Card>
      </div>
    </main>
  );
}
