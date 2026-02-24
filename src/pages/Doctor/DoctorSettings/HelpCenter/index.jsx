import React, { useState, useMemo } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

const DoctorSettingsHelpCenter = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      id: 1,
      question: "How do I schedule an appointment?",
      answer:
        "You can schedule an appointment through our platform by selecting the available time slot. Simply navigate to the appointments section, choose your preferred date and time, and confirm the booking.",
    },
    {
      id: 2,
      question: "Can I reschedule or cancel appointment",
      answer:
        "Yes, you can reschedule or cancel appointments up to 24 hours before the scheduled time. Go to your appointments list, select the appointment you want to modify, and choose either reschedule or cancel option.",
    },
    {
      id: 3,
      question: "How do I update my profile information?",
      answer:
        "You can update your profile information by going to the Settings section. Click on Edit Profile and modify your details like specialization, experience, contact information, and availability.",
    },
    {
      id: 4,
      question: "How do I manage my consultation fees?",
      answer:
        "You can set and update your consultation fees in the Doctor Settings. Navigate to Profile Settings and enter your desired consultation fee amount.",
    },
    {
      id: 5,
      question: "How do I view patient reviews?",
      answer:
        "All patient reviews are displayed in the Reviews section under Doctor Settings. You can see ratings, review text, and timestamps for all patient feedback.",
    },
  ];

  const contactInfo = [
    {
      id: 1,
      icon: MessageCircle,
      title: "WhatsApp",
      detail: "( 480 ) 555 - 0103",
      href: "https://wa.me/4805550103",
    },
  ];

  // Filter FAQs based on search
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  return (
    <div className="w-full space-y-6">
      {/* FAQ Section */}
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-text mb-4">FAQ's</h2>
          <Input
            type="text"
            placeholder="Search ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            height={40}
          />
        </div>

        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-text text-left">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary  transition-transform duration-300 ${
                      expandedFaq === faq.id ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 py-4 bg-white border-t border-gray-200">
                    <p className="text-sm text-primary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-primary">
                No FAQs found matching your search.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Contact Us Section */}
      <Card padding="lg" shadow="sm" parentClass="rounded-2xl">
        <h2 className="text-2xl font-semibold text-text mb-6">Contact Us</h2>

        <div className="space-y-4">
          {contactInfo.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.id}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-xl border border-gray-200 hover:border-secondary hover:bg-secondary/5 transition-all cursor-pointer"
              >
                <div className="shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-text text-sm">
                    {contact.title}
                  </p>
                  <p className="text-sm text-primary mt-1">{contact.detail}</p>
                </div>
              </a>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default DoctorSettingsHelpCenter;
