"use client";

import React from "react";

const TrackRecomendation = ({ onSelect }) => {
  const trackOptions = [
    {
      id: 1,
      title: "Track price changes for this product",
      description: "Get notified when the price of this product changes"
    },
    {
      id: 2,
      title: "Track deals and discounts on this product",
      description: "Get notified about special offers and discounts"
    },
    {
      id: 3,
      title: "Track availability for this product",
      description: "Get notified when this product becomes available"
    }
  ];

  return (
    <div className="rounded-lg overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-gray-600 bg-[#3C3C44]">
        <h3 className="text-sm font-medium text-white">Track Recommendations</h3>
      </div>
      
      <div className="p-2 bg-[#faf8f5]">
        {trackOptions.map((option) => (
          <div 
            key={option.id}
            className="flex items-center justify-between p-2 hover:bg-white rounded-md cursor-pointer transition-colors"
            onClick={() => onSelect && onSelect(option.id)}
          >
            <span className="text-xs">{option.title}</span>
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-3 h-3 text-gray-800"
                aria-hidden="true"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackRecomendation;
