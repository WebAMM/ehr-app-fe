import React, { useState } from "react";
import { FileText, CheckCircle, Clock, Eye, Download } from "lucide-react";

import StickyHeader from "@/components/ui/StickyHeader";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import ToggleTabs from "@/components/common/ToggleTabs";
import Button from "@/components/ui/Button";

const MedicalPrescriptions = () => {
  const tabs = ["All (4)", "Active (1)", "Completed (2)", "Expired (1)"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const prescriptions = [
    {
      id: 1,
      title: "Prescription #1",
      status: "Active",
      statusColor: "text-green-600 bg-green-100",
      doctor: "Dr. Amadou Ndiaye · Cardiologist",
      date: "January 5, 2026",
      diagnosis: "Hypertension Management",
      meds: [
        {
          name: "Amlodipine",
          dose: "5mg",
          freq: "Once daily",
          duration: "30 days",
        },
        {
          name: "Losartan",
          dose: "50mg",
          freq: "Once daily",
          duration: "30 days",
        },
      ],
    },
    {
      id: 2,
      title: "Prescription #2",
      status: "Completed",
      statusColor: "text-blue-600 bg-blue-100",
      doctor: "Dr. Fatou Sarr · General Practitioner",
      date: "January 25, 2026",
      diagnosis: "Upper Respiratory Infection",
      meds: [
        {
          name: "Amoxicillin",
          dose: "500mg",
          freq: "Three times daily",
          duration: "7 days",
        },
        {
          name: "Paracetamol",
          dose: "500mg",
          freq: "As needed",
          duration: "7 days",
        },
      ],
    },
    {
      id: 3,
      title: "Prescription #3",
      status: "Completed",
      statusColor: "text-blue-600 bg-blue-100",
      doctor: "Dr. Ousmane Diop · Dermatologist",
      date: "January 18, 2026",
      diagnosis: "Eczema Treatment",
      meds: [
        {
          name: "Hydrocortisone Cream",
          dose: "1%",
          freq: "Twice daily",
          duration: "14 days",
        },
      ],
    },
    {
      id: 4,
      title: "Prescription #4",
      status: "Expired",
      statusColor: "text-gray-600 bg-gray-100",
      doctor: "Dr. Mariama Kane · Endocrinologist",
      date: "December 20, 2025",
      diagnosis: "Thyroid Management",
      meds: [
        {
          name: "Levothyroxine",
          dose: "75mcg",
          freq: "Once daily (morning)",
          duration: "90 days",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-pageBackground">
      <StickyHeader linkTo="/settings" linkText="Back to Settings" />

      <div className="max-w-5xl  px-6 py-6 space-y-6">
        <PageHeader
          title="Medical Prescriptions"
          subtitle="View and manage your medical prescriptions"
        />

        <ToggleTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="space-y-4">
          {prescriptions.map((item) => (
            <Card key={item.id} padding="md">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-secondary/10">
                    <FileText className="w-5 h-5 text-secondary" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-text">{item.title}</p>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded ${item.statusColor}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-text opacity-70">
                      {item.doctor}
                    </p>
                    <p className="text-xs text-text opacity-50">{item.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Diagnosis */}
              <div className="bg-secondary/5 rounded-md p-3 mb-4">
                <p className="text-sm font-medium text-text mb-1">Diagnosis</p>
                <p className="text-sm text-text opacity-70">{item.diagnosis}</p>
              </div>

              {/* Medications */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-sm font-medium text-text">Medications</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
                  <p className="font-medium opacity-60">Medication</p>
                  <p className="font-medium opacity-60">Dosage</p>
                  <p className="font-medium opacity-60">Frequency</p>
                  <p className="font-medium opacity-60">Duration</p>

                  {item.meds.map((med, idx) => (
                    <React.Fragment key={idx}>
                      <p>{med.name}</p>
                      <p>{med.dose}</p>
                      <p>{med.freq}</p>
                      <p>{med.duration}</p>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalPrescriptions;
