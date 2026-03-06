import React from "react";
import Card from "@/components/ui/Card";

const StatusBadge = ({ status }) => {
  const colors = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
        colors[status?.toLowerCase()] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
};

const ClinicSettingsBilling = () => {
  // placeholder — wire up real billing API when available
  const billingItems = [];

  return (
    <div className="w-full">
      <Card
        title="Billing History"
        padding="lg"
        shadow="sm"
        parentClass="rounded-2xl"
      >
        {billingItems.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            No billing records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-gray-500">
                  <th className="pb-3 pr-4">Description</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {billingItems.map((item) => (
                  <tr key={item.id} className="py-3">
                    <td className="py-3 pr-4 text-text">{item.description}</td>
                    <td className="py-3 pr-4 text-gray-500">{item.date}</td>
                    <td className="py-3 pr-4 text-text font-medium">
                      {item.amount}
                    </td>
                    <td className="py-3">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClinicSettingsBilling;
