"use client";
import Image from "next/image";
import React, { useState } from "react";

const OurStory = () => {
  const [activePage, setActivePage] = useState<number>(0);
  const storyContent = [
    {
      id: 1,
      text: "Our friends and family have been deeply affected by the fraud and failures of unreliable exchanges, businesses and project. We felt a strong urge to help, but by the time we knew of the damage, it was too late. The system had failed them—ineffective regulations and a lack of protections left regular people and investors vulnerable. This issue wasn't just affecting businesses; it was impacting personal lives and innocent families.",
    },
    {
      id: 2,
      text: "We wanted to put an end to this suffering and create a safer, better world for individuals, families, and businesses alike. Business is inherently risky, so why add unnecessary risk with fraud and malpractice? We saw an opportunity to fix this. With our expertise in code, business, and community, we committed ourselves to make a difference.",
    },
    {
      id: 3,
      text: "As we developed our project, we encountered obstacles in fundraising—a critical step for any venture. The challenges we faced highlighted the need for a transparent, secure platform to support legitimate projects and protect investors. That's why Hexbox was born: to make fundraising safer, more accessible, and trustworthy for everyone.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-8">
        <div className="w-1/3 mx-auto lg:w-1/4 flex items-center justify-center">
          <div className="relative w-full aspect-square lg:bottom-5">
            <Image
              src="/images/about/our_story.png"
              fill
              className="object-contain"
              alt="about-logo"
            />
          </div>
        </div>

        <div className="w-full lg:w-2/3">
          <h2 className="text-4xl xl:text-6xl font-light mb-8 text-center tracking-tight">
            Our Story
          </h2>
          <div className="relative h-[500px] md:h-[400px] lg:h-[300px] w-full overflow-hidden">
            <div className="relative h-full">
              {storyContent.map((content, index) => (
                <div
                  key={content.id}
                  className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out px-4
                    ${
                      activePage === index
                        ? "opacity-100 translate-x-0"
                        : index < activePage
                        ? "opacity-0 -translate-x-full"
                        : "opacity-0 translate-x-full"
                    }`}
                >
                  <p className="text-lg lg:text-xl leading-relaxed  ">
                    {content.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center gap-4 mt-6">
              {storyContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activePage === index
                      ? "bg-blueColor scale-125"
                      : "bg-gray-400 hover:bg-lightBlueColor"
                  }`}
                  aria-label={`Story Part ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurStory;
