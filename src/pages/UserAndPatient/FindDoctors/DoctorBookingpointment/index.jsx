import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import clsx from "clsx";
import StickyHeader from "@/components/ui/StickyHeader";
import { TIME_CATEGORIES } from "./TimeCatagories";
import { useLocation } from "react-router-dom";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DoctorBookingAppointment() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [booking, setBooking] = useState({
    consultationType: "video",
    selectedDate: null,
    duration: 30,
    selectedTime: null,
  });

  const location = useLocation();
  console.log("Received doctor details:", location.state?.doctorDetails);

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  const updateBooking = (key, value) => {
    setBooking((prev) => ({ ...prev, [key]: value }));
  };
  const isFormComplete =
    booking.selectedDate && booking.selectedTime && booking.duration;
  return (
    <div className="min-h-screen bg-bg ">
      <StickyHeader
        linkTo="/doctor-details"
        linkText="Doctor Details"
        showFavorite={true}
        isFavorite={isFavorite}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
      />
      <div className="flex justify-start mt-2 sm:mt-4">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-5xl bg-white rounded-xl shadow-sm p-2 sm:p-4 lg:p-8 space-y-4 sm:space-y-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {["clinic", "video"].map((type) => (
              <button
                key={type}
                onClick={() => updateBooking("consultationType", type)}
                className={clsx(
                  "flex-1 py-1 sm:py-2 text-xs sm:text-sm font-medium rounded-md transition",
                  booking.consultationType === type
                    ? "bg-secondary text-white"
                    : "text-gray-500",
                )}
              >
                {type === "clinic"
                  ? "In-Clinic Consultation"
                  : "Video Consultation"}
              </button>
            ))}
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-medium mb-2">Select Date</h3>

            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <span className="text-secondary text-xs sm:text-sm font-medium">
                {currentMonth.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <div className="flex gap-2">
                <ChevronLeft
                  className="w-5 h-5 cursor-pointer text-secondary"
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                      ),
                    )
                  }
                />
                <ChevronRight
                  className="w-5 h-5 cursor-pointer text-secondary"
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                      ),
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-7 text-xs text-gray-400 mb-1 sm:mb-2">
              {WEEK_DAYS.map((day) => (
                <div key={day} className="text-center">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {Array(firstDayOfMonth)
                .fill(null)
                .map((_, i) => (
                  <div key={i} />
                ))}

              {Array(daysInMonth)
                .fill(null)
                .map((_, i) => {
                  const date = new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth(),
                    i + 1,
                  );
                  date.setHours(0, 0, 0, 0);
                  const isPast = date < today;
                  const isSelected =
                    booking.selectedDate &&
                    booking.selectedDate.toDateString() === date.toDateString();
                  return (
                    <button
                      key={i}
                      disabled={isPast}
                      onClick={() => updateBooking("selectedDate", date)}
                      className={clsx(
                        "h-8 sm:h-10 rounded-lg text-xs sm:text-sm transition",
                        isSelected && "bg-secondary text-white",
                        !isSelected &&
                          !isPast &&
                          "hover:bg-gray-100 text-gray-700",
                        isPast && "text-gray-300 cursor-not-allowed",
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
            </div>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium mb-2">
              Select Duration
            </h3>
            <div className="relative">
              <Clock className="absolute left-3 top-2 sm:top-3 w-4 h-4 text-secondary" />
              <select
                value={booking.duration}
                onChange={(e) =>
                  updateBooking("duration", Number(e.target.value))
                }
                className="w-full border rounded-lg py-1 sm:py-2 pl-9 pr-3 text-xs sm:text-sm"
              >
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-medium mb-2">Select Hour</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-2">
              {TIME_CATEGORIES?.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => updateBooking("selectedTime", slot.value)}
                  className={clsx(
                    "py-1 sm:py-2 rounded-lg text-xs sm:text-sm transition",
                    booking.selectedTime === slot.value
                      ? "bg-secondary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                  )}
                >
                  {slot.name}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!isFormComplete}
            className={clsx(
              "w-full py-2 sm:py-3 rounded-lg font-medium transition text-sm sm:text-base",
              isFormComplete
                ? "bg-secondary text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed",
            )}
            onClick={() => {
              console.log("Booking payload:", booking);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
