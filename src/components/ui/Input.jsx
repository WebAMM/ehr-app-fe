import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  error = "",
  className = "",
  containerClass = "",
  height,
  width,
  onBlur,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType
    ? showPassword
      ? "text"
      : "password"
    : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const customStyles = {
    height: height ? `${height}px` : "48px",
    width: width ? `${width}px` : "100%",
  };

  return (
    <div className={`${containerClass}`}>
      <div className="relative">
        {label && (
          <label
            htmlFor={name}
            className="block text-start text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <input
          id={name}
          style={customStyles}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setFocused(true)}
          name={name}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-3 border ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-[#0ebe7f] focus:ring-[#0ebe7f]"
          } rounded-lg outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            className="absolute right-3 top-[70%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={togglePasswordVisibility}
            disabled={disabled}
          >
            {showPassword ? (
              <FaEyeSlash className="h-5 w-5" />
            ) : (
              <FaEye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
