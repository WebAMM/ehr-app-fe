import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Plus, Star } from "lucide-react";
const STAFF_DATA = [
  {
    id: 1,
    name: "Dr. David Patel",
    specialization: "Cardiologist",
    qualification: "MBBS, FCP (Internal Medicine)",
    rating: 5.0,
    reviews: 1872,
    status: "Active",
    phone: "+23672906251",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=200",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    specialization: "Dermatologist",
    qualification: "MBBS, MD (Dermatology)",
    rating: 4.8,
    reviews: 942,
    status: "Inactive",
    phone: "+23672901234",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200",
  },
];

const AllStaff = () => {
  return (
    <Card
      shadow="md"
      padding="md"
      parentClass="bg-white rounded-2xl w-full"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">All Staff</h2>

        <Button
          variant="secondary"
          size="sm"
          icon={Plus}
          className="rounded-xl px-4 py-2"
        >
          Add New
        </Button>
      </div>

      <div className="space-y-4">
        {STAFF_DATA.map((staff) => {
          const isActive = staff.status === "Active";

          return (
            <div
              key={staff.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl"
            >
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />

                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {staff.name}
                  </h3>

                  <p className="text-sm text-gray-600">
                    {staff.specialization}
                  </p>

                  <p className="text-sm text-gray-500">{staff.qualification}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star
                        size={14}
                        className="fill-yellow-400 stroke-yellow-400"
                      />
                      <span className="ml-1 text-yellow-600 font-medium">
                        {staff.rating}
                      </span>
                    </div>

                    <span className="text-sm text-gray-500">
                      {staff.reviews.toLocaleString()} Reviews
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col items-end gap-3">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    isActive
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {staff.status}
                </span>

                <span className="text-sm text-gray-600">{staff.phone}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AllStaff;
