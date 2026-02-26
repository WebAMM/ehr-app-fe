import React from "react";

const tabs = [
  { name: "Upcoming", key: "pending" },
  { name: "Confirmed", key: "confirmed" },
  { name: "Completed", key: "completed" },
  { name: "Cancelled", key: "cancelled" },
];

const AppointmentTabs = ({ activeTab, setActiveTab, setLimit }) => {
  const handleTabClick = (key) => {
    setActiveTab(key);
    setLimit(10);
  };
  return (
    <div className="bg-white border border-border rounded-xl p-1 flex w-full ">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleTabClick(tab.key)}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
            activeTab === tab.key
              ? "bg-secondary text-white shadow-sm "
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
