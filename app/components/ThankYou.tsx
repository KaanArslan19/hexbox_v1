"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MoveLeft } from "lucide-react";
import ReactConfetti from "react-confetti";
import Cookies from "js-cookie";

export default function ThankYou() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const formSubmitted = Cookies.get("formSubmitted");
    if (!formSubmitted) {
      router.replace("/");
      return;
    }

    const updateDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    setShowConfetti(true);

    Cookies.set("hasCompletedSignup", "true", { expires: 365 });

    setTimeout(() => {
      setShowConfetti(false);
      Cookies.remove("formSubmitted");
    }, 5000);

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [router]);

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {showConfetti && (
        <ReactConfetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      <div className="max-w-2xl w-full text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/thank_you.png"
            alt="Thank You Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold mb-4 capitalize">
          Thanks for joining our waitlist!
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          One of our team member will get in touch with you soon.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orangeColor/80 to-redColor/80
            rounded-lg transform transition-all duration-300
            hover:from-orangeColor hover:to-redColor hover:scale-105 hover:shadow-lg"
        >
          <MoveLeft className="w-5 h-5" color="white" />
          <span className="text-white">Go Back</span>
        </button>
      </div>
    </div>
  );
}
