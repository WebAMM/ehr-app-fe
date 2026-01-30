import React from "react";

const StepperTabs = ({ active, onChange, tabs }) => {
  return (
    <div className="flex items-center justify-around gap-4 border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-2 text-sm font-medium transition cursor-pointer ${
            active === tab.id
              ? "text-secondary border-b-2 border-secondary"
              : "text-text opacity-60"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default StepperTabs;
