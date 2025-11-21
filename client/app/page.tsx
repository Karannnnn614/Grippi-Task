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
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Campaign Analytics Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor and analyze your campaign performance
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-lg text-gray-700">
              Loading campaigns...
            </span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
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
                <h3 className="text-sm font-medium text-red-800">
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
          <>
            <FilterDropdown
              currentFilter={currentFilter}
              onFilterChange={handleFilterChange}
            />

            <CampaignTable campaigns={filteredCampaigns} />

            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Total Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaigns.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Filtered Results</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {filteredCampaigns.length}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold text-green-600">
                    {campaigns.filter((c) => c.status === "Active").length}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
