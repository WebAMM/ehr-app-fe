import React, { useState } from "react";
import { Check, Smartphone, CreditCard } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import Icon from "@/components/ui/Icon";

const plans = [
  {
    id: "basic",
    title: "Basic",
    price: "5,000 FCFA",
    features: [
      "Up to 2 consultations per month",
      "Access to general practitioners",
      "Basic health records",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "standard",
    title: "Standard",
    price: "10,000 FCFA",
    features: [
      "Up to 5 consultations per month",
      "Access to all specialists",
      "Full health records management",
      "Priority email support",
      "Prescription management",
      "Lab test booking",
    ],
    popular: true,
  },
  {
    id: "premium",
    title: "Premium",
    price: "20,000 FCFA",
    features: [
      "Unlimited consultations",
      "Access to all specialists",
      "Complete health records",
      "24/7 priority support",
      "Prescription management",
      "Lab test booking",
      "Home visit option",
      "Health insurance integration",
    ],
    popular: false,
  },
];

const payments = [
  { id: "om", icon: Smartphone, label: "Orange Money", sub: "Mobile payment" },

  {
    id: "card",
    icon: CreditCard,
    label: "Credit Card",
    sub: "Visa, Mastercard",
  },
];

const SubscriptionPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState("standard");

  return (
    <div className="bg-pageBackground p-10 space-y-10">
      <PageHeader
        title="Subscription Plans"
        subtitle="Choose the plan that fits your needs"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const active = selectedPlan === plan.id;

          return (
            <Card
              key={plan.id}
              padding="lg"
              className={`space-y-6 ${plan.popular ? "pt-8" : ""}`}
              parentClass={`relative ${active ? "ring-2 ring-secondary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-secondary text-white text-xs font-medium text-center py-3 rounded-t-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-1">
                <h3 className="text-lg font-semibold">{plan.title}</h3>
                <p className="text-2xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal opacity-70">/month</span>
                </p>
              </div>

              <ul className="space-y-3">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <Check className="w-4 h-4 text-secondary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                fullWidth
                variant={active ? "secondary" : "grayOutline"}
                onClick={() => setSelectedPlan(plan.id)}
              >
                Choose Plan
              </Button>
            </Card>
          );
        })}
      </div>

      <Card title="Payment Methods" padding="lg">
        <div className="flex items-center justify-between gap-4">
          {payments.map((pay) => (
            <div
              key={pay.id}
              className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-gray-50 transition cursor-pointer w-full"
            >
              <Icon iconClass="text-secondary" bg={true} icon={pay.icon} />
              <div>
                <p className="text-sm font-medium">{pay.label}</p>
                <p className="text-xs opacity-70">{pay.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SubscriptionPlans;
