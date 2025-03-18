import React from "react";

export default function Loading() {
  return (
    <div className="max-w-screen-[80vh] mx-auto p-4">
      <div className="animate-pulse">
        <div className="h-[64px] bg-gray-300 rounded-lg"></div>

        <div className="h-[80vh] flex justify-center items-center">
          <div className="w-full h-[300px] bg-gray-300 rounded-lg" />
        </div>

        <div className="text-center text-gray-300">
          <a href="https://storyset.com/education">
            Education illustrations by Storyset
          </a>
        </div>
      </div>
    </div>
  );
}
