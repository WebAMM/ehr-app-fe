/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

// Custom Toast Container with styling
export const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="top-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body"
      progressClassName="custom-toast-progress"
      style={{
        zIndex: 9999,
      }}
    />
  );
};

// Custom Toast Options
const defaultOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
};

// Success Toast
export const toastSuccess = (message, options = {}) => {
  return toast.success(
    <div className="flex items-center gap-3">
      <FaCheckCircle className="text-xl text-green-500 shrink-0" />
      <span className="text-sm font-medium text-gray-800">{message}</span>
    </div>,
    {
      ...defaultOptions,
      ...options,
      className: "toast-success",
      progressStyle: { background: "#10b981" },
    },
  );
};

// Error Toast
export const toastError = (message, options = {}) => {
  return toast.error(
    <div className="flex items-center gap-3">
      <FaExclamationCircle className="text-xl text-red-500 shrink-0" />
      <span className="text-sm font-medium text-gray-800">{message}</span>
    </div>,
    {
      ...defaultOptions,
      ...options,
      className: "toast-error",
      progressStyle: { background: "#ef4444" },
    },
  );
};

// Warning Toast
export const toastWarning = (message, options = {}) => {
  return toast.warning(
    <div className="flex items-center gap-3">
      <FaExclamationTriangle className="text-xl text-yellow-500 shrink-0" />
      <span className="text-sm font-medium text-gray-800">{message}</span>
    </div>,
    {
      ...defaultOptions,
      ...options,
      className: "toast-warning",
      progressStyle: { background: "#f59e0b" },
    },
  );
};

// Info Toast
export const toastInfo = (message, options = {}) => {
  return toast.info(
    <div className="flex items-center gap-3">
      <FaInfoCircle className="text-xl text-blue-500 shrink-0" />
      <span className="text-sm font-medium text-gray-800">{message}</span>
    </div>,
    {
      ...defaultOptions,
      ...options,
      className: "toast-info",
      progressStyle: { background: "#3b82f6" },
    },
  );
};

// Promise Toast - useful for async operations
export const toastPromise = (promise, messages, options = {}) => {
  return toast.promise(
    promise,
    {
      pending: {
        render: messages.pending || "Processing...",
        icon: "🔄",
      },
      success: {
        render: messages.success || "Success!",
        icon: <FaCheckCircle className="text-green-500" />,
      },
      error: {
        render: messages.error || "Something went wrong!",
        icon: <FaExclamationCircle className="text-red-500" />,
      },
    },
    {
      ...defaultOptions,
      ...options,
    },
  );
};

// Custom Toast - for more control
export const toastCustom = (content, options = {}) => {
  return toast(content, {
    ...defaultOptions,
    ...options,
  });
};

// Dismiss all toasts
export const dismissAllToasts = () => {
  toast.dismiss();
};

// Dismiss specific toast by ID
export const dismissToast = (toastId) => {
  toast.dismiss(toastId);
};

export default {
  ToastContainer,
  toastSuccess,
  toastError,
  toastWarning,
  toastInfo,
  toastPromise,
  toastCustom,
  dismissAllToasts,
  dismissToast,
};
