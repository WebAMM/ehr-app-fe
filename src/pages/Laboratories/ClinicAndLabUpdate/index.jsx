import ClinicAndLabUpdateForm from "@/components/common/ClinicAndLabUpdateForm";
import Card from "@/components/ui/Card";
import React from "react";

const ClinicAndLabUpdate = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      <Card padding="md" shadow="md">
        <div>
          <h2 className="text-lg font-semibold text-text mb-5">
            Update Clinic or Laboratory
          </h2>
        </div>
        <ClinicAndLabUpdateForm />
      </Card>
    </div>
  );
};

export default ClinicAndLabUpdate;
