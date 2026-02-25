import React from "react";
import Card from "@/components/ui/Card";
import { useGetDoctorByIdQuery } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
const StatusPill = ({ status }) => {
  const styles =
    status === "Receiving"
      ? "bg-secondary/10 text-secondary"
      : "bg-blue/10 text-blue";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles}`}
    >
      {status}
    </span>
  );
};

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-6 text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="text-text text-right wrap-break-word">{value}</span>
  </div>
);

const DoctorSettingsBillingHistory = () => {
  const { getUser } = authCookies;
  const doctorId = getUser()?._id;
  const {
    data: DoctorProfile,
    isLoading,
    isError,
  } = useGetDoctorByIdQuery({ doctorId });

  const receivingBalance = "25,000.40 CFA";

  const billingHistory = [
    {
      id: "b1",
      title: "Subscription",
      date: "1 September, 2024 at 11:30 PM",
      status: "Receiving",
      reference: "194571349",
      details: [
        { label: "Plan Payment Date", value: "New Payment" },
        { label: "Payment to", value: "DranMoney" },
        { label: "Account Name", value: "Edwar" },
        { label: "Account Number", value: "+33790206128" },
      ],
      amount: "3000 CFA",
    },
    {
      id: "b2",
      title: "Subscription",
      date: "1 September, 2024 at 11:30 PM",
      status: "Paid",
      reference: "15661147",
      details: [
        { label: "Plan Payment Date", value: "New Payment" },
        { label: "Payment to", value: "DranMoney" },
        { label: "Account Name", value: "Edwar" },
        { label: "Account Number", value: "+33790206128" },
      ],
      amount: "3000 CFA",
    },
  ];

  const receivingPayments = [
    {
      id: "p1",
      title: "In Safe Concravde",
      date: "1st September, 2024 at 11:30 PM",
      status: "Receiving",
      reference: "15651146",
      amount: "3000 CFA",
      lines: [
        { label: "Appointment ID", value: "" },
        { label: "Payment Method", value: "Cash" },
      ],
    },
    {
      id: "p2",
      title: "In Safe Concravde",
      date: "1st September, 2024 at 11:30 PM",
      status: "Receiving",
      reference: "15651147",
      amount: "3000 CFA",
      lines: [
        { label: "Appointment ID", value: "" },
        { label: "Payment Method", value: "Cash" },
      ],
    },
  ];

  return (
    <div className="w-full">
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="rounded-2xl bg-linear-to-r from-secondary to-primary p-5 text-white">
          <p className="text-sm opacity-90">Receiving Balance</p>
          <p className="mt-1 text-xl font-semibold">{receivingBalance}</p>
        </div>

        <Card parentClass="mt-8 rounded-xl" paddingClasses="lg">
          <h2 className="text-sm font-semibold text-text">Billing History</h2>

          <div className="mt-3 space-y-4">
            {billingHistory.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-border bg-bg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={item.status} />
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {item.reference}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600">
                      Billing Details
                    </p>
                    <div className="space-y-2">
                      {item.details.map((d) => (
                        <Row key={d.label} label={d.label} value={d.value} />
                      ))}
                    </div>
                  </div>

                  <div className="flex md:justify-end md:items-end">
                    <div className="mt-2 md:mt-0">
                      <p className="text-xs text-gray-600">Amount</p>
                      <p className="text-sm font-semibold text-secondary mt-1 text-right">
                        {item.amount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card parentClass="mt-8 rounded-xl" paddingClasses="lg">
          <h2 className="text-sm font-semibold text-text">
            Receiving Payments
          </h2>

          <div className="mt-3 space-y-4">
            {receivingPayments.map((p) => (
              <div
                key={p.id}
                className="rounded-2xl border border-border bg-bg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-text">{p.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{p.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={p.status} />
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {p.reference}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    {p.lines.map((line) => (
                      <Row
                        key={line.label}
                        label={line.label}
                        value={line.value || "-"}
                      />
                    ))}
                    <Row label="Amount" value={p.amount} />
                  </div>

                  <div className="flex md:justify-end md:items-end">
                    <p className="text-sm font-semibold text-secondary">
                      {p.amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default DoctorSettingsBillingHistory;
