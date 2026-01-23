import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../../../../assets/images";

import "./sidebar.css";
import { roleToFlow, sidebarMenus } from "./sidebarData";

const useOptionalLocation = () => {
  try {
    return useLocation();
  } catch (error) {
    return null;
  }
};

const Sidebar = ({ role = "patient", upgradeHref = "/upgrade" }) => {
  const safeLocation = useOptionalLocation();
  const currentPath =
    safeLocation?.pathname ||
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const normalizedRole = useMemo(
    () => roleToFlow[role?.toLowerCase?.()] || "patient",
    [role],
  );
  const menu = sidebarMenus[normalizedRole] || sidebarMenus.patient;

  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        {IMAGES?.LOGO2 || IMAGES?.LOGO ? (
          <img src={IMAGES.LOGO2 || IMAGES.LOGO} alt="Brand logo" />
        ) : (
          <div className="sidebar__icon" aria-hidden>
            <span>◆</span>
          </div>
        )}
        <div className="sidebar__brand">
          <span className="sidebar__brandTitle">Track Safe</span>
          <span className="sidebar__brandSubtitle">Health</span>
        </div>
      </div>

      <nav className="sidebar__menu" aria-label="Primary">
        {menu.map((item) => {
          const Icon = item.icon;
          const active =
            currentPath === item.to || currentPath.startsWith(`${item.to}/`);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`sidebar__item ${active ? "is-active" : ""}`}
            >
              <span className="sidebar__icon">
                <Icon size={16} />
              </span>
              <span className="sidebar__label">{item.label}</span>
              {item.badge ? (
                <span className="sidebar__badge">{item.badge}</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar__cta" role="complementary" aria-label="Upgrade">
        <div className="sidebar__ctaTitle">Upgrade to Pro</div>
        <Link className="sidebar__ctaButton" to={upgradeHref}>
          Upgrade
        </Link>
        <div className="sidebar__footerText">Unlock premium features</div>
      </div>
    </aside>
  );
};

export default Sidebar;
