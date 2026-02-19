import React from "react";
import {
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastPromise,
  dismissAllToasts,
} from "@/components/ui/Toast";
import Button from "@/components/ui/Button";

const ToastDemo = () => {
  const handleSuccessToast = () => {
    toastSuccess("Registration successful! Welcome aboard.");
  };

  const handleErrorToast = () => {
    toastError("Failed to process your request. Please try again.");
  };

  const handleWarningToast = () => {
    toastWarning("Please verify your email before continuing.");
  };

  const handleInfoToast = () => {
    toastInfo("Your profile has been updated successfully.");
  };

  const handlePromiseToast = () => {
    const myPromise = new Promise((resolve) => {
      setTimeout(() => resolve("Data loaded!"), 3000);
    });

    toastPromise(myPromise, {
      pending: "Loading data...",
      success: "Data loaded successfully!",
      error: "Failed to load data!",
    });
  };

  const handleDismissAll = () => {
    dismissAllToasts();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Toast Notification Demo
          </h1>
          <p className="text-gray-600 mb-8">
            Click the buttons below to see different types of toast
            notifications
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant="gradient"
              onClick={handleSuccessToast}
              className="py-3"
            >
              Show Success Toast
            </Button>

            <Button
              variant="secondary"
              onClick={handleErrorToast}
              className="py-3 bg-red-500 hover:bg-red-600 text-white"
            >
              Show Error Toast
            </Button>

            <Button
              variant="secondary"
              onClick={handleWarningToast}
              className="py-3 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Show Warning Toast
            </Button>

            <Button
              variant="secondary"
              onClick={handleInfoToast}
              className="py-3 bg-blue-500 hover:bg-blue-600 text-white"
            >
              Show Info Toast
            </Button>

            <Button
              variant="outline"
              onClick={handlePromiseToast}
              className="py-3"
            >
              Show Promise Toast
            </Button>

            <Button
              variant="grayOutline"
              onClick={handleDismissAll}
              className="py-3"
            >
              Dismiss All Toasts
            </Button>
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Usage Example
            </h2>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`import { toastSuccess, toastError, toastWarning, toastInfo } from "@/components/ui/Toast";

// Success notification
toastSuccess("Registration successful!");

// Error notification
toastError("Something went wrong!");

// Warning notification
toastWarning("Please verify your email!");

// Info notification
toastInfo("Profile updated successfully!");

// Promise notification
const promise = fetchData();
toastPromise(promise, {
  pending: "Loading...",
  success: "Data loaded!",
  error: "Failed to load!"
});`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
