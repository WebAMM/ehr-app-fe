import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ToggleTabs from "@/components/common/ToggleTabs";
import { authCookies } from "@/utils/cookieUtils";
import {
  useGetClinicBillingHistoryQuery,
  useGetClinicReceivedPaymentsQuery,
} from "@/services";
import Error from "@/components/ui/Error";
import { LoaderCenter } from "@/components/ui/Loader";

const StatusBadge = ({ status }) => {
  const colors = {
    paid: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    approved: "bg-green-100 text-green-700",
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
  const [activeTab, setActiveTab] = useState("Billing History");
  const { getUser } = authCookies;
  const clinicId = getUser()?._id;

  const {
    data: receivedPayments,
    isLoading: isLoadingReceivedPayments,
    error: errorReceivedPayments,
    refetch: refetchReceivedPayments,
  } = useGetClinicReceivedPaymentsQuery({ clinicId });

  const {
    data: billingHistory,
    isLoading: isLoadingBillingHistory,
    error: errorBillingHistory,
    refetch: refetchBillingHistory,
  } = useGetClinicBillingHistoryQuery({ clinicId });
  const error =
    activeTab === "Billing History"
      ? errorBillingHistory
      : errorReceivedPayments;
  const isLoading =
    activeTab === "Billing History"
      ? isLoadingBillingHistory
      : isLoadingReceivedPayments;
  const handleRetry = () => {
    if (activeTab === "Billing History") {
      refetchBillingHistory();
    } else {
      refetchReceivedPayments();
    }
  };

  const formattedBillingHistory =
    billingHistory?.data?.payments?.map((item) => ({
      id: item.appointmentId,
      description: ` ${item.appointmentId}`,
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      amount: item.subscription,
      paymentMethod: item.accountDetails?.paymentMethod || "N/A",
      status: item.status,
    })) || [];

  const formattedReceivedPayments =
    receivedPayments?.data?.approvedPayments?.map((item) => ({
      id: item.appointmentId,
      description: `${item.claimRequestId}`,
      date: new Date(item.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      amount: item.amountPaid,
      paymentMethod: item.paymentMethod || "N/A",
      status: item.status,
    })) || [];

  const items =
    activeTab === "Billing History"
      ? formattedBillingHistory
      : formattedReceivedPayments;

  const tabs = ["Billing History", "Received Payments"];

  return (
    <div className="w-full">
      <Card title="Payments" padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="mb-6">
          <ToggleTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {isLoading ? (
          <LoaderCenter />
        ) : error ? (
          <Error error={error} refetch={handleRetry} />
        ) : items.length === 0 ? (
          <div className="py-10 text-center text-gray-400">
            No {activeTab.toLowerCase()} records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-gray-500">
                  <th className="pb-3 pr-4">Billing Id </th>
                  <th className="pb-3 pr-4">Payment Method</th>
                  <th className="pb-3 pr-4">Date</th>
                  <th className="pb-3 pr-4">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items?.map((item) => (
                  <tr key={item.id} className="py-3">
                    <td className="py-3 pr-4 text-text">{item.description}</td>
                    <td className="py-3 pr-4 text-text capitalize">
                      {item.paymentMethod || "N/A"}
                    </td>
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
