import React, { useState } from "react";
import { Check, Smartphone, CreditCard } from "lucide-react";
import Card from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import Icon from "@/components/ui/Icon";
import { authCookies } from "@/utils/cookieUtils";
import OrangePayModel from "@/Models/OrangePayModel";
import { BsCashStack } from "react-icons/bs";
import { useAddSubscriptionMutation } from "@/services";
import Swal from "sweetalert2";
import { LoaderCenter } from "@/components/ui/Loader";

const plans = [
  {
    id: "premium",
    title: "",
    price: "3,000 FCFA",
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
  {
    id: "orangeMoney",
    icon: Smartphone,
    label: "Orange Money",
    sub: "Mobile payment",
  },

  {
    id: "cash",
    icon: BsCashStack,
    label: "Cash",
    sub: "Pay with cash",
  },
];

const SubscriptionPlans = () => {
  const [isOrangePayModelOpen, setIsOrangePayModelOpen] = useState(false);
  const { getUser } = authCookies;
  const user = getUser();
  const userType = user?.status;
  const [addSubscription, { isLoading: isAddingSubscription }] =
    useAddSubscriptionMutation();

  const handleSubscribe = async () => {
    try {
      const result = await Swal.fire({
        title: "Confirm Subscription",
        text: `Subscribe for 3,000 FCFA per year?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#10b981",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, subscribe!",
      });

      if (result.isConfirmed) {
        const payload = {
          subscription: "3,000",
          type: "yearly",
          paymentMethod: "cash",
        };
        const response = await addSubscription({ body: payload }).unwrap();
        if (response.success) {
          Swal.fire({
            title: "Success!",
            text: response.message || "Subscription successful!",
            icon: "success",
            confirmButtonColor: "#10b981",
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.data?.message || "Error subscribing. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="bg-pageBackground p-10 space-y-10">
      <PageHeader
        title="Subscription Plans"
        subtitle="Choose the plan that fits your needs"
      />
      <div className="">
        {plans.map((plan) => {
          return (
            <Card
              key={plan.id}
              padding="lg"
              className={`space-y-6 ${plan.popular ? "pt-8" : ""}`}
              parentClass={`relative ring-2 ring-secondary`}
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
                  <span className="text-sm font-normal opacity-70">/year</span>
                </p>
              </div>

              <ul className="grid col-span-2 gap-4 w-full">
                {plan.features.map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <Check className="w-4 h-4 text-secondary mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>

      <Card title="Payment Methods" padding="lg">
        <div className="flex items-center justify-between gap-4">
          {payments.map((pay) => {
            const isLoading = pay.id === "cash" && isAddingSubscription;
            return (
              <div
                key={pay.id}
                className={`flex items-center gap-4 p-4 border rounded-lg transition-all duration-300 cursor-pointer w-full ${
                  isLoading
                    ? "border-gray-300 bg-gray-50 opacity-70 pointer-events-none"
                    : "border-border hover:bg-secondary/10 hover:border-secondary"
                }`}
                onClick={() => {
                  if (pay.id === "orangeMoney") {
                    setIsOrangePayModelOpen(true);
                  } else if (pay.id === "cash") {
                    handleSubscribe();
                  }
                }}
              >
                <Icon
                  iconClass={isLoading ? "text-gray-400" : "text-secondary"}
                  bg={true}
                  icon={pay.icon}
                />
                <div className="flex-1">
                  <p
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isLoading ? "text-gray-500" : "text-foreground"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        Processing <LoaderCenter size={18} />
                      </>
                    ) : (
                      pay.label
                    )}
                  </p>
                  <p
                    className={`text-xs ${isLoading ? "text-gray-400" : "opacity-70"}`}
                  >
                    {isLoading ? "Please wait..." : pay.sub}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
      <OrangePayModel
        isOpen={isOrangePayModelOpen}
        onClose={() => setIsOrangePayModelOpen(false)}
      />
    </div>
  );
};

export default SubscriptionPlans;
