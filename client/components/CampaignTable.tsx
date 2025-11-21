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
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No campaigns found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Campaign Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Clicks
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cost
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Impressions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {campaign.name}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatNumber(campaign.clicks)}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatCurrency(campaign.cost)}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {formatNumber(campaign.impressions)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
