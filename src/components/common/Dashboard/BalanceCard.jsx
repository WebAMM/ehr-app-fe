// BalanceCard.jsx
import React from "react";
import Button from "@/components/ui/Button";

const BalanceCard = () => {
  return (
    <div className="bg-linear-to-r from-secondary to-emerald-600 rounded-xl p-6 text-white shadow-md ">
      <p className="text-sm opacity-80">Receiving Balance</p>

      <h2 className="text-3xl font-bold mt-2">25,000.40 CFA</h2>

      <div className="bg-white/10 rounded-lg p-4 mt-6">
        <p className="text-sm">
          Welcome 18 new customers with a personal message 😊
        </p>
        <p className="text-xs opacity-80 mt-2">Last 7 days</p>
      </div>

      <Button variant="primary" fullWidth className="mt-4  ">
        Send message
      </Button>
    </div>
  );
};

export default BalanceCard;
