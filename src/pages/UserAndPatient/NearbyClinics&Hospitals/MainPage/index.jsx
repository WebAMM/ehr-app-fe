import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchAndFilter from "./SearchAndFilter";
import ClinicCard from "./ClinicCard";
import EmergencyBanner from "./EmergencyBanner";

const clinics = [
  {
    id: 1,
    name: "Sunrise Health Centers",
    type: "Multi-Specialty Clinic",
    rating: 5,
    distance: "2.5 km",
    time: "15 min",
    address: "J-17 Dark Street, Plateau",
    hours: "Mon–Fri: 8:00 AM – 8:00 PM",
    services: ["General Medicine", "Cardiology", "Pediatrics"],
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: 2,
    name: "Golden Cardio Center",
    type: "Cardiology Specialist",
    rating: 4.8,
    distance: "3.8 km",
    time: "20 min",
    address: "Main St, Medical District",
    hours: "Mon–Sat: 9:00 AM – 6:00 PM",
    services: ["Cardiology", "ECG", "Cardiac Surgery"],
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: 3,
    name: "City General Hospital",
    type: "General Hospital",
    rating: 4.9,
    distance: "1.2 km",
    time: "10 min",
    address: "123 Health Ave, Downtown",
    hours: "24/7",
    services: ["Emergency", "Surgery", "Internal Medicine"],
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: 4,
    name: "Wellness Diagnostic Center",
    type: "Diagnostic Center",
    rating: 4.7,
    distance: "4.5 km",
    time: "25 min",
    address: "456 Lab Road, Tech Park",
    hours: "Mon–Sun: 7:00 AM – 9:00 PM",
    services: ["MRI", "X-Ray", "Blood Tests"],
    image: "https://picsum.photos/300/200?random=4",
  },
  {
    id: 5,
    name: "Pediatric Care Clinic",
    type: "Specialist Center",
    rating: 4.6,
    distance: "2.1 km",
    time: "12 min",
    address: "789 Kids Lane, Family District",
    hours: "Mon–Fri: 9:00 AM – 7:00 PM",
    services: ["Pediatrics", "Vaccinations", "Child Psychology"],
    image: "https://picsum.photos/300/200?random=5",
  },
  {
    id: 6,
    name: "Orthopedic Excellence",
    type: "Specialist Center",
    rating: 4.8,
    distance: "5.0 km",
    time: "30 min",
    address: "101 Bone St, Sports Area",
    hours: "Mon–Sat: 8:00 AM – 6:00 PM",
    services: ["Orthopedics", "Physical Therapy", "Sports Medicine"],
    image: "https://picsum.photos/300/200?random=6",
  },
  {
    id: 7,
    name: "Dental Health Hub",
    type: "Multi-Specialty Clinic",
    rating: 4.5,
    distance: "3.2 km",
    time: "18 min",
    address: "202 Smile Blvd, Central Plaza",
    hours: "Mon–Fri: 10:00 AM – 8:00 PM",
    services: ["Dentistry", "Oral Surgery", "Cosmetic Dentistry"],
    image: "https://picsum.photos/300/200?random=7",
  },
  {
    id: 8,
    name: "Mental Health Center",
    type: "Specialist Center",
    rating: 4.9,
    distance: "2.8 km",
    time: "16 min",
    address: "303 Mind Way, Wellness Park",
    hours: "Mon–Fri: 9:00 AM – 5:00 PM",
    services: ["Psychiatry", "Counseling", "Therapy"],
    image: "https://picsum.photos/300/200?random=8",
  },
];

const NearbyClinicsAndHospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [filters] = useState([
    "All",
    "General Hospital",
    "Multi-Specialty Clinic",
    "Specialist Center",
    "Diagnostic Center",
  ]);

  return (
    <div className="space-y-6 bg-bg p-6 min-h-screen">
      <PageHeader
        title="Nearby Clinics & Hospitals"
        subtitle="Find healthcare facilities near you easily"
      />
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filters={filters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <p className="text-sm text-text opacity-70">
        {clinics.length} facilities found near you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <ClinicCard key={clinic.id} data={clinic} />
        ))}
      </div>

      <EmergencyBanner />
    </div>
  );
};

export default NearbyClinicsAndHospitals;
