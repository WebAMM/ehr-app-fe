import React from "react";
import Card from "@/components/ui/Card";

const SupportHours = () => {
  return (
    <Card
      parentClass="bg-linear-to-br from-secondary to-tertiary "
      className="text-white"
    >
      <h3 className="font-semibold mb-3">Support Hours</h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Monday - Friday</span>
          <span>8AM - 8PM</span>
        </div>
        <div className="flex justify-between">
          <span>Saturday</span>
          <span>9AM - 6PM</span>
        </div>
        <div className="flex justify-between">
          <span>Sunday</span>
          <span>10AM - 4PM</span>
        </div>
      </div>

      <p className="text-xs mt-4 opacity-90">
        Emergency support available 24/7 via live chat
      </p>
    </Card>
  );
};

export default SupportHours;
