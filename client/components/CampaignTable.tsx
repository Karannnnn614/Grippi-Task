import React from "react";
import { Campaign } from "@/types/campaign";

interface CampaignTableProps {
  campaigns: Campaign[];
}

export default function CampaignTable({ campaigns }: CampaignTableProps) {
  const formatCurrency = (amount: number): string => {
    return `₹${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-IN");
  };

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-5 shadow-lg">
          <svg
            className="w-10 h-10 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <p className="text-gray-700 text-xl font-semibold">
          No campaigns found
        </p>
        <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
          <tr>
            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Campaign Name
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Status
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Cost
            </th>
            <th className="px-8 py-5 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
              Impressions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {campaigns.map((campaign, index) => (
            <tr
              key={campaign.id}
              className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
              }`}
            >
              <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-900">
                {campaign.name}
              </td>

              <td className="px-8 py-5 whitespace-nowrap text-sm">
                <span
                  className={`inline-flex items-center px-4 py-2 text-xs font-bold rounded-full shadow-sm ${
                    campaign.status === "Active"
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                      : campaign.status === "Paused"
                      ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white"
                      : "bg-gradient-to-r from-blue-400 to-cyan-500 text-white"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-2 animate-pulse ${
                      campaign.status === "Active"
                        ? "bg-white"
                        : campaign.status === "Paused"
                        ? "bg-white"
                        : "bg-white"
                    }`}
                  ></span>
                  {campaign.status}
                </span>
              </td>

              <td className="px-8 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatNumber(campaign.clicks)}
              </td>

              <td className="px-8 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatCurrency(campaign.cost)}
              </td>

              <td className="px-8 py-5 whitespace-nowrap text-sm font-semibold text-gray-900">
                {formatNumber(campaign.impressions)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
