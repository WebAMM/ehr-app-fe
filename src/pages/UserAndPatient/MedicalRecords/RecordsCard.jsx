import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { Download, Eye } from "lucide-react";
import React from "react";

const RecordsCard = ({ filtered }) => {
  return (
    <div className="space-y-4">
      {filtered?.map((record) => (
        <Card key={record.id}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex gap-3 items-start">
              <Icon icon={record.icon} iconClass={record.color} bg />

              <div>
                <h3 className="font-medium text-text">{record.title}</h3>
                <p className="text-sm text-text opacity-60 mt-1">
                  {record.meta}
                </p>

                {record.description && (
                  <p className="text-sm text-text opacity-70 mt-2">
                    {record.description}
                  </p>
                )}

                <div className="flex gap-2 mt-3">
                  {record.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-secondary/5 text-secondary font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="grayOutline" size="sm" icon={Eye} />
              <Button variant="grayOutline" size="sm" icon={Download} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecordsCard;
