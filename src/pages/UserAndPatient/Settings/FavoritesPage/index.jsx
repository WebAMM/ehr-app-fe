import React, { useState } from "react";
import { Heart, Star, Phone } from "lucide-react";

import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";
import ToggleTabs from "@/components/common/ToggleTabs";

const FavoritesPage = () => {
  const tabs = ["All (5)", "Doctors (3)", "Clinics (1)", "Laboratories (1)"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const favorites = [
    {
      id: 1,
      type: "Doctor",
      name: "Dr. Amadou Ndiaye",
      specialty: "Cardiologist",
      rating: 4.8,
      reviews: 245,
      location: "Plateau, Dakar",
      distance: "2.5 km",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=200&fit=crop",
    },
    {
      id: 2,
      type: "Clinic",
      name: "Keta Mind Clinic",
      specialty: "Multi-specialty",
      rating: 4.6,
      reviews: 189,
      location: "Mermoz, Dakar",
      distance: "3.2 km",
      image:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=200&fit=crop",
    },
    {
      id: 3,
      type: "Doctor",
      name: "Dr. Fatou Sarr",
      specialty: "Pediatrician",
      rating: 4.9,
      reviews: 312,
      location: "Almadies, Dakar",
      distance: "4.1 km",
      image:
        "https://images.unsplash.com/photo-1594824804732-ca8db723f8fa?w=400&h=200&fit=crop",
    },
    {
      id: 4,
      type: "Laboratory",
      name: "Lab Excellence",
      specialty: "Diagnostic Center",
      rating: 4.7,
      reviews: 156,
      location: "Point E, Dakar",
      distance: "1.8 km",
      image:
        "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400&h=200&fit=crop",
    },
    {
      id: 5,
      type: "Doctor",
      name: "Dr. Ousmane Diop",
      specialty: "Dermatologist",
      rating: 4.5,
      reviews: 98,
      location: "Sacré-Cœur, Dakar",
      distance: "5.3 km",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=200&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-pageBackground">
      <StickyHeader linkTo="/settings" linkText="Back to Settings" />
      <div className="max-w-7xl  px-4 py-6 space-y-6">
        <PageHeader
          title="Favorites"
          subtitle="Your saved doctors, clinics, and laboratories"
        />

        <ToggleTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} padding="sm" hover>
              <div className="relative mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x200/cccccc/666666?text=Image+Not+Available";
                  }}
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </button>
              </div>

              <span className="inline-block text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded mb-2">
                {item.type}
              </span>

              <h3 className="font-semibold text-text">{item.name}</h3>

              <p className="text-sm text-text opacity-70 mb-2">
                {item.specialty}
              </p>

              <div className="flex items-center gap-1 text-sm mb-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="font-medium">{item.rating}</span>
                <span className="opacity-60">({item.reviews} reviews)</span>
              </div>

              <p className="text-sm text-text opacity-70 mb-4">
                {item.location} · {item.distance}
              </p>

              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" fullWidth>
                  Book Now
                </Button>

                <Button variant="grayOutline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
