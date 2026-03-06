import ClinicAndLabUpdateForm from "@/components/common/ClinicAndLabUpdateForm";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { selectUser } from "@/redux";
import React from "react";
import { useSelector } from "react-redux";

const EditClinicProfile = () => {
  const user = useSelector(selectUser);
  return (
    <div className="w-full space-y-4">
      <PageHeader
        title="Update Clinic Profile"
        subtitle="Keep your clinic information up to date"
      />
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <ClinicAndLabUpdateForm
          initialData={user || {}}
          hideTypeField
          showIdentityFields
        />
      </Card>
    </div>
  );
};

export default EditClinicProfile;
