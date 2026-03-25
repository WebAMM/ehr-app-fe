import { ORANGE_MONEY_LOGO } from "@/assets/images";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import React from "react";

const PaymentWithOrange = ({
  isOpen,
  onClose,
  accountNumber,
  setAccountNumber,
  handlePayNow,
  isSubscribing,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div>
        <h2 className="text-xl font-semibold mb-2">Please Submit Your</h2>

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

export default PaymentWithOrange;
