import { useState } from "react";
import Button from "../ui/button";

export default function TaskFilter({ onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "done", label: "Completed" },
  ];

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          variant={"primary"}
          key={filter.id}
          onClick={() => handleFilterClick(filter.id)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeFilter === filter.id
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}
