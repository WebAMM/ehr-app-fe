import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchSection from "./SearchSection";
import CategoriesSection from "./CategoriesSection";
import LabsSection from "./LabsSection";
import BottomSection from "./BottomSection";

const LaboratoriesAndDiagnostics = () => {
  return (
    <div className="space-y-6 bg-bg min-h-screen p-6">
      <PageHeader
        title="Laboratories & Diagnostics"
        subtitle="Find diagnostic centers and labs near you"
      />
      <SearchSection />
      <CategoriesSection />
      <LabsSection />
      <BottomSection />
    </div>
  );
};

export default LaboratoriesAndDiagnostics;
