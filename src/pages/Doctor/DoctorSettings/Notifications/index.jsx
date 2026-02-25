import React, { useMemo, useState, useEffect } from "react";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useGetDoctorNotificationsQuery } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { getGroupName } from "@/utils/getGroupName";
const DoctorSettingsNotifications = () => {
  const { getUser } = authCookies;
  const doctorId = getUser()?._id;
  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetDoctorNotificationsQuery({
    doctorId: doctorId,
  });
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (apiData?.data && Array.isArray(apiData.data)) {
      const transformedItems = apiData.data.map((notification) => ({
        id: notification._id,
        title: notification.title,
        message: notification.body,
        time: formatTimeAgo(notification.createdAt),
        group: getGroupName(notification.createdAt),
        read: notification.isRead,
        createdAt: notification.createdAt,
      }));
      setItems(transformedItems);
    }
  }, [apiData]);

  const grouped = useMemo(() => {
    const groups = items.reduce((acc, n) => {
      acc[n.group] = acc[n.group] || [];
      acc[n.group].push(n);
      return acc;
    }, {});
    const groupOrder = ["Today", "Yesterday"];
    const sortedGroups = {};
    groupOrder.forEach((g) => {
      if (groups[g]) {
        sortedGroups[g] = groups[g];
      }
    });
    Object.keys(groups).forEach((g) => {
      if (!groupOrder.includes(g)) {
        sortedGroups[g] = groups[g];
      }
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

        {isLoading && (
          <div className="mt-5 text-center">
            <p className="text-primary">Loading notifications...</p>
          </div>
        )}

        {isError && (
          <div className="mt-5 text-center">
            <p className="text-red-500">Failed to load notifications</p>
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="mt-5 text-center">
            <p className="text-primary">No notifications yet</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          items.length > 0 &&
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
                      <span className="text-xs text-primary/70 whitespace-nowrap">
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

export default DoctorSettingsNotifications;
