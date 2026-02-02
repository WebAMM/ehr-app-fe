import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Clock, Home, MapPin, Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const labs = [
  {
    name: "MediQ Diagnostics",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    distance: "1.8 km",
    time: "12 min",
    rating: 4.9,
    reviews: 145,
    address: "Dakar Health Plaza, 3rd Floor",
    hours: "7:00 AM - 9:00 PM",
    tests: ["Blood Tests", "X-Ray", "Ultrasound"],
    price: "From 5,000 CFA",
    status: "Available Today",
    homeService: true,
  },
  {
    name: "QuickTest Laboratory",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118",
    distance: "2.3 km",
    time: "15 min",
    rating: 4.7,
    reviews: 98,
    address: "Central Medical Center",
    hours: "6:00 AM - 10:00 PM",
    tests: ["Blood Tests", "Pathology", "COVID-19"],
    price: "From 3,000 CFA",
    status: "Available Today",
    homeService: true,
  },
  {
    name: "Advanced Imaging Center",
    image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322",
    distance: "4.1 km",
    time: "22 min",
    rating: 5.0,
    reviews: 67,
    address: "Healthcare Innovation District",
    hours: "8:00 AM - 6:00 PM",
    tests: ["CT Scan", "MRI", "PET Scan"],
    price: "From 15,000 CFA",
    status: "Booking Required",
    homeService: false,
  },
];

const LabsSection = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentLab, setCurrentLab] = useState(null);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm text-text opacity-70">
          {labs.length} laboratories found near you
        </p>

        <Button variant="successOutline" size="sm" icon={FaMapMarkerAlt}>
          Use My Location
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {labs.map((lab, index) => (
          <Card key={index} hover padding="sm" className="space-y-3">
            {/* Image */}
            <div className="relative">
              <img
                src={lab.image}
                alt={lab.name}
                className="h-60 w-full object-cover rounded-lg"
              />

              {lab.homeService && (
                <span className="absolute top-2 left-2 text-xs bg-secondary  text-text-light px-2 py-1 rounded-full flex items-center gap-1">
                  <Home size={16} /> <span>Home Service</span>
                </span>
              )}

              <span className="absolute bottom-2 left-2 text-xs bg-bg/90 px-2 py-1 rounded flex items-center gap-1">
                <FaMapMarkerAlt className="text-secondary" />
                {lab.distance} • {lab.time}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-text">{lab.name}</h4>

              <p className="text-xs text-text opacity-70">
                ⭐ {lab.rating} ({lab.reviews} reviews)
              </p>

              <p className="text-xs text-text opacity-70 flex items-center gap-1    ">
                <MapPin size={16} /> <span>{lab.address}</span>
              </p>

              <p className="text-xs text-text opacity-70 flex items-center gap-1">
                <Clock size={16} /> <span>{lab.hours}</span>
              </p>
            </div>
            <span className="text-sm font-semibold text-text">
              Available Tests:
            </span>
            <div className="flex flex-wrap gap-2">
              {lab.tests.slice(0, 3).map((test, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-text/70 px-2 py-1 rounded"
                >
                  {test}
                </span>
              ))}
              {lab.tests.length > 3 && (
                <span className="text-xs text-secondary">
                  +{lab.tests.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-text opacity-60">Starting from</p>
                <p className="text-sm font-semibold text-text">{lab.price}</p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  lab.status === "Available Today"
                    ? "bg-green-100 text-green-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {lab.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                fullWidth
                size="md"
                // icon={<Calendar size={16} />}
              >
                Book Test
              </Button>
              <div
                className="border rounded-lg p-2 cursor-pointer border-secondary/60 hover:bg-secondary/10 transition"
                onClick={() => {
                  setCurrentLab(lab);
                  setShowCalendar(true);
                }}
              >
                <Calendar size={18} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showCalendar && (
        <Modal
          isOpen={showCalendar}
          onClose={() => setShowCalendar(false)}
          title={`Select Date & Time for ${currentLab?.name}`}
          size="lg"
          className="bg-bg border-2 border-primary/20 shadow-2xl"
        >
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setShowCalendar(false);
              console.log("Booking for", currentLab?.name, "on", date);
            }}
            inline
            showTimeSelect
            timeIntervals={15}
            dateFormat="Pp"
          />
        </Modal>
      )}
    </>
  );
};

export default LabsSection;
