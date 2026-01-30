import React from "react";

const Checkbox = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  className = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <label
      className={`flex items-center cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        disabled={disabled}
        className={`w-4 h-4 text-[#0ebe7f] bg-gray-100 border-gray-300 rounded focus:ring-[#0ebe7f] focus:ring-2 cursor-pointer ${className}`}
        {...props}
      />
      {label && (
        <span className={`ml-2 text-sm text-gray-700 ${labelClassName}`}>
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;
