import React, { useState } from "react";
import { Input as MTInput } from "@material-tailwind/react";
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
    height: height,
    width: width,
  };
  return (
    <div className={` ${containerClass}`}>
      <div className="relative">
        <MTInput
          style={customStyles}
          type={inputType}
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          disabled={disabled}
          error={Boolean(error)}
          className={className}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...props}
        />

        {isPasswordType && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
