import { useState } from "react";
import { Search, MapPin, Clock, Star, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { LoaderCenter } from "@/components/ui/Loader";
import { useNavigate } from "react-router-dom";
import { useSearchDoctorsQuery } from "@/services";
const SPECIALTIES = [
  "All",
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
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [favorites, setFavorites] = useState(new Set());
  const navigate = useNavigate();
  const {
    data: doctors,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSearchDoctorsQuery({
    search: searchQuery,
    limit,
    page,
    specialty: selectedSpecialty === "All" ? undefined : selectedSpecialty,
  });

  const mapApiDoctorToCard = (d) => {
    const id = d._id;
    const name = d.fullName?.trim() || "N/A";
    const specialty = d.specialty?.trim() || "N/A";
    const image = d.attachDoc;
    const experience = d.experience || 0;
    const location = d.address || "N/A";
    const fee = d.consultationFee || 0;
    const rating = d.rating || "N/A";
    const reviews = d.reviews || "N/A";
    const availableArr = Array.isArray(d.availableDayAndTime)
      ? d.availableDayAndTime
      : [];
    const type = d.type || "";

    return {
      id,
      name,
      specialty,
      image,
      rating,
      reviews,
      experience,
      location,
      availableArr,
      fee,
      type,
    };
  };

  const apiList = doctors?.data?.doctors || [];

  const sourceDoctors =
    doctors?.data?.doctors?.length > 0 ? apiList.map(mapApiDoctorToCard) : [];
  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleLoadMore = () => {
    if (limit >= (doctors?.data?.count || 0)) return;
    setLimit((prev) => prev + 12);
  };

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
            {sourceDoctors.length} doctors found
          </p>
          <select className="px-3 py-2 rounded-lg border border-input bg-background text-foreground text-sm">
            <option>Sort by: Recommended</option>
            <option>Rating: High to Low</option>
            <option>Price: Low to High</option>
            <option>Experience: Most</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center items-center py-20">
              <LoaderCenter size={80} />
            </div>
          ) : error ? (
            <div className="col-span-full">
              <Card padding="none" className="p-6 text-center">
                <p className="text-red-600 mb-4">
                  Failed to load doctors.{" "}
                  {error?.data?.message || error?.message}
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => refetch()}>Retry</Button>
                </div>
              </Card>
            </div>
          ) : sourceDoctors.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No doctors found. Try adjusting your search or filters.
            </div>
          ) : (
            sourceDoctors.map((doctor) => (
              <Card
                key={doctor.id}
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
                      <div>
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </div>

                      <span className="text-muted-foreground">
                        {doctor.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                      {doctor.type}
                    </span>
                  </div>
                </div>
                <div className="border-t border-border p-4 flex items-center justify-between mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Consultation Fee
                      </p>
                      <p className="font-bold text-foreground">
                        {doctor.fee.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="gradient"
                    className=""
                    onClick={() =>
                      navigate("/doctor-details", {
                        state: { doctorId: doctor.id },
                      })
                    }
                  >
                    Book Now
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
        <div className="text-center mt-12 " onClick={handleLoadMore}>
          <button className="text-secondary hover:text-primary font-semibold cursor-pointer">
            {isFetching ? "Loading..." : "Load More Doctors"}
          </button>
        </div>
      </div>
    </main>
  );
}
