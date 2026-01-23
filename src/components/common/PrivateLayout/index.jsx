import React, { useMemo } from "react";
import Sidebar from "./SideBar/Sidebar";
import "./SideBar/sidebar.css";
import { roleToFlow } from "./SideBar/sidebarData";

export const PrivateLayout = ({ children }) => {
  const storedUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("dummy_user"));
    } catch (error) {
      return null;
    }
  }, []);

  const normalizedRole = useMemo(() => {
    const storedRole = storedUser?.role?.toLowerCase?.();
    return roleToFlow[storedRole] || "patient";
  }, [storedUser?.role]);

  return (
    <div className="sidebar-shell">
      <Sidebar role={normalizedRole} />
      <main className="sidebar-content">{children}</main>
    </div>
  );
};
