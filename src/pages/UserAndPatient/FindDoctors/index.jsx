import { useState } from "react";
import { Search, MapPin, Clock, Star, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { DOCTORS } from "./DoctorData";
import { useNavigate } from "react-router-dom";
const SPECIALTIES = [
  "All Specialties",
  "Cardiologist",
  "Pediatrician",
  "Dermatologist",
  "Neurologist",
  "Orthopedic",
  "General Practitioner",
  "Gynecologist",
];

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const filteredDoctors = DOCTORS.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All Specialties" ||
      doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-border bg-card">
        <div className=" px-4 sm:px-6 lg:px-8 py-8">
          <PageHeader
            title="Find Doctors"
            subtitle="Search and book appointments with healthcare professionals"
            size="lg"
          />
        </div>
      </div>
      <div className="border-b border-border bg-card">
        <div className=" px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors, specialties, conditions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <Button className="bg-secondary hover:bg-primary text-white">
              Filter
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
            {SPECIALTIES.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`lg:px-4 lg:py-2 px-2 py-1 max-lg:text-xs rounded-full whitespace-nowrap font-medium transition-colors ${
                  selectedSpecialty === specialty
                    ? "bg-secondary text-white"
                    : "bg-secondary/20 text-foreground hover:bg-secondary/30"
                }`}
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {filteredDoctors.length} doctors found
          </p>
          <select className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm">
            <option>Sort by: Recommended</option>
            <option>Rating: High to Low</option>
            <option>Price: Low to High</option>
            <option>Experience: Most</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            // <Link to={`/doctor/${doctor.id}`} key={doctor.id}>
            <Card
              hover={true}
              padding="none"
              className="cursor-pointer h-full flex flex-col overflow-hidden"
            >
              <div className="bg-linear-to-r from-emerald-50 to-blue-50 p-4 flex items-start gap-4">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-foreground text-lg">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {doctor.specialty}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-sm text-foreground">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFavorite(doctor.id);
                  }}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <Heart
                    className="w-5 h-5"
                    fill={favorites.has(doctor.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
              <div className="p-4 flex-1">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {doctor.experience} years experience
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {doctor.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {doctor.availableTime}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  {doctor?.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary"
                    >
                      {tag === "Telemedicine" ? "📱" : "👥"} {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="border-t border-border p-4 flex items-center justify-between mt-auto">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Consultation Fee
                    </p>
                    <p className="font-bold text-foreground">
                      {doctor.fee.toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
                <Button
                  variant="gradient"
                  className=""
                  onClick={() => navigate("/doctor-details")}
                >
                  Book Now
                </Button>
              </div>
            </Card>
            // </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="text-secondary hover:text-primary font-semibold">
            Load More Doctors
          </button>
        </div>
      </div>
    </main>
  );
}
