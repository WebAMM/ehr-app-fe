import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  MapPin,
  Star,
  Award,
  BookOpen,
  Video,
  MapPinCheck,
} from "lucide-react";
import Card from "@/components/ui/Card";

import StickyHeader from "@/components/ui/StickyHeader";
import { useGetDoctorDetailsQuery, useGetDoctorReviewsQuery } from "@/services";
import Map from "./Map";

export default function DoctorDetailsPage() {
  const location = useLocation();
  const userId = location.state?.doctorId;
  const [isFavorite, setIsFavorite] = useState(false);

  const navigate = useNavigate();
  const { data: doctorData } = useGetDoctorDetailsQuery({ userId: userId });
  const { data: reviewsData, isLoading: reviewsLoading } =
    useGetDoctorReviewsQuery({
      userId: userId,
    });
  const reviews = reviewsData?.data.reviews || [];
  const doctorDetails = doctorData?.data[0];

  const handleAppointmentClick = () => {
    navigate("/doctor-booking-appointment", {
      state: { doctorDetails: doctorDetails },
    });
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
                src={doctorDetails?.attachDoc}
                alt={doctorDetails?.fullName}
                className="w-28 h-28 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h1 className="text-xl font-bold">{doctorDetails?.fullName}</h1>
                <p className="text-muted-foreground">
                  {doctorDetails?.specialty}
                </p>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div className="font-medium">
                    {doctorDetails?.reviews?.averageRating || "N/A"}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    ({doctorDetails?.reviews?.totalReviews || "N/A"} reviews)
                  </div>
                  <div className="text-muted-foreground text-sm">
                    • {doctorDetails?.address || "N/A"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <StatItem
                label="Experience"
                value={`${doctorDetails?.experience || "N/A"} yrs`}
              />
              <StatItem
                label="Rating"
                value={doctorDetails?.reviews?.averageRating || "N/A"}
              />
              <StatItem
                label="Reviews"
                value={doctorDetails?.reviews?.totalReviews || "N/A"}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-semibold mb-4">Practice Details</h2>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-secondary" />
              <span className="font-medium">{doctorDetails?.type}</span>
            </div>

            {doctorDetails?.availableDayAndTime?.length > 0 ? (
              doctorDetails?.availableDayAndTime?.map((item, idx) => {
                return item?.available ? (
                  <div key={idx} className="mb-6 last:mb-0">
                    <div className="bg-secondary/10 rounded-lg p-4 flex justify-between">
                      <div className="flex items-center gap-2">
                        <div>{item?.day}</div>
                        <p className="text-sm text-muted-foreground">
                          {item?.openingTime}
                        </p>
                        {" - "}
                        <p className="text-sm text-muted-foreground">
                          {item?.closingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null;
              })
            ) : (
              <p className="text-muted-foreground">No available times</p>
            )}
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-3">About</h2>
            <p className="text-muted-foreground leading-relaxed">
              {doctorDetails?.about}
            </p>
          </Card>
          <div>
            <Map doctorDetails={doctorDetails} />
          </div>
          {/* <Card className="p-6">
            <h2 className="font-semibold mb-4">Education & Certifications</h2>
            <ul className="space-y-3">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="flex gap-3">
                  <Award className="w-5 h-5 text-secondary" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </Card> */}
          <Card className="p-6">
            <h2 className="font-semibold mb-4">Patient Reviews</h2>
            {reviewsLoading ? (
              <div className="text-center text-muted-foreground py-6">
                Loading reviews...
              </div>
            ) : reviewsData?.error ? (
              <div className="text-center text-red-500 py-6">
                Failed to load reviews. Please try again later.
              </div>
            ) : !reviews || reviews.length === 0 ? (
              <div className="text-center text-muted-foreground py-6">
                No reviews yet.
              </div>
            ) : (
              reviews.map((r) => (
                <div
                  key={r._id}
                  className="border-b border-border pb-4 mb-4 last:border-0"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {r.ratingBy?.name || "Anonymous"}
                    </span>
                    <div className="flex gap-1 items-center">
                      {Array.from({ length: Math.floor(r.rating) }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ),
                      )}
                      {r.rating % 1 !== 0 && (
                        <Star
                          className="w-4 h-4 text-yellow-400"
                          style={{ fill: "url(#half)" }}
                        />
                      )}
                      <span className="ml-2 text-sm text-muted-foreground">
                        {r.rating}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    {r.writeYourReview}
                  </p>
                </div>
              ))
            )}
            <svg width="0" height="0">
              <linearGradient id="half">
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </svg>
          </Card>
        </div>
        <div className="lg:sticky lg:top-24 h-fit">
          <Card className="p-6 border border-secondary/30">
            <h3 className="font-semibold mb-4">Book Appointment</h3>
            {doctorDetails?.type === "In-Clinic Consultation" ? (
              <div
                className="flex items-center gap-3 bg-none p-4 rounded-lg mb-4 text-secondary border border-secondary cursor-pointer"
                onClick={handleAppointmentClick}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <MapPinCheck />
                </div>
                <div className="flex-1">
                  <p className="font-medium">In-Clinic Consultation</p>
                  <span className=" ">{doctorDetails?.consultationFee} </span>
                </div>
              </div>
            ) : (
              <div
                className="flex items-center gap-3 bg-secondary p-4 rounded-lg mb-4 text-text-light cursor-pointer"
                onClick={handleAppointmentClick}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Video />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Video Consultation</p>
                  <span className=" text-text-light">
                    {doctorDetails?.videoConsultationFee}{" "}
                  </span>
                </div>
              </div>
            )}

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
