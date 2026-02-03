import React from "react";
const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = "",
  shadow = "md",
  padding = "sm",
  border = true,
  hover = false,
}) => {
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  return (
    <div
      className={`bg-bg rounded-lg ${border ? "border border-border" : ""} ${shadowClasses[shadow]} ${paddingClasses[padding]} ${hover ? "hover:shadow-lg transition-shadow" : ""}`}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-text">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-text opacity-70">{subtitle}</p>
          )}
        </div>
      )}
      <div className={`text-text ${className}`}>{children}</div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-border">{footer}</div>
      )}
    </div>
  );
};

export default Card;
