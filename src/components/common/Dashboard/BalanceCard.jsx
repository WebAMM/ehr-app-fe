import React from "react";
import Error from "@/components/ui/Error";
import {
  useGetClinicPaymentsQuery,
  useGetDoctorPaymentsQuery,
} from "@/services";
import { authCookies } from "@/utils/cookieUtils";
const BalanceCardSkeleton = () => (
  <div className="bg-linear-to-r from-secondary to-emerald-600 rounded-xl p-6 text-white shadow-md animate-pulse">
    <div className="h-4 w-32 bg-white/20 rounded mb-4"></div>
    <div className="h-8 w-48 bg-white/20 rounded mt-2 mb-6"></div>
    <div className="bg-white/10 rounded-lg p-4">
      <div className="h-4 w-full bg-white/20 rounded mb-2"></div>
      <div className="h-3 w-24 bg-white/20 rounded mt-4"></div>
    </div>
    <div className="h-10 bg-white/20 rounded mt-4"></div>
  </div>
);
const BalanceCard = () => {
  const { getUser } = authCookies;
  const role = getUser()?.status;
  const doctorQuery = useGetDoctorPaymentsQuery(
    { id: getUser()?._id },
    { skip: role !== "doctor" },
  );
  const clinicQuery = useGetClinicPaymentsQuery(
    { id: getUser()?._id },
    { skip: role !== "clinic" },
  );
  const isDoctor = role === "doctor";
  const { data, isLoading, error, refetch } = isDoctor
    ? doctorQuery
    : clinicQuery;

  if (isLoading) {
    return <BalanceCardSkeleton />;
  }
  if (error) {
    return (
      <div className="bg-linear-to-r from-secondary to-emerald-600 rounded-xl p-6 shadow-md">
        <Error
          message={error?.message || "Failed to load balance information"}
          refetch={refetch}
        />
      </div>
    );
  }
  const totalPayments = isDoctor
    ? data?.data?.totalPayments || "0.00"
    : data?.data?.totalAmount || "0.00";
  const secondaryMetric = isDoctor
    ? data?.data?.subscriptionsCount || 0
    : data?.data?.approvedPercentage || 0;

  return (
    <div className="bg-linear-to-r from-secondary to-emerald-600 rounded-xl p-6 text-white shadow-md">
      <p className="text-sm opacity-80">
        {isDoctor ? "Receiving Balance" : "Total Amount"}
      </p>

      <h2 className="text-3xl font-bold mt-2">
        {isDoctor ? `${totalPayments} CFA` : `${totalPayments}%`}
      </h2>

      <div className="bg-white/10 rounded-lg p-4 mt-6">
        <p className="text-sm">
          {isDoctor ? (
            secondaryMetric === 0 ? (
              "No new subscriptions yet. Start promoting to get new customers! "
            ) : secondaryMetric === 1 ? (
              "Welcome 1 new subscription with a personal message "
            ) : (
              `Welcome ${secondaryMetric} new subscriptions with a personal message `
            )
          ) : (
            <>
              {secondaryMetric === 0
                ? "No approved transactions yet. Optimize your services! "
                : `${secondaryMetric}% of transactions approved successfully! `}
            </>
          )}
        </p>
        <p className="text-xs opacity-80 mt-2">Last 7 days</p>
      </div>
    </div>
  );
};

export default BalanceCard;
