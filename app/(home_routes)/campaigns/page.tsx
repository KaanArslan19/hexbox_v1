import CampaignList from "@/app/components/campaign/CampaignList";
import React from "react";
import { fetchCampaigns } from "../page";

export default async function CampaignsPage() {
  const campaigns = await fetchCampaigns();

  return (
    <div>
      <CampaignList listings={campaigns} />
    </div>
  );
}
