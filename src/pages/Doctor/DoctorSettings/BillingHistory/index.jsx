import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ToggleTabs from "@/components/common/ToggleTabs";
import { authCookies } from "@/utils/cookieUtils";
import {
  useDoctorBillingHistoryQuery,
  useDoctorReceivedPaymentsQuery,
} from "@/services";
import { TabContent } from "./TabContent";

const DoctorSettingsBillingHistory = () => {
  const { getUser } = authCookies;
  const doctorId = getUser()?._id;
  const [activeTab, setActiveTab] = useState("Receiving Payments");
  const [billingCurrentPage, setBillingCurrentPage] = useState(1);
  const [receivingCurrentPage, setReceivingCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const {
    data: billingData,
    isLoading: billingIsLoading,
    isError: billingIsError,
  } = useDoctorBillingHistoryQuery({
    id: doctorId,
    page: billingCurrentPage,
    limit: itemsPerPage,
  });

  const {
    data: doctorReceivedPaymentsData,
    isLoading: receivingIsLoading,
    isError: receivingIsError,
  } = useDoctorReceivedPaymentsQuery({
    id: doctorId,
    page: receivingCurrentPage,
    limit: itemsPerPage,
  });

  const receivingBalance = "25,000.40 CFA";

  const transformedPayments =
    billingData?.data?.payments?.map((payment) => ({
      id: payment.appointmentId,
      title: "Subscription",
      date: new Date(payment.createdAt).toLocaleString(),
      status: payment.status,
      reference: payment.appointmentId,
      amount: payment.subscription,
      lines: [
        { label: "Appointment ID", value: payment.appointmentId },
        {
          label: "Payment Method",
          value: payment.accountDetails?.paymentMethod || "-",
        },
      ],
    })) || [];

  const transformedReceivedPayments =
    doctorReceivedPaymentsData?.data?.approvedPayments?.map((payment) => ({
      id: payment.claimRequestId,
      title: "Approved Payment",
      date: new Date(payment.createdAt).toLocaleString(),
      status: payment.status,
      reference: payment.claimRequestId,
      amount: payment.amountPaid,
      lines: [
        { label: "Claim Request ID", value: payment.claimRequestId },
        {
          label: "Payment Method",
          value: payment.paymentMethod || "-",
        },
      ],
    })) || [];

  const tabs = {
    "Receiving Payments": {
      title: "Approved Payments",
      isLoading: receivingIsLoading,
      isError: receivingIsError,
      errorMessage: "Error loading received payments",
      items: transformedReceivedPayments,
      totalRecords: doctorReceivedPaymentsData?.data?.count || 0,
      currentPage: receivingCurrentPage,
      totalPages: doctorReceivedPaymentsData?.data?.pages || 1,
      onPrevious: () =>
        setReceivingCurrentPage(Math.max(1, receivingCurrentPage - 1)),
      onNext: () =>
        setReceivingCurrentPage(
          Math.min(
            doctorReceivedPaymentsData?.data?.pages || 1,
            receivingCurrentPage + 1,
          ),
        ),
    },
    "Billing History": {
      title: "Billing History",
      isLoading: billingIsLoading,
      isError: billingIsError,
      errorMessage: "Error loading billing history",
      items: transformedPayments,
      totalRecords: billingData?.data?.count || 0,
      currentPage: billingCurrentPage,
      totalPages: billingData?.data?.pages || 1,
      onPrevious: () =>
        setBillingCurrentPage(Math.max(1, billingCurrentPage - 1)),
      onNext: () =>
        setBillingCurrentPage(
          Math.min(billingData?.data?.pages || 1, billingCurrentPage + 1),
        ),
    },
  };

  const activeTabData = tabs[activeTab];

  return (
    <div className="w-full">
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        {/* <div className="rounded-2xl bg-linear-to-r from-secondary to-primary p-5 text-white">
          <p className="text-sm opacity-90">Receiving Balance</p>
          <p className="mt-1 text-xl font-semibold">{receivingBalance}</p>
        </div> */}

        {/* <Card parentClass="mt-8 rounded-xl" paddingClasses="lg"> */}
        <ToggleTabs
          tabs={["Receiving Payments", "Billing History"]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-6">
          <TabContent {...activeTabData} />
        </div>
        {/* </Card> */}
      </Card>
    </div>
  );
};

export default DoctorSettingsBillingHistory;
