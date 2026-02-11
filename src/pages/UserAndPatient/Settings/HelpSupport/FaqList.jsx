import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import Card from "@/components/ui/Card";
import { FaqSkeleton } from "@/components/ui/Loader";

const FaqList = ({ loading, filteredFaqs, activeId, toggleAccordion }) => {
  return (
    <Card title="Frequently Asked Questions">
      {loading ? (
        <FaqSkeleton />
      ) : filteredFaqs.length === 0 ? (
        <p className="text-sm text-text opacity-60">No results found.</p>
      ) : (
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = activeId === faq.id;

            return (
              <div
                key={faq.id}
                className="border border-border rounded-lg px-3"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between py-4 text-left hover:bg-secondary/5 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                      {faq.tag}
                    </span>
                    <p className="text-sm font-medium text-text">
                      {faq.question}
                    </p>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-secondary" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-text opacity-40" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-3 text-sm text-text opacity-70 bg-secondary/10 rounded-b-lg">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default FaqList;
