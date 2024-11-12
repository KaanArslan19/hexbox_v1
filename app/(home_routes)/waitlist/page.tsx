"use client";
import WaitListForm from "@/app/components/waitlist/WaitListForm";
import { WaitListCampaignInfo } from "@/app/types";
import { useRouter } from "next/navigation";
import React from "react";

export default function WaitListPage() {
  const router = useRouter();

  const handleCreateWaitListCampaign = async (values: WaitListCampaignInfo) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("mail", values.mail);

      formData.append("description", values.description);
      formData.append("location", values.location);
      //add the socialLinks as array

      const response = await fetch("/api/createCampaign", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }
      router.push("/campaigns");
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  return (
    <div className="mt-20">
      <WaitListForm onSubmit={handleCreateWaitListCampaign} />;
    </div>
  );
}
