import ProfileChangePassword from "@/components/common/ProfilesSetting/ChangePassword";
import StickyHeader from "@/components/ui/StickyHeader";

const UpdateUserPassword = () => {
  return (
    <div>
      <StickyHeader linkTo="/settings" linkText="Back to settings" />
      <ProfileChangePassword />
    </div>
  );
};

export default UpdateUserPassword;
