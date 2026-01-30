import React, { useState } from "react";
const SERVICES_DATA = [
  {
    category: "General Consultation",
    items: [
      {
        title:
          "In-person or telemedicine consultations with a general practitioner.",
        fee: "5,000 CFA",
      },
      {
        title:
          "In-person or telemedicine consultations with a general practitioner.",
        fee: "5,000 CFA",
      },
      {
        title:
          "In-person or telemedicine consultations with a general practitioner.",
        fee: "5,000 CFA",
      },
    ],
  },
  {
    category: "Specialist Consultation",
    items: [
      {
        title:
          "Includes Cardiologists, Dermatologists, Neurologists, and more.",
        fee: "10,000 CFA",
      },
      {
        title:
          "Includes Cardiologists, Dermatologists, Neurologists, and more.",
        fee: "10,000 CFA",
      },
      {
        title:
          "Includes Cardiologists, Dermatologists, Neurologists, and more.",
        fee: "10,000 CFA",
      },
    ],
  },
  {
    category: "Laboratory Tests",
    items: [
      {
        title: "Basic Tests: Blood Sugar, Cholesterol, Urine Test",
        fee: "3,000 CFA",
      },
      {
        title: "Basic Tests: Blood Sugar, Cholesterol, Urine Test",
        fee: "3,000 CFA",
      },
      {
        title: "Basic Tests: Blood Sugar, Cholesterol, Urine Test",
        fee: "3,000 CFA",
      },
    ],
  },
  {
    category: "Imaging Services",
    items: [
      { title: "X-ray", fee: "7,000 CFA" },
      { title: "Ultrasound", fee: "10,000 CFA" },
      { title: "CT Scan", fee: "45,000 CFA" },
      { title: "MRI", fee: "50,000 CFA" },
    ],
  },
  {
    category: "Vaccinations",
    items: [
      { title: "Flu Vaccine", fee: "4,000 CFA" },
      { title: "Tetanus Vaccine", fee: "3,500 CFA" },
      { title: "Hepatitis B Vaccine", fee: "8,000 CFA" },
    ],
  },
  {
    category: "Prescription Refill",
    items: [
      {
        title: "For chronic conditions such as diabetes, hypertension, etc.",
        fee: "2,000 CFA",
      },
      {
        title: "For chronic conditions such as diabetes, hypertension, etc.",
        fee: "2,000 CFA",
      },
      {
        title: "For chronic conditions such as diabetes, hypertension, etc.",
        fee: "2,000 CFA",
      },
    ],
  },
];

const ServicesTab = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-text">All Services</h2>
        <input
          type="text"
          placeholder="Search Services"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-border rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-secondary"
        />
      </div>
      {SERVICES_DATA.map((section) => (
        <div key={section.category} className="space-y-4">
          <h3 className="text-sm font-medium text-text">{section.category}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.items
              .filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase()),
              )
              .map((service, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4 bg-white flex flex-col justify-between"
                >
                  <div>
                    <p className="text-sm text-text mb-3 leading-relaxed">
                      {service.title}
                    </p>

                    <p className="text-xs text-secondary font-medium">
                      Fee: {service.fee}
                    </p>
                  </div>

                  <button className="mt-4 w-full bg-secondary/10 text-secondary text-sm font-medium py-2 rounded-md hover:bg-secondary/20 transition">
                    Book Service
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesTab;
