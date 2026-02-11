import React from "react";

const tabs = ["Upcoming", "Completed", "Cancelled"];

const AppointmentTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border border-border rounded-xl p-1 flex w-full ">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === tab
              ? "bg-secondary text-white shadow-sm "
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
