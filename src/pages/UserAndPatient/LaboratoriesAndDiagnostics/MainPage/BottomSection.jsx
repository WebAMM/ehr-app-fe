import React from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Home, TrendingUp } from "lucide-react";

const BottomSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="flex flex-col items-start gap-4 bg-primary/5 border-primary">
        <div className="flex items-center gap-4">
          <Icon icon={Home} iconClass="text-secondary" bg={true} />
          <div>
            <h4 className="font-semibold text-text">Home Sample Collection</h4>
            <p className="text-sm text-text opacity-70">
              Get samples collected at home safely & conveniently
            </p>
          </div>
        </div>

        <Button variant="success" size="sm">
          Schedule Home Visit
        </Button>
      </Card>
      <Card className="flex flex-col items-start gap-4 bg-primary/5 border-primary ">
        <div className="flex items-center gap-4">
          <Icon icon={TrendingUp} iconClass="text-primary" bg={true} />
          <div>
            <h4 className="font-semibold text-text/70">
              Health Checkup Packages
            </h4>
            <p className="text-sm text-text opacity-70">
              Comprehensive packages at affordable prices
            </p>
          </div>
        </div>

        <Button variant="success" size="sm">
          View Packages
        </Button>
      </Card>
    </div>
  );
};

export default BottomSection;
