import React, { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import SearchAndFilter from "./SearchAndFilter";
import ClinicCard from "./ClinicCard";

import { useGetAllClinicsQuery } from "@/services";
import { LoaderCenter } from "@/components/ui/Loader";
import Card from "@/components/ui/Card";
import { MessageSquareWarning } from "lucide-react";

const NearbyClinicsAndHospitals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearch, setDebounceSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(12);
  useEffect(() => {
    const time = setTimeout(() => {
      setDebounceSearch(searchQuery);
    }, 1000);
    return () => clearTimeout(time);
  }, [searchQuery]);

  const {
    data: clinicsData,
    isLoading,
    isError,
    error,
  } = useGetAllClinicsQuery({
    search: debounceSearch,
    page: page,
    limit: limit,
  });

  const clinics = clinicsData?.data?.clinics || [];
  const totalClinics = clinicsData?.data?.totalClinics || 0;

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
        {clinics?.length} of {totalClinics} facilities found near you
      </p>
      {isLoading ? (
        <LoaderCenter />
      ) : clinics?.length === 0 ? (
        <p className="text-sm text-text opacity-70">No clinics found.</p>
      ) : isError ? (
        <Card className="h-40 flex items-center justify-center bg-red-50 border border-red-200 shadow-md  ">
          <div className="flex flex-col items-center justify-center w-full  ">
            <div className="bg-linear-to-tr from-red-400 to-red-600 shadow-lg w-20 h-20 flex items-center justify-center rounded-full mb-4">
              <MessageSquareWarning
                className="text-white drop-shadow-lg"
                size={44}
              />
            </div>
            <p className="text-base font-semibold text-red-600 text-center px-4">
              {error?.data?.message || "Failed to load clinics."}
            </p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {clinics?.map((clinic) => (
            <ClinicCard key={clinic?._id} data={clinic} />
          ))}
        </div>
      )}
      {totalClinics <= 12 ? (
        ""
      ) : (
        <div
          className="flex justify-center mt-4 cursor-pointer text-secondary hover:text-secondary/80  font-medium text-xl"
          onClick={() => setLimit((prev) => prev + 12)}
        >
          Load more
        </div>
      )}
    </div>
  );
};

export default NearbyClinicsAndHospitals;
