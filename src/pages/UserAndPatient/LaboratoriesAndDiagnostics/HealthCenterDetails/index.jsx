import React, { useState } from "react";
import { Search, Check, Plus } from "lucide-react";
import Button from "./Button";
import Card from "./Card";
import StickyHeader from "./StickyHeader";

const HealthCenterDetails = () => {
  const [selectedTests, setSelectedTests] = useState([
    {
      id: 1,
      name: "Blood C/E (Complete, CBC)",
      price: 1500,
      originalPrice: 2000,
    },
    {
      id: 2,
      name: "Urine C/E( Complete, Analysis)",
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

  const isTestSelected = (testId) => {
    return selectedTests.some((test) => test.id === testId);
  };

  const toggleTest = (test) => {
    if (isTestSelected(test.id)) {
      setSelectedTests(selectedTests.filter((t) => t.id !== test.id));
    } else {
      setSelectedTests([...selectedTests, test]);
    }
  };

  const calculateTotal = () => {
    return selectedTests.reduce((sum, test) => sum + test.price, 0);
  };

  const calculateOriginalTotal = () => {
    return selectedTests.reduce((sum, test) => sum + test.originalPrice, 0);
  };

  const filteredTests = allTests.filter((test) =>
    test.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-pageBackground">
      <StickyHeader linkTo="/" linkText="Health Center's Details" />

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            All Test Available
          </h2>
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search Test (CBC, CT Scan etc)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary bg-card text-foreground"
            />
          </div>

          {/* Selected Tests */}
          {selectedTests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-secondary mb-3">
                Selected Tests
              </h3>
              <div className="space-y-3">
                {selectedTests.map((test) => (
                  <Card key={test.id} padding="sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {test.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-secondary font-semibold">
                            {test.price} CFA
                          </span>
                          <span className="text-muted-foreground text-sm line-through">
                            {test.originalPrice} CFA
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleTest(test)}
                        className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center"
                      >
                        <Check className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              All Tests
            </h3>
            <div className="space-y-3">
              {filteredTests.map((test) => (
                <Card key={test.id} padding="sm">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {test.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-secondary font-semibold">
                          {test.price} CFA
                        </span>
                        <span className="text-muted-foreground text-sm line-through">
                          {test.originalPrice} CFA
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleTest(test)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isTestSelected(test.id)
                          ? "bg-secondary border-secondary"
                          : "border-border"
                      }`}
                    >
                      {isTestSelected(test.id) ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg p-4">
          <div className="max-w-3xl mx-auto">
            {/* Sub Total */}
            <div className="flex justify-between items-center mb-4 bg-accent/10 rounded-lg p-3">
              <span className="font-medium text-foreground">Sub Total:</span>
              <div className="flex items-center gap-2">
                <span className="text-secondary font-bold text-lg">
                  {calculateTotal()} CFA
                </span>
                <span className="text-muted-foreground text-sm line-through">
                  {calculateOriginalTotal()} CFA
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="grayOutline" size="lg" fullWidth>
                Review Order
              </Button>
              <Button variant="gradient" size="lg" fullWidth>
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>

        {/* Spacer for fixed footer */}
        <div className="h-40"></div>
      </div>
    </div>
  );
};

export default HealthCenterDetails;
