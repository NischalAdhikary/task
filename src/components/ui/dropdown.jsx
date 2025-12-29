import React, { useRef, useEffect } from "react";

export default function DropdownMenu({
  options,
  onSelect,
  open,
  onClose,
  value,
}) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10"
        >
          {options.map((option, idx) => (
            <button
              key={idx}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${
                option.value === value.status ? "bg-blue-500" : ""
              }`}
              onClick={() => {
                onSelect(value.id, option.value);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
