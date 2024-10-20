"use client";
import Link from "next/link";
import React from "react";

import { Bars3Icon, HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { MobileNav } from "../MobileNav";
import ProfileMenu from "../ProfileMenu";
import SearchForm from "../SearchForm";
import {
  InfoMenuItems,
  MobileMenuItems,
  NavItems,
} from "@/app/utils/menuItems";
import InfoMenu from "../InfoMenu";
import CustomButton from "../ui/CustomButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
interface Props {
  cartItemsCount: number;
  avatar?: string;
}

export const subMenuItems = [
  {
    href: "/profile",
    icon: <UserCircleIcon className="h-4 w-4" />,
    label: "My Profile",
  },
  {
    href: "/profile/orders",
    icon: <ShoppingBagIcon className="h-4 w-4" />,
    label: "Orders",
  },
  {
    href: "/profile/wishlist",
    icon: <HeartIcon className="h-4 w-4" />,
    label: "Wishlist",
  },
];

export default function NavUI() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onResize = () => window.innerWidth >= 960 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <div className="mx-auto">
        <div className="flex items-center justify-between lg:justify-around text-blue-gray-900   ">
          <div className="flex">
            <Link
              href="/"
              className="mr-2 cursor-pointer py-1.5 lg:ml-2 font-semibold "
            >
              LOGO
            </Link>
            <div className="lg:flex justify-between gap-4 items-center ml-8 hidden lg:visible">
              {NavItems.map(({ href, label }) => {
                return (
                  <Link
                    key={href}
                    href={href}
                    className="outline-none text-black hover:text-blueColor"
                  >
                    <span>{label}</span>
                  </Link>
                );
              })}
              <InfoMenu menuItems={InfoMenuItems} />
            </div>
          </div>

          <div className="flex-1 lg:flex justify-end hidden lg:visible">
            <div className="md:w-96 flex justify-end w-full md:mx-4 mr-2 ">
              <SearchForm submitTo="/search?query=" />
            </div>
          </div>
          <div className="hidden lg:flex gap-2 items-center">
            <ProfileMenu menuItems={subMenuItems} avatar={""} />
            <Link className="  px-4 py-1 " href="/">
              <ConnectButton />
            </Link>
          </div>

          <div className="lg:hidden flex items-center space-x-2 ">
            <button className="lg:hidden " onClick={() => setOpen(!open)}>
              {open ? (
                <XMarkIcon className="h-8 w-8 text-black" strokeWidth={2} />
              ) : (
                <Bars3Icon className="h-8 w-8 text-black" strokeWidth={2} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <MobileNav menuItems={MobileMenuItems} open={open} />
      </div>
    </>
  );
}
