import Button from "@/components/ui/Button";
import { Upload, Share2 } from "lucide-react";

const MedicalActions = () => {
  return (
    <div className="flex md:items-center max-md:flex-col gap-3">
      <Button variant="secondary" icon={Upload}>
        Upload Document
      </Button>
      <Button variant="grayOutline" icon={Share2}>
        Share Records
      </Button>
    </div>
  );
};

export default MedicalActions;
