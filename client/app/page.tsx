"use client";

import { useState, useEffect } from "react";
import { Campaign, CampaignFilter } from "@/types/campaign";
import CampaignTable from "@/components/CampaignTable";
import FilterDropdown from "@/components/FilterDropdown";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const CAMPAIGNS_ENDPOINT = `${API_BASE_URL}/campaigns`;

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [currentFilter, setCurrentFilter] = useState<CampaignFilter>("All");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(CAMPAIGNS_ENDPOINT);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch campaigns: ${response.status} ${response.statusText}`
          );
        }

        const data: Campaign[] = await response.json();
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
        console.error("Error fetching campaigns:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  useEffect(() => {
    if (currentFilter === "All") {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter(
        (campaign) => campaign.status === currentFilter
      );
      setFilteredCampaigns(filtered);
    }
  }, [campaigns, currentFilter]);

  const handleFilterChange = (filter: CampaignFilter) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Campaign Dashboard
          </h1>
          <p className="mt-3 text-gray-600 text-lg">
            Monitor and analyze your campaign performance
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 absolute top-0"></div>
            </div>
            <span className="ml-4 text-xl text-gray-700 font-medium">
              Loading campaigns...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-6 mb-8 shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-base font-semibold text-red-800">
                  Error loading campaigns
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-white">
                  Campaign Overview
                </h2>
                <FilterDropdown
                  currentFilter={currentFilter}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="p-8">
              <CampaignTable campaigns={filteredCampaigns} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
