import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { FlaskConical, FileBarChart2, Lock, Link } from "lucide-react";

const STATS = [
  {
    label: "Prescriptions",
    value: "3",
    icon: Link,
    color: "text-blue-500",
  },
  {
    label: "Lab Results",
    value: "3",
    icon: FlaskConical,
    color: "text-green-500",
  },
  {
    label: "Medical Reports",
    value: "2",
    icon: FileBarChart2,
    color: "text-purple-500",
  },
  {
    label: "Secure & Private",
    value: "100%",
    icon: Lock,
    color: "text-red-400",
  },
];

const MedicalStats = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-4">
      {STATS.map((item) => (
        <Card key={item.label}>
          <div className="flex items-center justify-between gap-3">
            <Icon icon={item.icon} iconClass={item.color} bg={true} />
            <p className="font-semibold text-text text-xl">{item.value}</p>
          </div>
          <p className=" text-text opacity-60 text-sm">{item.label}</p>
        </Card>
      ))}
    </div>
  );
};

export default MedicalStats;
