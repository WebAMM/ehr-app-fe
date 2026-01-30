import React from "react";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

const SearchAndFilter = ({
  searchQuery,
  setSearchQuery,
  filters,
  activeFilter,
  setActiveFilter,
}) => {
  return (
    <div className="space-y-4 bg-bg p-4 rounded-xl shadow-sm backdrop-blur-2xl border border-border">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search clinics, hospitals, services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <Button
            key={item}
            variant={activeFilter === item ? "secondary" : "grayOutline"}
            size="sm"
            onClick={() => setActiveFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchAndFilter;
