import React from "react";
import clsx from "clsx";

const ToggleTabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-6 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={clsx(
            "pb-3 text-sm font-medium transition relative cursor-pointer",
            activeTab === tab
              ? "text-secondary after:absolute after:left-0 after:w-full after:bg-secondary underline-offset-1 after:bottom-0 after:h-0.5"
              : "text-text opacity-60 hover:opacity-100",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default ToggleTabs;
