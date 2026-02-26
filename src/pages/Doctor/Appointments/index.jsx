import React, { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import AppointmentTabs from "./AppointmentTabs";
import AppointmentCard from "./AppointmentCard";
import { useGetTodaysAppointmentsQuery } from "@/services";
import { authCookies } from "@/utils/cookieUtils";
import Button from "@/components/ui/Button";
import { Loader } from "lucide-react";
import { SectionLoaderCenter } from "@/components/ui/Loader";
import Error from "@/components/ui/Error";
const AppointmentsPage = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const { getUser } = authCookies;
  const [limit, setLimit] = useState(10);
  const doctorId = getUser()?._id;
  const {
    data: appointmentsData,
    isLoading: appointmentsLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetTodaysAppointmentsQuery({
    doctorId: doctorId,
    status: activeTab,
    page: 1,
    limit,
  });
  let totalCount = appointmentsData?.pagination?.totalCount || 0;
  const filteredAppointments =
    appointmentsData?.data?.filter(
      (item) => item.status?.toLowerCase() === activeTab.toLowerCase(),
    ) || [];
  const handleLoadMore = () => {
    if (limit <= totalCount) {
      setLimit(limit + 10);
    }
  };
  return (
    <div className="p-6 space-y-6 bg-pageBackground min-h-screen">
      <PageHeader
        title="Appointments"
        subtitle="Manage your appointment schedule and history"
        size="lg"
      />
      <AppointmentTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setLimit={setLimit}
      />
      <div className="space-y-6">
        {appointmentsLoading || isFetching ? (
          <SectionLoaderCenter />
        ) : isError ? (
          <Error
            error={error}
            refetch={refetch}
            message="An error occurred while loading appointments."
          />
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
            <div className="text-center">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Appointments Found
              </h3>
              <p className="text-gray-600">
                You don't have any {activeTab} appointments at the moment.
              </p>
            </div>
          </div>
        ) : (
          filteredAppointments?.map((item) => (
            <AppointmentCard key={item.id} data={item} onUpdate={refetch} />
          ))
        )}
      </div>
      {filteredAppointments.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            onClick={handleLoadMore}
            variant="secondary"
            disabled={limit >= totalCount || isFetching}
            className="disabled:bg-gray-300 disabled:cursor-not-allowed shadow-xl flex items-center gap-2"
          >
            {isFetching ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Show more"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
