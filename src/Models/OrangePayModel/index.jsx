import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React, { useState } from "react";
import { ORANGE_MONEY_LOGO } from "@/assets/images";
import { useSubscribeWithOrangeMoneyMutation } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { toastError, toastSuccess } from "@/components/ui/Toast";
const OrangePayModel = ({ isOpen, onClose }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [subscriptionWithOrangeMoney, { isLoading: isSubscribing }] =
    useSubscribeWithOrangeMoneyMutation();
  const { getUser } = authCookies;
  const user = getUser();
  const userId = user?._id;
  const status = user?.status;
  const userType = status === "patient" ? "user" : status;
  const handlePayNow = async () => {
    const payload = {
      [userType + "Id"]: userId,
      userType: userType?.charAt(0).toUpperCase() + userType?.slice(1),
      subscription: "yearly",
      subscriptionType: "orangeMoney",
      paymentMethod: "orangeMoney",
      customerMsisdn: accountNumber,
      providerMsisdn: "74696407",
    };

    const response = await subscriptionWithOrangeMoney({ body: payload });

    if (response.error) {
      toastError(
        response.error?.data?.message ||
          "Error subscribing with Orange Money. Please try again.",
      );
      return;
    }

    if (response.data?.success === false) {
      toastError(
        response.data?.message ||
          "Error subscribing with Orange Money. Please try again.",
      );
      return;
    }

    toastSuccess(response.data?.message || "Subscription successful!");
    onClose();
    setAccountNumber("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div>
        <h2 className="text-xl font-semibold mb-2">Please Submit Your</h2>
        <h1 className="text-4xl font-bold mb-2">
          {userType === "clinic"
            ? "144,000"
            : userType === "doctor"
              ? "9,000"
              : "3,000"}{" "}
          CFA
        </h1>
        <h6 className="text-base mb-4">Pay for respective Account</h6>

        <div>
          <div className="text-xl font-semibold mb-2">Auto Pay</div>
          <div className="mb-2 text-sm">
            Auto Pay Enter Your Orange Money Number
          </div>
          <input
            type="text"
            placeholder="367290620"
            className="border p-2 rounded w-full mb-4"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <img
              src={ORANGE_MONEY_LOGO}
              alt="Orange Money"
              className="w-16 h-16 object-contain"
            />
            <div className="text-sm">
              <div>
                Account Name: <span className="font-medium">Track Sante</span>
              </div>
              <div>
                Account Number: <span className="font-medium">74696407</span>
              </div>
            </div>
          </div>
          <Button
            variant="success"
            size="md"
            fullWidth
            className="mt-3"
            onClick={handlePayNow}
            loading={isSubscribing}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default OrangePayModel;
