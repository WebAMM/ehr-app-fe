import { useEffect, useState } from "react";
import { Search, MapPin, Clock, Star, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { LoaderCenter } from "@/components/ui/Loader";
import { useNavigate } from "react-router-dom";
import {
  useAddFavoriteMutation,
  useAllDoctorsQuery,
  useRemoveFavoriteMutation,
} from "@/services";
import { toastSuccess } from "@/components/ui/Toast";
const SPECIALTIES = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "ENT",
  "Pediatrician",
  "Pulmonologist",
  "Gastroenterologist",
  "Oncologist",
  "Allergist",
  "Physiotherapist",
  "Dentist",
];

export default function FindDoctors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [limit, setLimit] = useState(12);
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const [loadingFavoriteId, setLoadingFavoriteId] = useState(null);
  const navigate = useNavigate();
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const {
    data: doctors,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useAllDoctorsQuery({
    page: 1,
    limit: limit,
    search:
      selectedSpecialty !== "All" ? selectedSpecialty : debouncedSearchQuery,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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
    const isFavorite = d.isFavorite;
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
      isFavorite,
    };
  };

  const apiList = doctors?.data?.doctors || [];

  const sourceDoctors =
    doctors?.data?.doctors?.length > 0 ? apiList.map(mapApiDoctorToCard) : [];

  const handleLoadMore = () => {
    if (limit >= (doctors?.data?.totalDoctors || 0)) return;
    setLimit((prev) => prev + 12);
  };
  const addToFavorites = async (doctorId) => {
    const payload = {
      doctorId: doctorId,
      type: "doctor",
    };
    setLoadingFavoriteId(doctorId);
    try {
      const response = await addFavorite({ body: payload });

      if (response) {
        toastSuccess(response.message || "Added to favorites");
        refetch();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoadingFavoriteId(null);
    }
  };
  const removeFromFavorites = async (doctorId) => {
    const payload = {
      doctorId: doctorId,
      type: "doctor",
    };
    setLoadingFavoriteId(doctorId);
    try {
      const response = await removeFavorite({ body: payload });

      if (response) {
        toastSuccess(response.message || "Removed from favorites");
        refetch();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoadingFavoriteId(null);
    }
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
            {SPECIALTIES?.map((specialty) => (
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
            {doctors?.data?.totalDoctors} doctors found
          </p>
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
            sourceDoctors?.map((doctor) => {
              return (
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
                        doctor.isFavorite === true
                          ? removeFromFavorites(doctor?.id)
                          : addToFavorites(doctor?.id);
                      }}
                      disabled={loadingFavoriteId === doctor?.id}
                      className="text-muted-foreground hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {loadingFavoriteId === doctor?.id ? (
                        <LoaderCenter size={20} />
                      ) : (
                        <Heart
                          className="w-5 h-5"
                          fill={doctor?.isFavorite ? "currentColor" : "none"}
                        />
                      )}
                    </button>
                  </div>
                  <div className="p-4 flex-1">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {doctor?.experience} years experience
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div>
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                        </div>

                        <span className="text-muted-foreground">
                          {doctor?.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">
                        {doctor?.type}
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
                          {doctor?.fee?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="gradient"
                      className=""
                      onClick={() =>
                        navigate("/doctor-details", {
                          state: { doctorId: doctor?.id },
                        })
                      }
                    >
                      Book Now
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
        {doctors?.data?.totalDoctors > 12 && (
          <div className="text-center mt-12 " onClick={handleLoadMore}>
            <button className="text-secondary hover:text-primary font-semibold cursor-pointer">
              {isFetching ? "Loading..." : "Load More Doctors"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
