import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../ui/Modal";
import { IMAGES } from "../../../../assets/images";

import { roleToFlow, sidebarMenus } from "./sidebarData";
import { PanelRightOpen } from "lucide-react";

const useOptionalLocation = () => {
  try {
    return useLocation();
  } catch {
    return null;
  }
};
const Sidebar = ({
  role = "patient",
  upgradeHref = "/upgrade",
  setIsSidebarOpen,
}) => {
  const safeLocation = useOptionalLocation();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const currentPath =
    safeLocation?.pathname ||
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const normalizedRole = useMemo(
    () => roleToFlow[role?.toLowerCase?.()] || "patient",
    [role],
  );
  const menu = sidebarMenus[normalizedRole] || sidebarMenus.patient;

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("persist:root");
    navigate("/");
    setIsLogoutModalOpen(false);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <>
      <aside className="bg-linear-to-t from-primary z-50  to-secondary text-text-light flex flex-col py-6 px-4.5 shadow-[0_14px_40px_rgba(0,0,0,0.22)] relative   md:rounded-b-[22px] max-lg:absolute">
        <div className="flex items-center lg:justify-center justify-between p-2.5 pb-4 border-b border-[rgba(255,255,255,0.14)]">
          {IMAGES?.LOGO2 || IMAGES?.LOGO ? (
            <img
              src={IMAGES.LOGO2 || IMAGES.LOGO}
              alt="Brand logo"
              s
              className="w-16 h-16 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
            />
          ) : (
            <div
              className="w-7 h-7 rounded-[10px] inline-flex items-center justify-center bg-[rgba(255,255,255,0.1)] text-inherit"
              aria-hidden
            >
              <span>◆</span>
            </div>
          )}
          <div
            className="bg-primary p-2 rounded-md text-text-text lg:hidden cursor-pointer hover:bg-primary/80 transition"
            onClick={() => setIsSidebarOpen(false)}
          >
            <PanelRightOpen />
          </div>
        </div>

        <nav
          className="flex flex-col gap-2 py-4.5 pb-3 flex-1"
          aria-label="Primary"
        >
          {menu.map((item) => {
            const Icon = item.icon;
            const active =
              currentPath === item.to || currentPath.startsWith(`${item.to}/`);
            const isLogout = item.label === "Logout";

            if (isLogout) {
              return (
                <button
                  key={item.label}
                  onClick={handleLogout}
                  className={`flex items-center gap-3 p-2.5 px-3 text-text-light rounded-xl no-underline transition-all duration-150 border border-transparent hover:bg-[rgba(255,255,255,0.16)] hover:translate-x-0.5 bg-transparent w-full text-left`}
                >
                  <span className="w-7 h-7 rounded-[10px] inline-flex items-center justify-center bg-[rgba(255,255,255,0.1)] text-inherit">
                    <Icon size={16} />
                  </span>
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            }

            return (
              <Link
                onClick={() => setIsSidebarOpen(false)}
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 p-2.5 px-3 text-text-light rounded-xl no-underline transition-all duration-150 border border-transparent hover:bg-[rgba(255,255,255,0.16)] hover:translate-x-0.5 ${
                  active
                    ? "bg-primary-dark/80 border-[rgba(255,255,255,0.14)] text-text-light font-semibold"
                    : ""
                }`}
              >
                <span className="w-7 h-7 rounded-[10px] inline-flex items-center justify-center bg-[rgba(255,255,255,0.1)] text-inherit">
                  <Icon size={16} />
                </span>
                <span className="text-sm">{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto bg-[rgba(255,255,255,0.16)] px-2 py-0.5 rounded-full text-xs text-text-light">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div
          className="mt-3 p-3.5 px-3 rounded-[14px] bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.22)] flex flex-col gap-2.5"
          role="complementary"
          aria-label="Upgrade"
        >
          <div className="font-semibold text-[15px]">Upgrade to Pro</div>
          <Link
            className="p-2.5 px-3 text-center rounded-xl bg-secondary text-text-light font-semibold shadow-[0_8px_22px_rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(0,0,0,0.22)] active:translate-y-0"
            to={upgradeHref}
          >
            Upgrade
          </Link>
          <div className="text-xs text-text-light opacity-70 text-center">
            Unlock premium features
          </div>
        </div>
      </aside>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        title="Are you sure?"
        showButtons={true}
        primaryButton={{ text: "Yes, Logout", onClick: confirmLogout }}
        secondaryButton={{ text: "Cancel", onClick: closeLogoutModal }}
      >
        You won't be able to revert this!
      </Modal>
    </>
  );
};

export default Sidebar;
