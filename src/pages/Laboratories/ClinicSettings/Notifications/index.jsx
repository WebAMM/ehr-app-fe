import React, { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ClinicSettingsNotifications = () => {
  const [items, setItems] = useState([]);
  const grouped = useMemo(() => {
    const groups = items.reduce((acc, n) => {
      acc[n.group] = acc[n.group] || [];
      acc[n.group].push(n);
      return acc;
    }, {});
    const groupOrder = ["Today", "Yesterday"];
    const sortedGroups = {};
    groupOrder.forEach((g) => {
      if (groups[g]) sortedGroups[g] = groups[g];
    });
    Object.keys(groups).forEach((g) => {
      if (!groupOrder.includes(g)) sortedGroups[g] = groups[g];
    });
    return sortedGroups;
  }, [items]);

  const allRead = items.length > 0 && items.every((n) => n.read);

  const markAllAsRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="w-full">
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Notifications</h2>
          <Button
            type="button"
            variant="link"
            size="sm"
            className="text-secondary font-medium"
            disabled={allRead}
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        </div>

        {items.length === 0 && (
          <div className="mt-5 text-center">
            <p className="text-primary">No notifications yet</p>
          </div>
        )}

        {items.length > 0 &&
          Object.keys(grouped).map((group) => (
            <div key={group} className="mt-5">
              <p className="text-sm font-medium text-primary">{group}</p>
              <div className="mt-3 space-y-3">
                {grouped[group].map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-2xl px-5 py-4 border border-transparent ${
                      n.read ? "bg-secondary/5" : "bg-secondary/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-text text-sm">
                          {n.title}
                        </p>
                        <p className="text-sm text-primary mt-1 wrap-break-word">
                          {n.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">
                        {n.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </Card>
    </div>
  );
};

export default ClinicSettingsNotifications;
