import React from "react";

const GalleryTab = ({ images }) => {
  return (
    <div className="space-y-4">
      {/* Title */}
      <h2 className="text-lg font-semibold text-text">
        Gallery{" "}
        <span className="text-muted-foreground">({images?.length})</span>
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((image, index) => (
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
