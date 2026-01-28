import Sidebar from "./SideBar/Sidebar";
import "./SideBar/sidebar.css";
import Header from "./Header";
import { useAuthStorage } from "../../../hooks/useAuthStorage";

export const PrivateLayout = ({ children }) => {
  const { getRole } = useAuthStorage();

  const HEADER_HEIGHT = 30;
  return (
    <div className="flex min-h-screen bg-[#f6f8fb]">
      <div className="max-w-96 sticky top-0 h-screen">
        <Sidebar role={getRole()} />
      </div>

      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        <main
          className="flex-1 sidebar-content px-4 pt-4"
          style={{ paddingTop: HEADER_HEIGHT }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
