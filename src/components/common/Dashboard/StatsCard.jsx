// StatsCard.jsx
import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const StatsCard = ({ icon, iconColor, bgColor, value, label, growth }) => {
  return (
    <Card padding="md" shadow="sm" className="space-y-3">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${bgColor}`}>{icon}</div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-text">{value}</h2>
        <p className="text-sm text-text opacity-70">{label}</p>
      </div>

      <p className="text-xs text-green-500 font-medium">↗ {growth} this week</p>
    </Card>
  );
};

export default StatsCard;
