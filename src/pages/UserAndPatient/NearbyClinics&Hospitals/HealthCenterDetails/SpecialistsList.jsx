import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Star, Clock, Pin, MapPin, Check, CircleCheckBig } from "lucide-react";

const doctors = Array.from({ length: 2 }).map((_, i) => ({
  id: i,
  name: "Dr. David Patel",
  specialty: "Cardiologist",
  degree: "MBBS, FCP (Internal Medicine)",
  rating: 4.8,
  reviews: 1572,
  time: "09:00 AM – 05:00 PM",
  price: "2000 CFA",
  availableToday: i === 0,
}));

const SpecialistsList = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">
        Specialists Doctors ({doctors.length})
      </h3>

      {doctors?.map((doc) => (
        <Card key={doc.id} shadow="none">
          <div className="flex gap-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="doctor"
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div className="flex-1 space-y-1.5">
              <h4 className="font-medium">{doc.name}</h4>
              <p className="text-sm opacity-70">{doc.specialty}</p>
              <p className="text-xs opacity-60">{doc.degree}</p>

              <div className="flex items-center gap-2 mt-1 text-xs">
                <Star className="text-yellow-500" size={14} />
                {doc.rating} ({doc.reviews} Reviews)
              </div>
            </div>
          </div>

          <div>
            <div className="flex-1 space-y-1.5 bg-secondary/5 rounded-2xl p-5 my-5">
              <div className="flex items-center gap-2 mt-2 text-xs text-secondary">
                <MapPin size={14} /> In-Clinic Consultation
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-secondary">
                <Clock size={14} /> {doc.time}
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-secondary">
                <CircleCheckBig size={14} />{" "}
                {doc.availableToday ? "Available Today" : "Not Available Today"}
              </div>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="mt-2 text-sm text-secondary">{doc.price}</p>
              <Button size="sm" className="self-end" variant="gradient">
                Book Appointment
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SpecialistsList;
