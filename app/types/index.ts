import React from "react";

export interface MenuItems {
  href: string;
  icon: React.JSX.Element;
  label: string;
}

export interface MenuItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export interface CampaignListProps {
  listings: {
    _id: string;
    user_id: string;
    title: string;
    description: string;
    fund_amount: number;
    logo: string;
    background_image: string;
    hexbox_address: string;
    status: boolean;
  }[];
}

export interface CampaignItemProps {
  id: string;
  userId: string;
  title: string;
  description: string;
  fundAmount: number;
  logo: string;
  backgroundImage: string;
  hexboxAddress: string;
  status: boolean;
}

export interface NewCampaignInfo {
  title: string;
  description: string;
  fundAmount: number;
  logo: File;
  // hexboxAddress: string;
  /*   backgroundImage: File;
   */
  totalSupply: number;
}

export interface AboutData {
  image: string;
  header: string;
  description: string;
}
