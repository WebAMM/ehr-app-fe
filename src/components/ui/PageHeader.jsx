import React from "react";

const PageHeader = ({
  title,
  subtitle,
  align = "left",
  size = "md",
  className = "",
}) => {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const sizeClasses = {
    sm: { title: "text-xl", subtitle: "text-sm" },
    md: { title: "text-2xl", subtitle: "text-base" },
    lg: { title: "text-3xl", subtitle: "text-lg" },
  };

  return (
    <div className={`mb-6 ${alignClasses[align]} ${className}`}>
      <h1 className={`font-bold text-text ${sizeClasses[size].title} mb-2`}>
        {title}
      </h1>
      {subtitle && (
        <p className={`text-text opacity-70 ${sizeClasses[size].subtitle}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
