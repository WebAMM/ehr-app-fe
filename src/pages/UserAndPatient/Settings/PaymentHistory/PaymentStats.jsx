import React from "react";
import Card from "@/components/ui/Card";

const PaymentStats = ({ payments }) => {
  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card title="Total Spent">
        <p className="text-2xl font-bold">{totalSpent.toLocaleString()} FCFA</p>
      </Card>
      <Card title="Completed">
        <p className="text-2xl font-bold text-green-600">
          {payments.filter((p) => p.status === "completed").length}
        </p>
      </Card>
      <Card title="This Month">
        <p className="text-2xl font-bold text-secondary">2</p>
      </Card>
    </div>
  );
};

export default PaymentStats;
