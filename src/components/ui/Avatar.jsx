import React from "react";
import Avatar from "react-avatar";

const CustomAvatar = ({
  name,
  size = "48",
  round = true,
  bgColor = "#C2184B",
  fgColor = "#fff",
}) => {
  return (
    <Avatar
      name={name}
      size={size}
      round={round}
      color={bgColor}
      fgColor={fgColor}
      className="shadow-md"
    />
  );
};

export default CustomAvatar;
