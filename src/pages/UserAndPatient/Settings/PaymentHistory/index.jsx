import React, { useMemo, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";
import Icon from "@/components/ui/Icon";
import PaymentStats from "./PaymentStats";
import { CheckCircle2, XCircle, Clock, Search, FileDown } from "lucide-react";

const payments = [
  {
    id: 1,
    title: "Dr. Amadou Ndiaye - Cardiology Consultation",
    date: "Feb 8, 2026",
    method: "Orange Money",
    ref: "OM-2026020800123",
    amount: 15000,
    status: "completed",
  },
  {
    id: 2,
    title: "Standard Plan - Monthly Subscription",
    date: "Feb 1, 2026",
    method: "Orange Money",
    ref: "OM-2026020100456",
    amount: 5000,
    status: "completed",
  },
  {
    id: 3,
    title: "Lab Excellence - Complete Blood Count",
    date: "Jan 28, 2026",
    method: "Telecel Cash",
    ref: "TC-2026012800789",
    amount: 8000,
    status: "completed",
  },
  {
    id: 4,
    title: "Dr. Fatou Sarr - Pediatric Consultation",
    date: "Jan 25, 2026",
    method: "Orange Money",
    ref: "OM-2026012500234",
    amount: 12000,
    status: "completed",
  },
  {
    id: 5,
    title: "Pharmacy - Prescription Medications",
    date: "Jan 20, 2026",
    method: "Orange Money",
    ref: "OM-2026012000567",
    amount: 6500,
    status: "failed",
  },
  {
    id: 6,
    title: "Lab Excellence - Lipid Profile Test",
    date: "Jan 15, 2026",
    method: "Telecel Cash",
    ref: "TC-2026011500890",
    amount: 9500,
    status: "completed",
  },
];

const StatusBadge = ({ status }) => {
  const map = {
    completed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const StatusIcon = ({ status }) => {
  if (status === "completed") {
    return <Icon icon={CheckCircle2} iconClass="text-green-600" bg />;
  }
  if (status === "pending") {
    return <Icon icon={Clock} iconClass="text-yellow-600" bg />;
  }
  return <Icon icon={XCircle} iconClass="text-red-600" bg />;
};

const PaymentHistory = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.ref.toLowerCase().includes(search.toLowerCase());

      const matchFilter = filter === "all" || p.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-pageBackground">
      <StickyHeader linkTo="/settings" linkText="Back to Settings" />

      <div className="px-4 sm:px-6 lg:px-8 py-6">
        <PageHeader
          title="Payment History"
          subtitle="View all your transactions and payments"
        />

        <PaymentStats payments={payments} />

        <Card padding="md" parentClass="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-md border border-border bg-bg text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="flex gap-2">
              {["all", "completed", "pending", "failed"].map((key) => (
                <Button
                  key={key}
                  size="sm"
                  variant={filter === key ? "primary" : "grayOutline"}
                  onClick={() => setFilter(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="divide-y divide-border">
            {filteredPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-start gap-4">
                  <StatusIcon status={payment.status} />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{payment.title}</p>
                      <StatusBadge status={payment.status} />
                    </div>
                    <p className="text-sm opacity-70">
                      {payment.date} • {payment.method} • {payment.ref}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-semibold whitespace-nowrap">
                    {payment.amount.toLocaleString()} FCFA
                  </p>
                  <Button variant="grayOutline" size="sm" icon={FileDown}>
                    Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentHistory;
