import React from "react";
import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import { useGetClinicReviewsQuery } from "@/services";

function mapReviewData(item) {
  return {
    id: item._id,
    name: item.ratingBy?.name || "Anonymous",
    avatar:
      item.ratingBy?.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
    rating: item.rating,
    review: item.writeYourReview,
    time: item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "",
  };
}

const ReviewsTab = ({ clinicId }) => {
  const {
    data: clinicDetails,
    isLoading,
    isError,
    error,
  } = useGetClinicReviewsQuery({ id: clinicId });
  const reviewsRaw = clinicDetails?.data?.reviews || [];
  const reviews = reviewsRaw.map(mapReviewData);
  // Star rendering helper
  function renderStars(rating) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-orange-400 text-orange-400" />,
      );
    }
    if (hasHalf) {
      stars.push(
        <StarHalf
          key="half"
          size={16}
          className="fill-orange-400 text-orange-400"
        />,
      );
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <StarOutline key={"empty-" + i} size={16} className="text-gray-300" />,
      );
    }
    return stars;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-primary animate-pulse text-lg font-semibold">
          Loading reviews...
        </span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-red-500 font-semibold">
          {error?.message || "Failed to load reviews."}
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h2 className="text-xl font-bold text-primary mb-2">Reviews</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-8">
            No reviews yet.
          </div>
        )}
        {reviews.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-2xl p-5 bg-white shadow-sm hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-base text-gray-900">
                  {item.name}
                </h4>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-orange-500">
                  {item.rating}
                </span>
                <span className="flex">{renderStars(item.rating)}</span>
              </div>
            </div>

            {/* Review */}
            <p className="text-sm text-gray-600 mt-2 leading-relaxed flex-1">
              {item.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
