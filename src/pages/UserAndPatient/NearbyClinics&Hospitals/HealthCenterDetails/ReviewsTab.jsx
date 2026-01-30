import React from "react";
import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Emily Anderson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    time: "11 month ago",
    review:
      "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
  },
  {
    id: 2,
    name: "Emily Anderson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    time: "11 month ago",
    review:
      "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
  },
  {
    id: 3,
    name: "Emily Anderson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    time: "11 month ago",
    review:
      "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
  },
  {
    id: 4,
    name: "Emily Anderson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    time: "11 month ago",
    review:
      "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
  },
  {
    id: 5,
    name: "Emily Anderson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    time: "11 month ago",
    review:
      "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
  },
  {
    id: 6,
    name: "Emily Anderson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    time: "11 month ago",
    review:
      "Dr. Patel is a true professional who genuinely cares about his patients. I highly recommend Dr. Patel to anyone seeking exceptional cardiac care.",
  },
];

const ReviewsTab = () => {
  return (
    <div className="space-y-4">
      {/* Heading */}
      <h2 className="text-lg font-semibold text-text">Reviews</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl p-4 bg-white"
          >
            {/* Header */}
            <div className="flex items-start gap-3">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm text-gray-900">
                    {item.name}
                  </h4>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-sm font-medium text-gray-800">
                    {item.rating}.0
                  </span>
                  <div className="flex">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-orange-400 text-orange-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Review */}
            <p className="text-sm text-gray-500 mt-3 leading-relaxed">
              {item.review}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
