import React from "react";

export default function Button({ variant, className, children, ...props }) {
  const base = "px-4 py-2 rounded font-semibold";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-400",
    secondary: "bg-gray-200 text-black hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-400",
    success: "bg-green-500 text-white hover:bg-green-400",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className} `} {...props}>
      {children}
    </button>
  );
}
