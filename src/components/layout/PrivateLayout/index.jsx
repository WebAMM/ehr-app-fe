import Sidebar from "./SideBar/Sidebar";
import "./SideBar/sidebar.css";
import Header from "./Header";
import { useAuthStorage } from "../../../hooks/useAuthStorage";
import { useState } from "react";
import clsx from "clsx";

export const PrivateLayout = ({ children }) => {
  const { getRole } = useAuthStorage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const HEADER_HEIGHT = 30;
  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      <div
        className={clsx(
          " min-w-72 lg:sticky top-0 h-screen z-50  lg:block transition-transform duration-300 ease-in-out",
          isSidebarOpen
            ? "max-lg:absolute left-0 top-0"
            : "hidden max-lg:-translate-x-full",
        )}
      >
        <Sidebar
          role={getRole()}
          isOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main
          className="flex-1 sidebar-content px-4 pt-4 max-lg:mt-12"
          style={{ paddingTop: HEADER_HEIGHT }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
