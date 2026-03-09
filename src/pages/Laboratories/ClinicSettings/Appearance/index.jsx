import React, { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const ThemeOption = ({ label, value, selected, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(value)}
    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
      selected
        ? "border-secondary bg-secondary/10 text-secondary"
        : "border-border text-gray-600 hover:border-gray-300"
    }`}
  >
    <div
      className={`w-10 h-10 rounded-full ${
        value === "light"
          ? "bg-white border border-gray-200"
          : value === "dark"
            ? "bg-gray-900"
            : "bg-linear-to-br from-white to-gray-900"
      }`}
    />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const ClinicSettingsAppearance = () => {
  const [theme, setTheme] = useState("light");
  const [fontSize, setFontSize] = useState("medium");

  return (
    <div className="w-full space-y-4">
      <Card title="Theme" padding="lg" shadow="sm" parentClass="rounded-2xl">
        <div className="flex flex-wrap gap-4">
          <ThemeOption
            label="Light"
            value="light"
            selected={theme === "light"}
            onSelect={setTheme}
          />
          <ThemeOption
            label="Dark"
            value="dark"
            selected={theme === "dark"}
            onSelect={setTheme}
          />
          <ThemeOption
            label="System"
            value="system"
            selected={theme === "system"}
            onSelect={setTheme}
          />
        </div>
      </Card>

      <Card
        title="Font Size"
        padding="lg"
        shadow="sm"
        parentClass="rounded-2xl"
      >
        <div className="flex flex-wrap gap-3">
          {["small", "medium", "large"].map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => setFontSize(size)}
              className={`px-5 py-2 rounded-xl border-2 capitalize text-sm font-medium transition-all duration-200 ${
                fontSize === size
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border text-gray-600 hover:border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <Button variant="primary" size="md">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ClinicSettingsAppearance;
