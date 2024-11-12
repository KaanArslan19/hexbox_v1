"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomButton from "../ui/CustomButton";
import { useRouter } from "next/navigation";

export default function WaitListBanner() {
  const [bgColor, setBgColor] = useState("bg-lightBlueColor/10");
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/waitlist");
  };
  return (
    <div>
      <div className="relative w-full h-[400px]">
        <div className="absolute inset-0 w-full h-full ">
          <Image
            src="/hexbox_name_logo_black.png"
            alt="background-cover"
            fill
            className="object-contain"
            priority
          />
          <div className="absolute inset-0 bg-lightBlueColor rounded-md" />
        </div>
      </div>
      <div className="flex justify-center">
        <CustomButton
          onClick={handleButtonClick}
          className="mt-4 bg-none border-[1px] border-blueColor w-2/4 md:w-3/4 "
        >
          Join the Waitlist{" "}
        </CustomButton>
      </div>
    </div>
  );
}
