import { ArrowUpDown } from "lucide-react";

export default function TaskSort({ onSortChange }) {
  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown size={18} className="text-gray-600" />
      <select
        onChange={handleSortChange}
        className="px-4 py-2 border rounded-lg bg-white text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort by</option>
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="date-asc">Date (Oldest)</option>
        <option value="date-desc">Date (Newest)</option>
      </select>
    </div>
  );
}
