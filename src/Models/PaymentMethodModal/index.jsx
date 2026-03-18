import React from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { ORANGE_MONEY_LOGO } from "@/assets/images";
import { BsCash } from "react-icons/bs";

export default function PaymentMethodModal({
  isOpen,
  onClose,
  selectedPayment,
  setSelectedPayment,
  handlePaymentMethodChange,
}) {
  const paymentMethods = [
    {
      id: "orange",
      label: "Orange Money",
      accountName: "Orange Money",
      accountNumber: "74696407",
      icon: "orange",
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
    handlePaymentMethodChange(selectedMethod.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-2xl mx-auto">
        {/* Doctor Profile Card */}
        {/* <Card className="mb-8 p-6">
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
        </Card> */}

        {/* Payment Method Selection */}
        <Card className="p-6">
          <h2 className="text-lg font-bold mb-2">Select Payment Method</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Pay for respective Account
          </p>

          <div className="space-y-4">
            {paymentMethods?.map((method) => (
              <label
                key={method.id}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex-1 flex items-center gap-4">
                  {method.icon === "orange" && (
                    <img
                      src={ORANGE_MONEY_LOGO}
                      alt="orange money"
                      className="w-12"
                    />
                  )}
                  {method.icon === "red" && (
                    <div className="bg-red-500 rounded-full w-8 h-8 flex items-center justify-center text-white">
                      i
                    </div>
                  )}
                  {method.icon === "cash" && (
                    <div className="text-2xl">
                      <BsCash />
                    </div>
                  )}

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
                <input
                  type="radio"
                  name="payment-method"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-5 h-5 cursor-pointer"
                />
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
    </Modal>
  );
}
