import React from "react";
import Card from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Male", value: 60, color: "#10B981" }, // green
  { name: "Female", value: 40, color: "#FACC15" }, // yellow
  { name: "Child", value: 30, color: "#EC4899" }, // pink
];

const GenderChart = () => {
  return (
    <Card padding="md" shadow="sm" className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text">Gender</h3>
        <span className="text-sm text-gray-400">Last 7 days</span>
      </div>

      {/* Chart */}
      <div className="flex justify-center">
        <div className="w-48 h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></span>
              <span className="text-text">{item.name}</span>
            </div>
            <span className="text-text font-medium">{item.value}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default GenderChart;
