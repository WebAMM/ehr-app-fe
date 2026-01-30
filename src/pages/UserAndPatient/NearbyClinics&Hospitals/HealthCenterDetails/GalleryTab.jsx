import React from "react";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&auto=format",
];

const GalleryTab = () => {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h2 className="text-lg font-semibold text-text">
        Gallery <span className="text-muted-foreground">(10)</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden bg-secondary/5 aspect-4/3 cursor-pointer"
          >
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryTab;
