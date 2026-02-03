import React from "react";
import Card from "@/components/ui/Card";
import { FaSearch } from "react-icons/fa";

const SearchSection = () => {
  return (
    <Card padding="md">
      <div className="flex items-center gap-3 border border-border rounded-lg px-4 py-2">
        <FaSearch className="text-text opacity-50" />
        <input
          type="text"
          placeholder="Search clinics, hospitals, services..."
          className="flex-1 bg-transparent outline-none text-sm text-text"
        />
      </div>
    </Card>
  );
};

export default SearchSection;
