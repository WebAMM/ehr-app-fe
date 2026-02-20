import Card from "@/components/ui/Card";
import { MapPin } from "lucide-react";
import React, { useEffect, useState } from "react";

const Map = ({ doctorDetails }) => {
  const [coords, setCoords] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const getCoordinates = async (address) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
    );
    const data = await res.json();
    return data[0];
  };

  useEffect(() => {
    if (doctorDetails?.address) {
      setMapLoading(true);
      getCoordinates(doctorDetails.address)
        .then((data) => {
          if (data) {
            setCoords({
              lat: parseFloat(data.lat),
              lon: parseFloat(data.lon),
            });
          } else {
            setCoords(null);
          }
          setMapLoading(false);
        })
        .catch(() => {
          setCoords(null);
          setMapLoading(false);
        });
    } else {
      setCoords(null);
      setMapLoading(false);
    }
  }, [doctorDetails?.address]);
  return (
    <Card className="p-6">
      <h2 className="font-semibold mb-4">Work Location</h2>
      <div className="flex gap-2 mb-4">
        <MapPin className="w-5 h-5 text-secondary" />
        <p className="text-muted-foreground">{doctorDetails?.address}</p>
      </div>
      <div className="h-60 bg-gray-200 rounded-lg overflow-hidden">
        {mapLoading ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Loading map...
          </div>
        ) : coords ? (
          <iframe
            title="Doctor Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lon - 0.01},${coords.lat - 0.01},${coords.lon + 0.01},${coords.lat + 0.01}&marker=${coords.lat},${coords.lon}`}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Location not available
          </div>
        )}
      </div>
    </Card>
  );
};

export default Map;
