"use client";

import React from "react";

const SecNav = () => {
  return (
    <div className="flex items-center justify-between px-3 py-3 w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="flex-1 max-w-3xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for anything on Minar..."
            className="w-full bg-transparent rounded-2xl py-4 pl-4 pr-10 text-sm outline-none shadow-sm border border-gray-300 "
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black rounded-full p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3.5 h-3.5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 ml-4">
        <button className="bg-white rounded-md text-[10px] font-medium py-1.5 px-6 shadow-sm">
          FILTER
        </button>
        <button className="bg-white rounded-md text-[10px] font-medium py-1.5 px-6 shadow-sm">
          EXPLORE MORE
        </button>
      </div>
    </div>
  );
};

export default SecNav;
