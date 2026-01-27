const Icon = ({
  icon: IconComponent,
  iconClass = "text-gray-500",
  bg = false,
  className = "",
}) => {
  return (
    <div
      className={`p-2 rounded flex items-center justify-center ${className}`}
    >
      {IconComponent && (
        <IconComponent
          className={`w-12 h-12 ${iconClass} ${
            bg ? "bg-current/20 rounded-lg px-3 py-2" : ""
          }`}
        />
      )}
    </div>
  );
};

export default Icon;
