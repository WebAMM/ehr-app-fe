import React from "react";
import { Search } from "lucide-react";
import Card from "@/components/ui/Card";

const FaqSearch = ({ search, setSearch }) => {
  return (
    <Card>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text opacity-50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for help..."
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </Card>
  );
};

export default FaqSearch;
