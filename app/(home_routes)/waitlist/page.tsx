"use client";
import WaitListForm from "@/app/components/waitlist/WaitListForm";
import { WaitListCampaignInfo } from "@/app/types";
import { useRouter } from "next/navigation";
import React from "react";

export default function WaitListPage() {
  const router = useRouter();

  const handleCreateWaitListCampaign = async (
    token: string,
    values: WaitListCampaignInfo
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("mail", values.mail);

      formData.append("description", values.description);
      formData.append("location", values.location);
      if (values.discord) formData.append("discord", values.discord);
      if (values.telegram) formData.append("telegram", values.telegram);
      if (values.linkedIn) formData.append("linkedIn", values.linkedIn);
      if (values.website) formData.append("website", values.website);
      formData.append("predictedFundAmount", values.predictedFundAmount.toString());
      formData.append("solanaWalletAddress", values.solanaWalletAddress);
      formData.append("cf-turnstile-response", token);
      
      const response = await fetch("/api/joinWaitlist", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to join waitlist");
      }
      router.push("/");
    } catch (error) {
      console.error("Error joining waitlist:", error);
    }
  };

  return (
    <div className="mt-10 xl:mt-20">
      <WaitListForm 
        onSubmit={(token: string, values: WaitListCampaignInfo) => 
          handleCreateWaitListCampaign(token, values)
        } 
      />
    </div>
  );
}
