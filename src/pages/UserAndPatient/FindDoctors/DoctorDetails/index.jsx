const DOCTOR_DATA = {
  1: {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    rating: 4.8,
    reviewsCount: 127,
    experience: 15,
    patients: 2400,
    awards: 12,
    location: "City Medical Center",
    bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in preventive cardiology, heart disease management, and cardiovascular imaging. She is dedicated to providing personalized care to each patient.",
    education: [
      "MD - Harvard Medical School",
      "Fellowship in Cardiology - Johns Hopkins Hospital",
      "Board Certified in Cardiovascular Disease",
    ],
    practiceDetails: [
      {
        type: "Video Consultation",
        times: ["9:00 AM - 11:00 AM", "2:00 PM - 5:00 PM"],
        cya: "9800 CFA",
      },
      {
        type: "In-Clinic Consultation",
        times: ["11:00 AM - 1:00 PM", "5:00 PM - 7:00 PM"],
        cya: "12000 CFA",
      },
    ],
    address: "123 Medical Plaza, Suite 101, Abidjan, Côte d'Ivoire",
    patientReviews: [
      {
        name: "John Doe",
        rating: 5,
        text: "Great experience. Dr. Johnson took the time to explain everything clearly.",
      },
      {
        name: "Jane Smith",
        rating: 5,
        text: "Highly recommended professional and caring physician.",
      },
    ],
  },
  2: {
    name: "Dr. Michael Chen",
    specialty: "Pediatrician",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.9,
    reviewsCount: 98,
    experience: 12,
    patients: 1800,
    awards: 8,
    location: "Green Health Clinic",
    bio: "Dr. Michael Chen is a board-certified pediatrician with 12 years of experience caring for children. He specializes in general pediatrics, vaccination, and child development.",
    education: [
      "MD - Stanford School of Medicine",
      "Pediatric Residency - UCSF Medical Center",
      "Board Certified in Pediatrics",
    ],
    practiceDetails: [
      {
        type: "Video Consultation",
        times: ["10:00 AM - 12:00 PM", "3:00 PM - 5:00 PM"],
        cya: "9000 CFA",
      },
      {
        type: "In-Clinic Consultation",
        times: ["12:00 PM - 2:00 PM", "5:00 PM - 6:00 PM"],
        cya: "11000 CFA",
      },
    ],
    address: "456 Health Street, Abidjan, Côte d'Ivoire",
    patientReviews: [
      {
        name: "Maria Garcia",
        rating: 5,
        text: "Excellent with children. Very patient and professional.",
      },
      {
        name: "Robert Lee",
        rating: 5,
        text: "Best pediatrician we've found. Highly recommended!",
      },
    ],
  },
};

import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Award,
  BookOpen,
  Video,
  MapPinCheck,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const doctor = DOCTOR_DATA[id] || DOCTOR_DATA["1"];

  const navigate = useNavigate();
  const handleAppointmentClick = () => {
    navigate("/doctor-booking-appointment");
  };

  return (
    <main className="min-h-screen bg-pageBackground">
      <StickyHeader
        linkTo="/find-doctors"
        linkText="Doctor Details"
        showFavorite={true}
        isFavorite={isFavorite}
        onFavoriteToggle={() => setIsFavorite(!isFavorite)}
      />
      <div className="px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <div className="flex gap-6">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-28 h-28 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h1 className="text-xl font-bold">{doctor.name}</h1>
                <p className="text-muted-foreground">{doctor.specialty}</p>

                <div className="flex items-center gap-2 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground text-sm">
                    ({doctor.reviewsCount} reviews)
                  </span>
                  <span className="text-muted-foreground text-sm">
                    • {doctor.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6">
              <StatItem label="Patients" value={`${doctor.patients}+`} />
              <StatItem label="Experience" value={`${doctor.experience} yrs`} />
              <StatItem label="Rating" value={doctor.rating} />
              <StatItem label="Reviews" value={doctor.reviewsCount} />
            </div>
          </Card>

          {/* Practice Details */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Practice Details</h2>

            {doctor.practiceDetails.map((item, idx) => (
              <div key={idx} className="mb-6 last:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-secondary" />
                  <span className="font-medium">{item.type}</span>
                </div>

                <div className="bg-secondary/10 rounded-lg p-4 flex justify-between">
                  <div className="space-y-1">
                    {item.times.map((t, i) => (
                      <p key={i} className="text-sm text-muted-foreground">
                        {t}
                      </p>
                    ))}
                  </div>

                  <span className="font-semibold text-secondary">
                    {item.cya}
                  </span>
                </div>
              </div>
            ))}
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {doctor.bio}
            </p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Work Location</h2>
            <div className="flex gap-2 mb-4">
              <MapPin className="w-5 h-5 text-secondary" />
              <p className="text-muted-foreground">{doctor.address}</p>
            </div>
            <div className="h-60 bg-gray-200 rounded-lg flex items-center justify-center">
              Map View
            </div>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Education & Certifications</h2>
            <ul className="space-y-3">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex gap-3">
                  <Award className="w-5 h-5 text-secondary" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Patient Reviews</h2>
            {doctor.patientReviews.map((r, idx) => (
              <div
                key={idx}
                className="border-b border-border pb-4 mb-4 last:border-0"
              >
                <div className="flex justify-between">
                  <span className="font-medium">{r.name}</span>
                  <div className="flex gap-1">
                    {Array(r.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">{r.text}</p>
              </div>
            ))}
          </Card>
        </div>
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="p-6 border border-secondary/30">
            <h3 className="font-semibold mb-4">Book Appointment</h3>

            <div
              className="flex items-center gap-3 bg-secondary p-4 rounded-lg mb-4 text-text-light cursor-pointer"
              onClick={handleAppointmentClick}
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Video />
              </div>
              <div className="flex-1">
                <p className="font-medium">Video Consultation</p>
                <span className=" text-text-light">9800 CFA</span>
              </div>
            </div>
            <div
              className="flex items-center gap-3 bg-none p-4 rounded-lg mb-4 text-secondary border border-secondary cursor-pointer"
              onClick={handleAppointmentClick}
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <MapPinCheck />
              </div>
              <div className="flex-1">
                <p className="font-medium">Video Consultation</p>
                <span className=" ">9800 CFA</span>
              </div>
            </div>
            {/* 
            <Button className="w-full py-6 text-lg bg-secondary text-white">
              Book Now
            </Button> */}

            <p className="text-xs text-muted-foreground text-center mt-3">
              You won’t be charged until confirmed
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="text-center bg-secondary/10 rounded-lg p-3">
      <p className="font-semibold text-secondary">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
