import React from "react";
import { Collapse } from "@material-tailwind/react";
import Link from "next/link";
import { MenuItem } from "../types";
import CustomButton from "./ui/CustomButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Wallet from "./Wallet";

interface Props {
  open: boolean;
  menuItems: MenuItem[];
}

export function MobileNav({ open, menuItems }: Props) {
  return (
    <>
      <Collapse open={open} className=" my-2 ">
        <ul className="space-y-4 border-y-2 border-lightBlueColor py-4 ">
          {menuItems.map(({ href, label }) => (
            <li key={href} className="text-lg mx-2 ">
              <Link href={href}>
                <span className="text-black hover:text-orangeColor">
                  {label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className=" mt-2 text-center">
          <Wallet />
        </div>
      </Collapse>
    </>
  );
}
