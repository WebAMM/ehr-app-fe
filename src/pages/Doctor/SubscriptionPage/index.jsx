import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const SubscriptionPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("orange");

  return (
    <div className="bg-pageBackground p-5">
      <div className="max-w-5xl  space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Subscription Plan</h2>

          <div className="bg-secondary text-white rounded-xl p-6">
            <p className="text-sm opacity-80">Basic Subscription Plan</p>
            <p className="text-xs opacity-70 mb-3">For Doctor's</p>

            <div className="flex items-end gap-2">
              <h1 className="text-3xl font-bold">20,000 CFA</h1>
              <span className="text-sm opacity-80">/3 Month</span>
            </div>
          </div>
        </div>

        <Card>
          <h3 className="font-semibold mb-4">Features</h3>

          <ul className="space-y-3 text-sm text-primary">
            {[
              "Display government-issued authorization number to validate practice.",
              "Manage and store patient records online (prescriptions, assessments, exams).",
              "Direct communication with patients for online consultations and follow-ups.",
              "Ability to update patient files and send prescriptions digitally.",
            ].map((feature, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-emerald-500 mt-1">✔</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 space-y-3">
          <h3 className="font-semibold">Start Your Free Trial</h3>
          <p className="text-sm text-gray-600">
            Get 90 days of free access to all premium features. No credit card
            required.
          </p>

          <Button variant="success" size="md">
            Claim 7 Days Free Trial
          </Button>
        </div>

        <Card>
          <h3 className="font-semibold mb-4">Select Payment Method</h3>
          <p className="text-sm text-gray-500 mb-4">
            Pay for respective Account
          </p>

          <div className="space-y-3">
            {[
              { id: "orange", name: "Orange Money", number: "+2367290620" },

              { id: "cash", name: "Cash", number: "+2367290620" },
            ].map((method) => (
              <div
                key={method.id}
                onClick={() => setSelectedPayment(method.id)}
                className={`flex justify-between items-center border rounded-lg p-4 cursor-pointer transition 
              ${
                selectedPayment === method.id
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200"
              }`}
              >
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.number}</p>
                </div>

                <div
                  className={`w-4 h-4 rounded-full border 
                ${
                  selectedPayment === method.id
                    ? "bg-emerald-600 border-emerald-600"
                    : "border-gray-400"
                }`}
                />
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h3 className="font-semibold mb-4">Billing Details</h3>

          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-500">Next Payment on</span>
            <span>Mar 27, 2023</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Amount</span>
            <span className="text-emerald-600 font-semibold">20,000 CFA</span>
          </div>
        </Card>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm">
          <input type="checkbox" className="mt-1" />
          <p>
            By clicking "Sign Up," you agree to our{" "}
            <span className="text-emerald-600 font-medium">
              Terms and Conditions
            </span>
            .
          </p>
        </div>

        <div className="flex gap-4">
          <Button variant="success" fullWidth>
            Start 7 Days Free Trial
          </Button>

          <Button variant="grayOutline" fullWidth>
            Subscribe
          </Button>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="font-medium">Claim Request</p>
            <p className="text-sm text-gray-500">
              Your subscription claim is being processed
            </p>
          </div>

          <span className="bg-yellow-200 text-yellow-800 text-xs px-3 py-1 rounded-full">
            Pending
          </span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
