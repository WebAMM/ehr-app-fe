import React from "react";
import Card from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  useDoctorDemographicsQuery,
  useGetClinicDemographicsQuery,
} from "@/services";
import { authCookies } from "@/utils/cookieUtils";

import { LoaderCenter } from "@/components/ui/Loader";
import Error from "@/components/ui/Error";

const COLORS = {
  Male: "#10B981",
  Female: "#FACC15",
  Other: "#EC4899",
};

const GenderChart = () => {
  const { getUser } = authCookies;
  const Id = getUser()?._id;
  const role = getUser()?.status;
  const doctorQuery = useDoctorDemographicsQuery(
    { id: Id },
    { skip: role !== "doctor" },
  );

  const clinicQuery = useGetClinicDemographicsQuery(
    { id: Id },
    { skip: role !== "clinic" },
  );

  const isDoctor = role === "doctor";
  const { data, isLoading, isError, error, refetch } = isDoctor
    ? doctorQuery
    : clinicQuery;

  const demographicsData = data;

  const chartData = React.useMemo(() => {
    if (!demographicsData?.data || !Array.isArray(demographicsData.data)) {
      return [];
    }
    return demographicsData.data
      .filter((item) => item.gender)
      .map((item) => ({
        name: item.gender,
        value: item.total,
        color: COLORS[item.gender] || "#9CA3AF",
        total: item.total,
        percentage: parseFloat(item.percentage),
      }));
  }, [demographicsData]);

  return (
    <Card padding="md" shadow="sm" className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-text">Gender</h3>
        <span className="text-sm text-gray-400">Last 7 days</span>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoaderCenter />
        </div>
      ) : isError ? (
        <Error
          message={error?.message || "Failed to load demographic data"}
          refetch={refetch}
        />
      ) : chartData.length === 0 ? (
        <div className="flex items-center justify-center py-12 text-text opacity-60">
          <p className="text-sm">No demographic data available</p>
        </div>
      ) : (
        <>
          <div className="flex justify-center">
            <div className="w-48 h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={chartData.filter((item) => item.total > 0)}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {chartData
                      .filter((item) => item.total > 0)
                      .map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-3">
            {chartData.map((item, index) => (
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
                <span
                  className={`text-text font-medium ${item.total === 0 ? "opacity-50" : ""}`}
                >
                  {item.percentage.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default GenderChart;
