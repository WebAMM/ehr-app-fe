import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import Card from "@/components/ui/Card";
import StickyHeader from "@/components/ui/StickyHeader";
import PageHeader from "@/components/ui/PageHeader";
import { FaqSkeleton } from "@/components/ui/Loader";

const FAQ_DATA = [
  {
    id: 1,
    tag: "Appointments",
    question: "How do I book an appointment?",
    answer:
      "You can book an appointment from the Appointments section by selecting a doctor and available time slot.",
  },
  {
    id: 2,
    tag: "Appointments",
    question: "How do I cancel or reschedule an appointment?",
    answer:
      "Appointments can be cancelled or rescheduled from your dashboard up to 24 hours before the scheduled time.",
  },
  {
    id: 3,
    tag: "Subscription",
    question: "What subscription plans are available?",
    answer:
      "We offer monthly and yearly subscription plans with different feature sets.",
  },
  {
    id: 4,
    tag: "Payments",
    question: "How do I update my payment method?",
    answer:
      "You can update your payment method from the Billing section in settings.",
  },
  {
    id: 5,
    tag: "Security",
    question: "Is my medical information secure?",
    answer:
      "Yes, all medical data is encrypted and compliant with industry security standards.",
  },
];

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
            <Card>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text opacity-50" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for help..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </Card>

            <Card title="Frequently Asked Questions">
              {loading ? (
                <FaqSkeleton />
              ) : filteredFaqs.length === 0 ? (
                <p className="text-sm text-text opacity-60">
                  No results found.
                </p>
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
                          <div className="p-3 text-sm text-text opacity-70 bg-secondary/10 rounded-b-lg    ">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          <div className="space-y-6">
            <Card title="Contact Support">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
                  <MessageSquare className="text-green-600 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Live Chat</p>
                    <p className="text-xs opacity-70">Available 24/7</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
                  <Phone className="text-blue-600 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Call Us</p>
                    <p className="text-xs opacity-70">+221 77 123 4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-50">
                  <Mail className="text-purple-600 w-5 h-5" />
                  <div>
                    <p className="text-sm font-medium">Email Us</p>
                    <p className="text-xs opacity-70">support@tracksante.sn</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card
              parentClass="bg-linear-to-br from-secondary to-tertiary "
              className="text-white"
            >
              <h3 className="font-semibold mb-3">Support Hours</h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8AM - 8PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9AM - 6PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10AM - 4PM</span>
                </div>
              </div>

              <p className="text-xs mt-4 opacity-90">
                Emergency support available 24/7 via live chat
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
