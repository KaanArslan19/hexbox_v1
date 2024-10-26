"use client";

import CampaignForm from "@/app/components/CampaignForm";
import { NewCampaignInfo } from "@/app/types";
import { useRouter } from "next/navigation"; // Use `next/navigation` for the new app router
import React from "react";

export default function CreateProject() {
  const router = useRouter();

  const handleCreateProject = async (values: NewCampaignInfo) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("fund_amount", values.fundAmount.toString());
      formData.append("logo", values.logo);

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
    <div>
      <CampaignForm onSubmit={handleCreateProject} />
    </div>
  );
}
