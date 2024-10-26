import { ConnectButton } from "@rainbow-me/rainbowkit";

import CampaignList from "../components/campaign/CampaignList";
export const fetchCampaigns = async () => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getCampaigns`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.json();
};

export default async function Home() {
  const campaigns = await fetchCampaigns();
  console.log(campaigns);
  return (
    <main className="py-4 space-y-4">
      <CampaignList listings={campaigns} />
    </main>
  );
}
