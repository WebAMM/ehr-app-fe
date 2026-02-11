import React, { useEffect, useMemo, useState } from "react";
import StickyHeader from "@/components/ui/StickyHeader";
import PageHeader from "@/components/ui/PageHeader";
import { FAQ_DATA } from "./faqData";
import FaqSearch from "./FaqSearch";
import FaqList from "./FaqList";
import ContactSupport from "./ContactSupport";
import SupportHours from "./SupportHours";

const HelpSupport = () => {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setFaqs(FAQ_DATA);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.tag.toLowerCase().includes(search.toLowerCase()),
    );
  }, [faqs, search]);

  const toggleAccordion = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-pageBackground">
      <StickyHeader linkTo="/settings" linkText="Back to Settings" />

      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader
          title="Help & Support"
          subtitle="Get assistance and find answers to your questions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">
            {/* SEARCH */}
            <FaqSearch search={search} setSearch={setSearch} />

            <FaqList
              loading={loading}
              filteredFaqs={filteredFaqs}
              activeId={activeId}
              toggleAccordion={toggleAccordion}
            />
          </div>

          <div className="space-y-6">
            <ContactSupport />

            <SupportHours />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
