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
import { useGetClinicDetailsQuery } from "@/services";
import { useLocation } from "react-router-dom";
import { LoaderCenter } from "@/components/ui/Loader";

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
  const location = useLocation();
  const onChange = (tab) => {
    setActiveTab(tab);
  };

  const {
    data: clinicDetails,
    isLoading: clinicLoading,
    isError: clinicError,
    error: clinicErrorDetails,
  } = useGetClinicDetailsQuery({ id: location.state?.clinicId });
  const clinicId = location.state?.clinicId || clinicDetails?.data?.[0]?._id;
  const galleryImages = clinicDetails?.data?.[0]?.gallery || [];

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
        {clinicLoading ? (
          <div className="flex items-center justify-center h-40">
            <LoaderCenter size={30} />
          </div>
        ) : clinicError ? (
          <div className="flex items-center justify-center h-40">
            <span className="text-red-500">
              {clinicErrorDetails?.message || "Error loading clinic details"}
            </span>
          </div>
        ) : (
          <ActionButtons clinicDetails={clinicDetails?.data?.[0]} />
        )}

        <Card padding="lg" shadow="md">
          <div className="mb-6">
            <StepperTabs active={activeTab} onChange={onChange} tabs={tabs} />
          </div>

          {activeTab === "specialists" && (
            <SpecialistsList clinicId={clinicId} />
          )}
          {activeTab === "services" && <ServicesTab clinicId={clinicId} />}
          {activeTab === "gallery" && <GalleryTab images={galleryImages} />}
          {activeTab === "reviews" && <ReviewsTab clinicId={clinicId} />}
          {activeTab === "contact" && (
            <ContactTab clinicDetails={clinicDetails?.data?.[0]} />
          )}
        </Card>
      </div>
    </div>
  );
};

export default HealthCenterDetails;
