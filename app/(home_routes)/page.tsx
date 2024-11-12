import About from "../components/About";
import CampaignList from "../components/campaign/CampaignList";
import CreateWallet from "../components/CreateWallet";
import { fetchCampaigns } from "../utils/apiHelpers";

export default async function Home() {
  const campaigns = await fetchCampaigns(10, 0);
  return (
    <main className="py-4 space-y-4">
      <About />
      <div className="max-w-2xl lg:max-w-6xl mx-auto ">
        <div className="text-center mt-16   ">
          <h1 className="text-4xl lg:text-4xl font-customFont_bold mb-4 tracking-tight  ">
            Fund Your Campaigns
          </h1>
          <p className="mx-auto text-lg lg:text-xl">
            Fund your campaigns easliy. Fudn campaigns.
          </p>
        </div>
        <CampaignList listings={campaigns} />
      </div>
    </main>
  );
}
