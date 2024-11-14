import Image from "next/image";
import React from "react";
import { AboutData } from "../types";

export default function About() {
  const ABOUT_DATA: AboutData[] = [
    {
      image: "/hexbox_name_logo_black.png",
      header: "Join our Waitlist",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,pariatur magnam tempore veniam dolores incidunt recusandae voluptatem. ",
    },
    {
      image: "/hexbox_name_logo_black.png",
      header: "Collaborate with Us",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,pariatur magnam tempore veniam dolores incidunt recusandae voluptatem.",
    },
    {
      image: "/hexbox_name_logo_black.png",
      header: "Launch Your Crowdfunding ",
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus,pariatur magnam tempore veniam dolores incidunt recusandae voluptatem.",
    },
  ];
  return (
    <div className="flex flex-col items-center my-16  mx-auto ">
      <h1 className="text-4xl xl:text-6xl capitalize text-center mb-4 tracking-tight ">
        Involve in Hexbox world <br className="hidden sm:inline" />
        just in a Minute
      </h1>
      <p className="mb-2 text-lg lg:text-xl text-center ">
        Follow these steps to launch your own project
      </p>
      <ul className="mt-4 flex flex-wrap gap-8 xl:flex-row lg:items-start items-center justify-center ">
        {ABOUT_DATA.map((item, index) => (
          <li
            className="xl:max-w-[24rem] xl:h-[500px] min-h-[200px] flex xl:flex-col overflow-hidden  bg-gradient-to-bl from-yellowColor/30 via-orangeColor/30 to-blueColor/30  rounded-2xl"
            key={index}
          >
            <div className="xl:flex-1 flex items-center justify-center mx-2 ">
              <Image
                className="h-[150px] w-[150px] rounded-full  object-contain"
                src={item.image}
                alt={item.header}
                width={100}
                height={100}
              />
            </div>
            <div className="xl:flex-3 p-8 ">
              <h4 className="text-center  text-2xl mb-2 ">{item.header}</h4>
              <span className="mt-3 text-sm lg:text-base xl:text-lg  ">
                {item.description}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
