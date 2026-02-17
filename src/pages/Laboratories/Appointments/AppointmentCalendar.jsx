import React from "react";
import Card from "@/components/ui/Card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const buildCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const leadingEmpty = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = lastDayOfMonth.getDate();

  const cells = [];
  for (let i = 0; i < leadingEmpty; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);

  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
};

const AppointmentCalendar = ({ monthDate, selectedDay, setSelectedDay }) => {
  const monthLabel = monthDate.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const calendarCells = buildCalendarDays(monthDate);

  return (
    <Card padding="md" shadow="sm" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">Calendar</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            type="button"
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border p-3">
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <div className="text-xs sm:text-sm font-medium text-text">
            {monthLabel}
          </div>
          <button
            type="button"
            className="w-8 h-8 grid place-items-center rounded-lg hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-[10px] sm:text-xs text-gray-500 mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
            <div key={d} className="text-center">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {calendarCells.map((day, idx) => {
            const isSelected = day === selectedDay;
            return (
              <button
                key={`${day ?? "e"}-${idx}`}
                type="button"
                disabled={!day}
                onClick={() => day && setSelectedDay(day)}
                className={`h-8 sm:h-9 rounded-lg text-[11px] sm:text-sm transition-colors ${
                  !day
                    ? "opacity-0"
                    : isSelected
                      ? "bg-secondary text-white"
                      : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {day ?? ""}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>Today</span>
          </div>
          <span>12</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Upcoming</span>
          </div>
          <span>7</span>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCalendar;
