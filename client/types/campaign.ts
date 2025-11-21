export interface Campaign {
  id: number;
  name: string;
  status: "Active" | "Paused" | "Completed";
  clicks: number;
  cost: number;
  impressions: number;
}

export type CampaignFilter = "All" | "Active" | "Paused" | "Completed";
