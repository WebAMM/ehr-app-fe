import React, { useMemo, useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import {
  useGetClinicNotificationsQuery,
  useGetDoctorNotificationsQuery,
  useMarkNotificationsAsReadMutation,
  useRemoveNotificationMutation,
} from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import { formatTimeAgo } from "@/utils/formatTimeAgo";
import { getGroupName } from "@/utils/getGroupName";
import { toastError, toastSuccess } from "@/components/ui/Toast";

const Notifications = () => {
  const { getUser } = authCookies;
  const user = getUser();
  const userId = user?._id;
  const userStatus = user?.status;
  const isDoctor = userStatus === "doctor";

  const {
    data: doctorApiData,
    isLoading: isDoctorLoading,
    isError: isDoctorError,
    error: doctorError,
    refetch: refetchDoctorNotifications,
  } = useGetDoctorNotificationsQuery({ doctorId: userId }, { skip: !isDoctor });

  const {
    data: clinicApiData,
    isLoading: isClinicLoading,
    isError: isClinicError,
    error: clinicError,
    refetch: refetchClinicNotifications,
  } = useGetClinicNotificationsQuery({ clinicId: userId }, { skip: isDoctor });
  const [updateNotifications, { isLoading: isUpdatingNotifications }] =
    useMarkNotificationsAsReadMutation();
  const [removeNotification, { isLoading: isRemovingNotification }] =
    useRemoveNotificationMutation();
  const { apiData, isLoading, isError, error, refetch } = isDoctor
    ? {
        apiData: doctorApiData,
        isLoading: isDoctorLoading,
        isError: isDoctorError,
        error: doctorError,
        refetch: refetchDoctorNotifications,
      }
    : {
        apiData: clinicApiData,
        isLoading: isClinicLoading,
        isError: isClinicError,
        error: clinicError,
        refetch: refetchClinicNotifications,
      };

  const [items, setItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
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

  const markAsRead = async (id) => {
    setLoadingId(id);
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );

    try {
      const response = await updateNotifications({ id }).unwrap();
      if (response) {
        toastSuccess(response.message || "Notification marked as read!");
        refetch();
      }
    } catch (error) {
      toastError(
        error?.data?.message ||
          "Failed to mark notification as read. Please try again.",
      );
    } finally {
      setLoadingId(null);
    }
  };

  const deleteNotification = async (id) => {
    setDeletingId(id);
    try {
      const response = await removeNotification({ id }).unwrap();
      if (response) {
        toastSuccess(response.message || "Notification deleted!");
        setItems((prev) => prev.filter((n) => n.id !== id));
        refetch();
      }
    } catch (error) {
      toastError(
        error?.data?.message ||
          "Failed to delete notification. Please try again.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full">
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text">Notifications</h2>
        </div>

        {isLoading && (
          <div className="mt-5 text-center">
            <p className="text-primary">Loading notifications...</p>
          </div>
        )}

        {isError && (
          <div className="mt-5 text-center">
            <p className="text-red-500">
              {error?.data?.message || "Failed to load notifications"}
            </p>
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="mt-5 text-center">
            <p className="text-primary">No notifications yet</p>
          </div>
        )}

        {!isLoading &&
          !isError &&
          items?.length > 0 &&
          Object?.keys(grouped)?.map((group) => (
            <div key={group} className="mt-5">
              <p className="text-sm font-medium text-primary">{group}</p>

              <div className="mt-3 space-y-3">
                {grouped[group]?.map((n) => (
                  <div
                    key={n.id}
                    className={`rounded-2xl px-5 py-4 border border-transparent transition-opacity ${
                      n.read ? "bg-secondary/5" : "bg-secondary/10"
                    } ${loadingId === n.id || deletingId === n.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    onClick={() =>
                      !n.read &&
                      loadingId !== n.id &&
                      deletingId !== n.id &&
                      markAsRead(n.id)
                    }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-semibold text-text text-sm">
                          {n?.title}
                        </p>
                        <p className="text-sm text-primary mt-1 wrap-break-word">
                          {n?.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        <span className="text-xs text-primary/70">
                          {loadingId === n.id ? "Loading..." : n?.time}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(n.id);
                          }}
                          disabled={
                            deletingId === n.id || isRemovingNotification
                          }
                          className="p-1 text-primary/70 hover:text-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Delete notification"
                        >
                          {deletingId === n.id ? (
                            <svg
                              className="w-5 h-5 animate-spin"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          )}
                        </button>
                      </div>
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

export default Notifications;
