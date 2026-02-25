import React, { useMemo } from "react";
import { Star } from "lucide-react";

import Card from "@/components/ui/Card";
import CustomAvatar from "@/components/ui/Avatar";
import { LoaderCenter } from "@/components/ui/Loader";
import { authCookies } from "@/utils/cookieUtils";
import { useGetDoctorReviewsQuery } from "@/services";

const Stars = ({ value = 5 }) => {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, idx) => (
        <Star
          key={idx}
          className={`w-4 h-4 ${
            idx < full ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={idx < full ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const DoctorSettingsReviews = () => {
  const { getUser } = authCookies;
  const doctorId = getUser()?._id;

  const {
    data: reviewsData,
    isLoading,
    isError,
  } = useGetDoctorReviewsQuery({
    userId: doctorId,
  });
  const reviews = useMemo(() => {
    if (reviewsData?.data?.reviews && Array.isArray(reviewsData.data.reviews)) {
      return reviewsData?.data?.reviews?.map((review) => ({
        id: review?._id,
        name: review?.ratingBy?.fullName || "Anonymous Patient",
        rating: review?.rating,
        date: formatDate(review.createdAt),
        text: review?.writeYourReview,
      }));
    }
    return [];
  }, [reviewsData]);
  const averageRating = useMemo(() => {
    if (reviews?.length === 0) return 0;
    const sum = reviews?.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews?.length).toFixed(1);
  }, [reviews]);

  return (
    <div className="w-full">
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-text">
              Patients Reviews
            </h2>
            <div className="flex items-center gap-3 mt-3">
              <Stars value={averageRating} />
              <span className="text-lg font-semibold text-text">
                {averageRating}
              </span>
              <span className="text-gray-500 text-sm">
                ({reviews?.length || 0}{" "}
                {reviews?.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="mt-10 flex justify-center">
            <LoaderCenter size={60} />
          </div>
        )}

        {isError && (
          <div className="mt-6 text-center">
            <p className="text-red-500">Failed to load reviews</p>
          </div>
        )}

        {!isLoading && !isError && reviews.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-primary">No reviews yet</p>
          </div>
        )}

        {!isLoading && !isError && reviews?.length > 0 && (
          <div className="mt-6 space-y-4">
            {reviews?.map((r) => (
              <div key={r.id} className="rounded-2xl bg-gray-50 p-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-start gap-4 min-w-0">
                    <CustomAvatar
                      name={r.name}
                      size="52"
                      round={true}
                      bgColor="#0EBE7F"
                    />

                    <div className="min-w-0">
                      <p className="font-semibold text-text">{r.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Stars value={r.rating} />
                        <span className="text-sm text-gray-700 font-medium">
                          {r.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-gray-500 text-sm whitespace-nowrap">
                    {r.date}
                  </span>
                </div>

                <p className="text-gray-700 mt-4 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DoctorSettingsReviews;
