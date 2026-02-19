import React from "react";
import { LoaderCenter } from "./Loader";

const Button = ({
  children,
  type = "button",
  variant = "secondary",
  size = "md",
  disabled = false,
  loading = false,
  onClick,
  loaderSize = 30,
  className = "cursor-pointer",
  icon: Icon = null,
  iconPosition = "left",
  fullWidth = false,
  ...props
}) => {
  const baseClasses =
    "relative overflow-hidden flex justify-center items-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed gap-2 cursor-pointer";

  const variants = {
    primary:
      "text-white bg-primary hover:bg-primary-dark focus:ring-primary border border-transparent active:bg-primary-darker",
    secondary:
      "text-white bg-secondary hover:bg-secondary-dark focus:ring-secondary border border-transparent active:bg-secondary-darker",
    success:
      "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent active:bg-green-800",
    danger:
      "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent active:bg-red-800",
    gradient:
      "text-white bg-gradient-to-r from-secondary to-primary/80 hover:bg- focus:ring-emerald-500 border-0  active:from-[#0ABF73] active:to-[#28D998] transition-all duration-300",
    successOutline:
      "text-secondary bg-white hover:bg-secondary/10 focus:ring-secondary border border-secondary active:bg-secondary/20",
    dangerOutline:
      "text-red-600 bg-white hover:bg-red-50 focus:ring-red-500 border border-red-600 active:bg-red-100",
    grayOutline:
      "text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 border border-gray-300 active:bg-gray-100",
    ghost:
      "text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-500 border border-transparent active:bg-gray-200",
    link: "text-secondary hover:underline focus:ring-secondary bg-transparent", // No background, secondary text, hover underline
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
