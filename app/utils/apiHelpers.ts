export const fetchCampaigns = async (): Promise<any> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getCampaigns`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return response.json();
};
