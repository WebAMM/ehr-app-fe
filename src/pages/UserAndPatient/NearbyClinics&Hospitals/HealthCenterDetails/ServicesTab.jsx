import { useGetClinicServiceQuery } from "@/services";
import { useState } from "react";

const ServicesTab = ({ clinicId }) => {
  const [search, setSearch] = useState("");
  const {
    data: clinicDetails,
    isLoading,
    error,
    isError,
  } = useGetClinicServiceQuery({
    id: clinicId,
  });
  const clinicServices = clinicDetails?.data?.services || [];

  const filteredServices = clinicServices.filter(
    (service) =>
      service.serviceName?.toLowerCase().includes(search.toLowerCase()) ||
      service.service?.toLowerCase().includes(search.toLowerCase()) ||
      service.serviceHeading?.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-primary animate-pulse text-lg font-semibold">
          Loading services...
        </span>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <span className="text-red-500 font-semibold">
          {error?.message || "Failed to load services."}
        </span>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.length === 0 && (
          <div className="col-span-full text-center text-gray-400 py-8">
            No services found.
          </div>
        )}
        {filteredServices.map((service) => (
          <div
            key={service._id}
            className="border border-border rounded-lg p-4 bg-white flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div>
              <h3 className="text-base font-semibold text-primary mb-1">
                {service.serviceHeading || service.serviceName}
              </h3>
              <p className="text-sm text-text mb-2 leading-relaxed">
                {service.serviceName}
                {service.serviceName && service.service ? ": " : ""}
                {service.service}
              </p>
              <p className="text-xs text-secondary font-medium mb-1">
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
  );
};

export default ServicesTab;
