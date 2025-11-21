import React from "react";
import { CampaignFilter } from "@/types/campaign";

interface FilterDropdownProps {
  currentFilter: CampaignFilter;
  onFilterChange: (filter: CampaignFilter) => void;
}

export default function FilterDropdown({
  currentFilter,
  onFilterChange,
}: FilterDropdownProps) {
  const filterOptions: CampaignFilter[] = ["All", "Active", "Paused"];

  return (
    <div className="mb-6">
      <label
        htmlFor="status-filter"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Filter by Status
      </label>
      <select
        id="status-filter"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value as CampaignFilter)}
        className="block w-full md:w-64 px-4 py-2 text-base border border-gray-300 
                   rounded-lg shadow-sm focus:outline-none focus:ring-2 
                   focus:ring-blue-500 focus:border-blue-500 bg-white 
                   hover:border-gray-400 transition-colors cursor-pointer"
      >
        {filterOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
