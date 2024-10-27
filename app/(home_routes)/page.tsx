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
      <div className="text-center mt-16">
        <h1 className="text-4xl lg:text-5xl font-customFont_bold mb-4 tracking-tight  ">
          Fund Your Campaigns
        </h1>
        <p className="mx-auto text-lg lg:text-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
          dolorem nobis quibusdam deserunt temporibus neque, quo et delectus
          ullam quos, iste recusandae distinctio repellat! At labore excepturi
          est saepe laudantium.
        </p>
      </div>
      <CampaignList listings={campaigns} />
    </main>
  );
}
