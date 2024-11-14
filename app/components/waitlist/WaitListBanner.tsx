"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomButton from "../ui/CustomButton";
import { ArrowRight } from "lucide-react";

interface LogoSparkleProps {
  className: string;
  delay: number;
  isVisible: boolean;
}

const LogoSparkle: React.FC<LogoSparkleProps> = ({
  className,
  delay,
  isVisible,
}) => (
  <div
    className={`
      absolute w-8 h-8 transition-opacity duration-300
      ${className}
      ${isVisible ? "opacity-100" : "opacity-0"}
    `}
    style={{ transitionDelay: `${delay}ms` }}
  >
    <Image
      src="/hexbox_white_logo.svg"
      alt="sparkle-logo"
      width={32}
      height={32}
      className="object-contain"
    />
  </div>
);

const WaitListBanner = () => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [activeLogos, setActiveLogos] = useState<number[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/waitlist");
  };

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    let progressInterval: NodeJS.Timeout | null = null;

    if (isHovered) {
      // Reset progress when hover starts
      setProgress(0);

      // Start progress animation
      let currentProgress = 0;
      progressInterval = setInterval(() => {
        currentProgress += 1;
        if (currentProgress <= 100) {
          setProgress(currentProgress);
        } else {
          if (progressInterval) clearInterval(progressInterval);
        }
      }, 20); // 2000ms (2s) total duration: 20ms * 100 steps

      // Sequentially show logos
      [0, 1, 2, 3].forEach((index) => {
        const showTimeout = setTimeout(() => {
          setActiveLogos((prev) => [...prev, index]);
        }, index * 200);
        timeouts.push(showTimeout);
      });

      // Remove logos after animation
      const cleanupTimeout = setTimeout(() => {
        setActiveLogos([]);
      }, 2000);
      timeouts.push(cleanupTimeout);
    } else {
      setProgress(0);
      setActiveLogos([]);
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isHovered]);

  const logoPositions = [
    "top-4 left-4 animate-logo-float-1",
    "top-4 right-4 animate-logo-float-2",
    "bottom-4 right-4 animate-logo-float-3",
    "bottom-4 left-4 animate-logo-float-4",
  ];

  return (
    <div className="relative w-full max-w-[1400px] mx-auto">
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden transform transition-all duration-500 hover:scale-[1.02]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellowColor/20 to-orangeColor/30 animate-gradient" />
          <Image
            src="/hexbox_white_logo.svg"
            alt="background-cover"
            fill
            className="object-contain opacity-75 transition-opacity duration-500"
            priority
          />
        </div>

        {logoPositions.map((position, index) => (
          <LogoSparkle
            key={index}
            className={position}
            delay={index * 200}
            isVisible={activeLogos.includes(index)}
          />
        ))}

        <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blueColor/90 tracking-tighter">
            Join Our Exclusive Waitlist
          </h1>

          <p className="text-lg md:text-xl text-blueColor mb-8 max-w-2xl">
            Be among the first to experience our revolutionary platform
          </p>

          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <CustomButton
              onClick={handleButtonClick}
              className="group relative px-8 py-3 bg-lightBlueColor hover:bg-lightBlueColor/70
                text-white rounded-lg transform transition-all duration-300
                hover:translate-y-[-2px] hover:shadow-lg
                flex items-center gap-2 overflow-hidden"
            >
              {isHovered && (
                <div
                  className="absolute inset-0 bg-blueColor transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(${progress - 100}%)`,
                  }}
                />
              )}

              <span
                className={`relative z-10 ${
                  isHovered ? "text-white" : "text-blueColor/90"
                }`}
              >
                Join the Waitlist
              </span>
              <ArrowRight
                className={`relative z-10 w-5 h-5 transition-transform duration-300
                ${isHovered ? "translate-x-1 " : ""}`}
                color={isHovered ? "white" : "black"}
              />
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitListBanner;
