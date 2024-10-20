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
  dropdownItems?: DropdownItem[];
}
interface DropdownItem {
  link: string;
  title: string;
}
export interface NewUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface EmailVerifyRequest {
  token: string;
  userId: string;
}

export interface ForgetPasswordRequest {
  email: string;
}
export interface UpdatePasswordRequest {
  password: string;
  token: string;
  userId: string;
}

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  verified: boolean;
}

export interface NewProductInfo {
  title: string;
  description: string;
  bulletPoints: string[];
  mrp: number;
  salePrice: number;
  category: string;
  quantity: number;
  thumbnail?: File;
  images: File[];
}

export interface ProductResponse {
  id: string;
  title: string;
  thumbnail: {
    url: string;
    id: string;
  };
  images?: {
    url: string;
    id: string;
  }[];
  bulletPoints?: string[];
  description: string;
  price: {
    base: number;
    discounted: number;
  };
  category: string;
  quantity: number;
}

export interface ProductToUpdate {
  title: string;
  description: string;
  bulletPoints: string[];
  category: string;
  quantity: number;
  price: {
    base: number;
    discounted: number;
  };
  thumbnail?: {
    url: string;
    id: string;
  };
  images?: {
    url: string;
    id: string;
  }[];
}

export interface NewCartRequest {
  productId: string;
  quantity: number;
}
export interface NewFeaturedProduct {
  banner: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}

export interface FeaturedProductForUpdate {
  banner?: { url: string; id: string };
  link: string;
  linkTitle: string;
  title: string;
}
export interface UserProfileToUpdate {
  avatar?: { url: string; id: string };
  name: string;
  id: string;
}
export interface CartProduct {
  id: string;
  thumbnail: string;
  title: string;
  price: number;
  totalPrice: number;
  qty: number;
}
export interface CartItems {
  products: CartProduct[];
  id: string;
  totalQty: number;
  totalPrice: number;
}

export interface StripeCustomer {
  metadata: {
    userId: string;
    cartId: string;
    type: "checkout" | "instant-checkout";
    product: string;
  };
}

export interface ReviewRequestBody {
  productId: string;
  comment?: string;
  rating: number;
}
