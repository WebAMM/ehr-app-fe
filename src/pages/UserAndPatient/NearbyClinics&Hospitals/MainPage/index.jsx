import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchAndFilter from "./SearchAndFilter";
import ClinicCard from "./ClinicCard";
import EmergencyBanner from "./EmergencyBanner";
import { useGetAllClinicsQuery } from "@/services";
import { LoaderCenter } from "@/components/ui/Loader";

const NearbyClinicsAndHospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(time);
  }, [searchQuery]);
  
const {data: clinicsData, isLoading} = useGetAllClinicsQuery({search : debounceSearch, page: 1, limit: 12  });

const clinics = clinicsData?.data?.clinics || [];

  return (
    <div className="space-y-6 bg-bg p-6 min-h-screen">
      <PageHeader
        title="Nearby Clinics & Hospitals"
        subtitle="Find healthcare facilities near you easily"
      />
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
       
      />

      <p className="text-sm text-text opacity-70">
        {clinics?.length} facilities found near you
      </p>
{isLoading ? (
       < LoaderCenter/>
      ) : clinics?.length === 0 ? (
        <p className="text-sm text-text opacity-70">No clinics found.</p>
      ) : <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {clinics?.map((clinic) => (
          <ClinicCard key={clinic?._id} data={clinic} />
        ))}
      </div> }
      {isLoading ? "" : <div className="flex justify-center mt-4 cursor-pointer text-secondary hover:text-secondary/80  font-medium text-xl">
        Load more
      </div> }
    
    </div>
  );
};

export default NearbyClinicsAndHospitals;
