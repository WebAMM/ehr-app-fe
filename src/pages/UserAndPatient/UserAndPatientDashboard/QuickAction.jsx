import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
const QuickAction = ({ icon: IconComponent, title, desc, style }) => (
  <Card className={`${style?.cardBg || ""}`} shadow="md" padding="md" hover>
    <div className="flex items-center gap-4">
      <Icon icon={IconComponent} iconClass={style?.iconColor || ""} bg={true} />
      <div className={`flex flex-col ${style?.cardText || ""}`}>
        <p className="font-medium text-lg">{title}</p>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
    </div>
  </Card>
);

export default QuickAction;
