import React from "react";
import { LoaderCenter } from "./Loader";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  loaderSize,
  className = "cursor-pointer",
  icon: Icon = null,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "relative flex justify-center items-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed gap-2 cursor-pointer";

  const variants = {
    primary:
      "text-white bg-[#0090E0] hover:bg-[#0077B8] focus:ring-blue-500 border border-transparent active:bg-[#006099]",
    success:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent active:bg-green-800",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent active:bg-red-800",
    gradient:
      "text-white bg-gradient-to-r from-[#0EBE7F] to-[#06583B] hover:bg- focus:ring-emerald-500 border border-transparent active:from-[#0ABF73] active:to-[#28D998] transition-all duration-300",

    primaryOutline:
      "text-[#0090E0] bg-white hover:bg-blue-50 focus:ring-blue-500 border border-[#0090E0] active:bg-blue-100",
    successOutline:
      "text-green-600 bg-white hover:bg-green-50 focus:ring-green-500 border border-green-600 active:bg-green-100",
    dangerOutline:
      "text-red-600 bg-white hover:bg-red-50 focus:ring-red-500 border border-red-600 active:bg-red-100",
    grayOutline:
      "text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 border border-gray-300 active:bg-gray-100",
    secondary:
      "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 border border-transparent active:bg-gray-300",
    ghost:
      "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500 border border-transparent active:bg-gray-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg",
  };

  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;
  const widthClasses = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <LoaderCenter size={loaderSize} />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon size={18} />}
          {children}
          {Icon && iconPosition === "right" && <Icon size={18} />}
        </>
      )}
    </button>
  );
};

export default Button;
