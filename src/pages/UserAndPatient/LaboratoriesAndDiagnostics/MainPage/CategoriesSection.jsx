import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  BLOOD,
  BLOOD_SUGAR,
  CAMERA,
  VIRUS,
  CT_SCAN,
  MRI_SCAN,
  ULTRASOUND,
} from "@/assets/images";

const categories = [
  { label: "Complete Test", image: BLOOD_SUGAR },
  { label: "X-Ray", image: CAMERA },
  { label: "Ultrasound", image: ULTRASOUND },
  { label: "CT Scan", image: CT_SCAN },
  { label: "MRI Scan", image: MRI_SCAN },
  { label: "COVID-19 Test", image: VIRUS },
  { label: "Blood Test", image: BLOOD },
];

const CategoriesSection = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text">
          Popular Tests & Diagnostics
        </h3>
        <Button variant="link" size="sm">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {categories.map((item, index) => (
          <Card
            key={index}
            hover
            className="flex flex-col justify-center items-center text-center gap-2 cursor-pointer space-y-2"
          >
            <img
              src={item.image}
              alt={item.label}
              className="w-4 h-4 object-contain"
            />
            <span className="text-xs font-medium text-text">{item.label}</span>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CategoriesSection;
