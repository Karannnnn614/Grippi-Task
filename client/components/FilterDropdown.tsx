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
  const filterOptions: CampaignFilter[] = [
    "All",
    "Active",
    "Paused",
    "Completed",
  ];

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="status-filter"
        className="text-sm font-semibold text-white"
      >
        Filter:
      </label>
      <select
        id="status-filter"
        value={currentFilter}
        onChange={(e) => onFilterChange(e.target.value as CampaignFilter)}
        className="px-5 py-2.5 text-sm font-medium border-2 border-white/30 
                   rounded-xl shadow-lg focus:outline-none focus:ring-2 
                   focus:ring-white focus:border-white bg-white/20 backdrop-blur-sm
                   hover:bg-white/30 transition-all cursor-pointer text-white
                   appearance-none bg-no-repeat bg-right pr-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
          backgroundSize: "1.2em",
          backgroundPosition: "right 0.5rem center",
        }}
      >
        {filterOptions.map((option) => (
          <option
            key={option}
            value={option}
            className="text-gray-900 bg-white"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
