import React, { useState, useMemo } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import Button from "@/components/ui/Button";
const locations = [
  { id: 1, detail: "Bamingui-Bangoran" },
  { id: 2, detail: "Basse-Kotto" },
  { id: 3, detail: "Haute-Kotto" },
  { id: 4, detail: "Haut-Mbomou" },
  { id: 5, detail: "Kémo" },
  { id: 6, detail: "Lobaye" },
  { id: 7, detail: "Mambéré-Kadéï" },
  { id: 8, detail: "Mbomou" },
  { id: 9, detail: "Nana-Gribizi" },
  { id: 10, detail: "Nana-Mambéré" },
  { id: 11, detail: "Ombella-M'Poko" },
  { id: 12, detail: "Ouaka" },
  { id: 13, detail: "Ouham" },
  { id: 14, detail: "Ouham-Pendé" },
  { id: 15, detail: "Sangha-Mbaéré" },
  { id: 16, detail: "Vakaga" },
  { id: 17, detail: "Bangui" },
  { id: 18, detail: "Mambéré, Lim-Pendé" },
  { id: 19, detail: "Ouham-Fafa" },
  { id: 20, detail: "Lim-Pendé" },
];

const SelectLocation = () => {
  const [selectedId, setSelectedId] = useState(17);
  const [search, setSearch] = useState("");

  const filteredLocations = useMemo(() => {
    return locations.filter((item) =>
      item.detail.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  return (
    <div className=" bg-bg max-w-4xl rounded-xl border border-border p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-text">Select Location</h2>
        <p className="text-sm text-text opacity-70">
          Choose your preferred location for healthcare services
        </p>
      </div>
      <div className="relative">
        <FiSearch className="absolute left-3 top-3 text-text opacity-50" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search location..."
          className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-border focus:outline-none"
        />
      </div>

      <div className=" overflow-y-auto border border-border rounded-lg divide-y divide-border max-h-screen">
        {filteredLocations.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted transition"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-4 h-4 rounded-full border flex items-center justify-center
                    ${
                      isSelected
                        ? "border-secondary bg-secondary"
                        : "border-gray-300"
                    }`}
                >
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-white" />
                  )}
                </span>

                <span className="text-sm text-text">{item.detail}</span>
              </div>

              <FiMapPin className="text-secondary" />
            </button>
          );
        })}
      </div>
      <Button
        variant="secondary"
        fullWidth
        onClick={() => console.log("Selected Location:", selectedId)}
      >
        Save Location
      </Button>
    </div>
  );
};

export default SelectLocation;
