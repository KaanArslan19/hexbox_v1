"use client";
import Link from "next/link";
import React from "react";
import logo from "../../../public/hexbox_black_logo.svg";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { MobileNav } from "../MobileNav";
import { WaitListNavItems } from "@/app/utils/menuItems";
import Image from "next/image";
import { WaitListMobileNav } from "./WaitListMobileNav";

export default function WaitListNavUI() {
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
              <Image src={logo} alt="hexbox_logo" width={50} height={50} />
            </Link>
            <div className="lg:flex justify-between gap-4 items-center ml-8 hidden lg:visible">
              {WaitListNavItems.map(({ href, label }) => {
                return (
                  <Link
                    key={href}
                    href={href}
                    className="outline-none text-black hover:text-white"
                  >
                    <span className="text-xl">{label}</span>
                  </Link>
                );
              })}
            </div>
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
        <WaitListMobileNav menuItems={WaitListNavItems} open={open} />
      </div>
    </>
  );
}
