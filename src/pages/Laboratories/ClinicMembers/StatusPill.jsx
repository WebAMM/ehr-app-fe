const StatusPill = ({ status }) => {
  const isOnLeave = status?.toLowerCase() === "on leave";
  return (
    <span
      className={
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium " +
        (isOnLeave
          ? "bg-warning/10 text-warning"
          : "bg-secondary/10 text-secondary")
      }
    >
      {status}
    </span>
  );
};

export default StatusPill;
