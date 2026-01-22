import React from "react";
import { Checkbox as MTCheckbox } from "@material-tailwind/react";

const Checkbox = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  color = "green",
  className = "",
  labelClassName = "",
  ...props
}) => {
  return (
    <MTCheckbox
      checked={checked}
      onChange={onChange}
      name={name}
      disabled={disabled}
      color={color}
      className={className}
      label={
        <span className={`text-sm text-gray-700 ${labelClassName}`}>
          {label}
        </span>
      }
      {...props}
    />
  );
};

export default Checkbox;
