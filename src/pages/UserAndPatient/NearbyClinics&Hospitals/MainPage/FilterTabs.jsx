import React from "react";
import Button from "@/components/ui/Button";

const filters = [
  "All",
  "General Hospital",
  "Multi-Specialty Clinic",
  "Specialist Center",
  "Diagnostic Center",
];

const FilterTabs = () => {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((item, index) => (
        <Button
          key={item}
          variant={index === 0 ? "secondary" : "grayOutline"}
          size="sm"
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default FilterTabs;
