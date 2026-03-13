import React from "react";
import PageHeader from "@/components/ui/PageHeader";
import StickyHeader from "@/components/ui/StickyHeader";
import { useGetUserByIdQuery } from "@/services";
import UserProfileForm from "@/components/common/UserUpdateForm";

const EditProfilePage = () => {
  const { data: userData, isLoading, isError } = useGetUserByIdQuery();

  return (
    <div className="bg-pageBackground min-h-screen sm:p-6 lg:p-7">
      <StickyHeader linkTo="/settings" linkText="Back to settings" />
      <div className="max-w-4xl space-y-6 mt-3  p-4">
        <PageHeader
          title="Edit Profile"
          subtitle="Update your personal information"
        />
        <div>
          <UserProfileForm
            userData={userData?.data}
            isLoading={isLoading}
            isError={isError}
            isEditMode={true}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
