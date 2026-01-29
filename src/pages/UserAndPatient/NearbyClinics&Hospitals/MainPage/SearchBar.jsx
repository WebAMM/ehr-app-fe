import React from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="Search clinics, hospitals, services..."
        className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
      />
    </div>
  );
};

export default SearchBar;
