import React, { useState, useRef, useEffect, useCallback } from "react";

const SearchableSelect = ({
  label,
  name,
  options = [],
  value,
  onChange,
  onBlur,
  placeholder = "Search or select...",
  error,
  touched,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(value || "");
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchInput.toLowerCase()),
  );
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = useCallback((e) => {
    setSearchInput(e.target.value);
    setIsOpen(true);
  }, []);

  const handleOptionSelect = useCallback(
    (option) => {
      setSearchInput(option);
      onChange({
        target: { name, value: option },
      });
      setIsOpen(false);
    },
    [name, onChange],
  );

  const handleInputFocus = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    onBlur?.({ target: { name } });
  }, [name, onBlur]);

  return (
    <div className="relative w-full">
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={searchInput}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className={`w-full p-2.5 text-gray-700 bg-white border ${
            error && touched ? "border-red-500" : "border-gray-300"
          } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
          autoComplete="off"
        />

        {isOpen && filteredOptions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 max-h-48 overflow-y-auto"
          >
            {filteredOptions.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleOptionSelect(option)}
                className="w-full text-left px-3 py-2 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none text-gray-700 text-sm"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {isOpen && filteredOptions.length === 0 && searchInput && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10">
            <button
              type="button"
              onClick={() => handleOptionSelect(searchInput)}
              className="w-full text-left px-3 py-2 hover:bg-blue-100 focus:bg-blue-100 focus:outline-none text-gray-700 text-sm"
            >
              Use &quot;{searchInput}&quot;
            </button>
          </div>
        )}
      </div>

      {error && touched && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SearchableSelect;
