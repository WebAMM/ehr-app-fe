import React from "react";

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

const PaymentCard = ({ item }) => {
  return (
    <div key={item.id} className="rounded-2xl border border-border bg-bg p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-text">{item.title}</p>
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
          {item.lines.map((line) => (
            <Row
              key={line.label}
              label={line.label}
              value={line.value || "-"}
            />
          ))}
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
  );
};

export default PaymentCard;
