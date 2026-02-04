import React, { useState } from "react";
import clsx from "clsx";
import { Search, Check, Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import StickyHeader from "@/components/ui/StickyHeader";

const ClinicCenterDetails = () => {
  const [selectedTests, setSelectedTests] = useState([
    {
      id: 1,
      name: "Blood C/E (Complete, CBC)",
      price: 1500,
      originalPrice: 2000,
    },
    {
      id: 2,
      name: "Urine C/E (Complete, Analysis)",
      price: 1500,
      originalPrice: 2000,
    },
  ]);

  const [allTests] = useState([
    { id: 3, name: "Renal Function Tests", price: 1500, originalPrice: 2000 },
    { id: 4, name: "17-OH Progesterone", price: 1500, originalPrice: 2000 },
    { id: 5, name: "Liver Function Tests", price: 1500, originalPrice: 2000 },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const isTestSelected = (id) => selectedTests.some((test) => test.id === id);

  const toggleTest = (test) => {
    if (isTestSelected(test.id)) {
      setSelectedTests((prev) => prev.filter((t) => t.id !== test.id));
    } else {
      setSelectedTests((prev) => [...prev, test]);
    }
  };

  const calculateTotal = () =>
    selectedTests.reduce((sum, t) => sum + t.price, 0);

  const calculateOriginalTotal = () =>
    selectedTests.reduce((sum, t) => sum + t.originalPrice, 0);

  const filteredTests = allTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-pageBackground">
      <StickyHeader
        linkTo="/laboratories-and-diagnostics"
        linkText="Health Center's Details"
      />

      <div className=" px-4 py-6 pb-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground ">
            All Test Available
          </h2>

          <div className="relative ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search Test (CBC, CT Scan etc)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-bg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Selected Tests */}
        {selectedTests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-secondary mb-3">
              Selected Tests
            </h3>

            <div className="space-y-3">
              {selectedTests.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/5 border border-[#CFF3E6]"
                >
                  <div>
                    <h4 className="text-sm font-medium text-foreground">
                      {test.name}
                    </h4>
                    <div className="flex gap-2 mt-1 text-sm">
                      <span className="text-secondary font-semibold">
                        {test.price} CFA
                      </span>
                      <span className="text-muted-foreground line-through">
                        {test.originalPrice} CFA
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleTest(test)}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Tests */}
        <h3 className="text-sm font-semibold text-secondary mb-3">All Tests</h3>

        <div className="space-y-3">
          {filteredTests.map((test) => {
            const selected = isTestSelected(test.id);

            return (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-border"
              >
                <div>
                  <h4 className="text-sm font-medium text-foreground">
                    {test.name}
                  </h4>
                  <div className="flex gap-2 mt-1 text-sm">
                    <span className="text-secondary font-semibold">
                      {test.price} CFA
                    </span>
                    <span className="text-muted-foreground line-through">
                      {test.originalPrice} CFA
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleTest(test)}
                  className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    {
                      "bg-secondary": selected,
                      "bg-gray-100": !selected,
                    },
                  )}
                >
                  {selected ? (
                    <Check className="w-4 h-4 text-white" />
                  ) : (
                    <Plus className="w-4 h-4 text-secondary" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className=" bg-white border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4 bg-secondary/5 border border-[#CFF3E6] rounded-xl p-4">
            <span className="text-sm font-medium text-foreground">
              Sub Total:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-secondary font-bold text-lg">
                {calculateTotal()} CFA
              </span>
              <span className="text-muted-foreground text-sm line-through">
                {calculateOriginalTotal()} CFA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button size="lg" fullWidth variant="grayOutline">
              Review Order
            </Button>
            <Button
              className="rounded-xl bg-secondary text-white"
              size="lg"
              fullWidth
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicCenterDetails;
