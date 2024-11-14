import Image from "next/image";
import React from "react";
import { LuTwitter, LuLinkedin } from "react-icons/lu";
interface TeamMember {
  name: string;
  image: string;
  twitter: string;
  linkedIn: string;
}

const TeamDetails: TeamMember[] = [
  {
    name: "Kaan",
    image: "/team/kaan.webp",
    twitter: "https://x.com/kaanarslan999",
    linkedIn: "https://www.linkedin.com/in/kaan-arslan-eeeng/",
  },
  {
    name: "Barkın",
    image: "/team/barkin.webp",
    twitter: "https://x.com/brknckkc",
    linkedIn: "https://www.linkedin.com/in/barkin/",
  },
  {
    name: "Brad",
    image: "/team/brad.webp",
    twitter: "https://x.com/bradheubel",
    linkedIn: "https://www.linkedin.com/in/bradley-heubel/",
  },
];

const Team = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TeamDetails.map((member) => (
          <div key={member.name} className="   overflow-hidden  ">
            <div className="flex justify-center items-center p-6">
              <div className="relative w-48 h-48 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={`${member.name}'s profile`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
                {member.name}
              </h3>

              <div className="flex justify-center space-x-6">
                <a
                  href={member.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500 transition-colors duration-300"
                >
                  <LuTwitter className="w-6 h-6" />
                </a>
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700 transition-colors duration-300"
                >
                  <LuLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
