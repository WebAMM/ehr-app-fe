import React from "react";
import Card from "@/components/ui/Card";
const TABS = [
  { name: "Upcoming", key: "pending" },
  { name: "Confirmed", key: "confirmed" },
  { name: "Completed", key: "completed" },
  { name: "Cancelled", key: "cancelled" },
];

const AppointmentFilters = ({ activeTab, setActiveTab, setSelectedDay }) => {
  return (
    <Card padding="sm" shadow="sm" className="space-y-4 " parentClass="w-full ">
      {/* <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder=""
            className="w-full bg-bg border border-border rounded-xl h-10 sm:h-12 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-secondary/20"
          />
        </div>

        <Button
          variant="grayOutline"
          size="md"
          icon={Filter}
          className="rounded-xl"
        >
          Filter
        </Button>
      </div> */}

      <div className="flex items-center gap-2 flex-wrap">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setActiveTab(tab.key);
                setSelectedDay();
              }}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors border ${
                isActive
                  ? "bg-secondary text-white border-secondary"
                  : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200"
              }`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default AppointmentFilters;
