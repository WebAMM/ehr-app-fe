import StickyHeader from "@/components/ui/StickyHeader";
import React, { useState } from "react";
import ClinicHeader from "./ClinicHeader";
import ActionButtons from "./ActionButtons";
import StepperTabs from "@/components/common/StepperTabs";
import SpecialistsList from "./SpecialistsList";
import ServicesTab from "./ServicesTab";
import GalleryTab from "./GalleryTab";
import ReviewsTab from "./ReviewsTab";
import ContactTab from "./ContactTab";
import Card from "@/components/ui/Card";
const tabs = [
  { id: "specialists", label: "Specialists" },
  { id: "services", label: "Services" },
  { id: "gallery", label: "Gallery" },
  { id: "reviews", label: "Reviews" },
  { id: "contact", label: "Contact" },
];
const HealthCenterDetails = () => {
  const [activeTab, setActiveTab] = useState("specialists");
  const [isFavorite, setIsFavorite] = useState(false);

  const onChange = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div className="bg-bg">
      <StickyHeader
        linkTo="/nearby-clinics-and-hospitals"
        linkText="Health Center's Details"
        showFavorite
        isFavorite={isFavorite}
        onFavoriteToggle={() => setIsFavorite((p) => !p)}
      />

      <div className=" p-4 space-y-7 ">
        <ClinicHeader />
        <ActionButtons />
        <Card padding="lg" shadow="md">
          <div className="mb-6">
            <StepperTabs active={activeTab} onChange={onChange} tabs={tabs} />
          </div>

          {activeTab === "specialists" && <SpecialistsList />}
          {activeTab === "services" && <ServicesTab />}
          {activeTab === "gallery" && <GalleryTab />}
          {activeTab === "reviews" && <ReviewsTab />}
          {activeTab === "contact" && <ContactTab />}
        </Card>
      </div>
    </div>
  );
};

export default HealthCenterDetails;
