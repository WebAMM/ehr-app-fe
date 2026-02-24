import React, { useState, useRef, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import CustomAvatar from "@/components/ui/Avatar";
import { Menu, Search, X } from "lucide-react";
import clsx from "clsx";
import { selectUser } from "@/redux";
import { useSelector } from "react-redux";
export default function Header({ isSidebarOpen, toggleSidebar }) {
  const notifications = [
    {
      id: 1,
      title: "Welcome!",
      message: "Thanks for joining our platform.",
      date: "Jan 25, 2026",
      time: "10:00 AM",
      isRead: false,
    },
    {
      id: 2,
      title: "Profile Updated",
      message: "Your profile information was updated.",
      date: "Jan 24, 2026",
      time: "3:45 PM",
      isRead: true,
    },
    {
      id: 3,
      title: "New Message",
      message: "You have received a new message.",
      date: "Jan 23, 2026",
      time: "8:15 AM",
      isRead: false,
    },
  ];
  const userProfile = useSelector(selectUser);
  const currentUser = userProfile;
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [handleSearch, setHandleSearch] = useState(false);
  const notificationRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return (
    <header className="absolute lg:relative top-0 left-0 right-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 ">
        <div className=" max-w-xs">
          <div className="lg:hidden p-2 rounded-md cursor-pointer flex items-center gap-3">
            <div onClick={toggleSidebar}>
              {isSidebarOpen ? <X /> : <Menu />}
            </div>
            <span onClick={() => setHandleSearch((prev) => !prev)}>
              <Search />
            </span>
          </div>

          <input
            type="text"
            placeholder="Search..."
            className={clsx(
              " px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent max-lg:absolute left-0 top-full mt-1 bg-pageBackground  lg:block",
              handleSearch ? "block mx-6" : "hidden",
            )}
          />
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative" ref={notificationRef}>
            <button
              className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
              onClick={() => setIsNotificationOpen((open) => !open)}
            >
              <FaBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            {isNotificationOpen && (
              <div className="absolute right-0 z-50 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg">
                <div className="flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-200">
                  <span>Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="px-4 py-2 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-sm text-center text-gray-500">
                      No notifications available
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-2 py-3 border-b border-gray-100 last:border-b-0 cursor-pointer my-1 rounded-md ${
                          !notification.isRead ? "bg-blue-50" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-xs text-gray-500">
                                {notification.date} at {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {currentUser?.attachDoc ? (
              <img
                src={currentUser?.attachDoc}
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <CustomAvatar
                name={currentUser?.fullName}
                size="48"
                round={true}
                bgColor="#C2184B"
                fgColor="#fff"
              />
            )}

            <div className="flex flex-col items-start ml-2">
              <span className="text-sm font-medium text-gray-900">
                {currentUser?.fullName || "User Name"}
              </span>
              <span className="text-xs text-gray-500">
                {currentUser?.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
