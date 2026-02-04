import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ToggleTabs from "@/components/common/ToggleTabs";
import MedicalActions from "./MedicalActions";
import MedicalStats from "./MedicalStats";

import RecordsCard from "./RecordsCard";

const TABS = [
  "All Records (8)",
  "Prescriptions (3)",
  "Lab Results (3)",
  "Reports (2)",
];
import { FileText, FlaskConical, FileBarChart2 } from "lucide-react";
const RECORDS = [
  {
    id: 1,
    type: "prescription",
    title: "Prescription - Cardiovascular Medication",
    meta: "Dr. Sarah Johnson · Cardiologist · Dec 20, 2024 · 245 KB",
    description: "Medications: Aspirin 100mg · Lisinopril 10mg",
    tags: ["Prescription", "Active"],
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: 2,
    type: "prescription",
    title: "Prescription - Diabetes Management",
    meta: "Dr. Michael Chen · Endocrinologist · Dec 02, 2024 · 198 KB",
    description: "Medications: Metformin 500mg · Insulin",
    tags: ["Prescription", "Active"],
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: 3,
    type: "prescription",
    title: "Prescription - Pediatric Antibiotics",
    meta: "Dr. Emma Wilson · Pediatrician · Nov 15, 2024 · 156 KB",
    description: "Medications: Amoxicillin 250mg",
    tags: ["Prescription", "Expired"],
    icon: FileText,
    color: "text-blue-500",
  },
  {
    id: 4,
    type: "lab",
    title: "Lipid Profile Test",
    meta: "City Lab Express · Laboratory · Nov 28, 2024 · 428 KB",
    tags: ["Lab Result", "Completed", "Urgent"],
    icon: FlaskConical,
    color: "text-green-500",
  },
  {
    id: 5,
    type: "lab",
    title: "Complete Blood Count (CBC)",
    meta: "HealthPlus Labs · Laboratory · Nov 10, 2024 · 312 KB",
    tags: ["Lab Result", "Completed"],
    icon: FlaskConical,
    color: "text-green-500",
  },
  {
    id: 6,
    type: "lab",
    title: "Thyroid Function Test",
    meta: "Prime Diagnostics · Laboratory · Oct 25, 2024 · 290 KB",
    tags: ["Lab Result", "Completed"],
    icon: FlaskConical,
    color: "text-green-500",
  },
  {
    id: 7,
    type: "report",
    title: "Annual Health Checkup Report",
    meta: "Dr. Olivia Brown · Internal Medicine · Oct 01, 2024 · 520 KB",
    tags: ["Medical Report"],
    icon: FileBarChart2,
    color: "text-purple-500",
  },
  {
    id: 8,
    type: "report",
    title: "Radiology Imaging Summary",
    meta: "City Imaging Center · Radiology · Sep 18, 2024 · 760 KB",
    tags: ["Medical Report"],
    icon: FileBarChart2,
    color: "text-purple-500",
  },
];

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const getFilteredRecords = (tab) => {
    if (tab.startsWith("All")) return RECORDS;
    if (tab.startsWith("Prescriptions"))
      return RECORDS.filter((r) => r.type === "prescription");
    if (tab.startsWith("Lab Results"))
      return RECORDS.filter((r) => r.type === "lab");
    if (tab.startsWith("Reports"))
      return RECORDS.filter((r) => r.type === "report");
  };
  return (
    <div className="bg-pageBackground min-h-screen px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <PageHeader
        title="Medical Records"
        subtitle="Access and manage all your medical documents securely"
      />

      <MedicalActions />
      <MedicalStats />

      <ToggleTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <RecordsCard filtered={getFilteredRecords(activeTab)}></RecordsCard>
    </div>
  );
};

export default MedicalRecords;
