"use client";

import React from "react";

const SearchRecomendation = ({ onSearch }) => {
  const searchRecommendations = [
    {
      id: 1,
      title: "Search for related products 1 recco (AI determined) eg: pillows",
      query: "pillows related to this product"
    },
    {
      id: 2,
      title: "Search for related products 2 recco (AI determined) eg: pink covers",
      query: "pink covers related to this product"
    },
    {
      id: 3,
      title: "Search for this exact product on other platforms to get more deals",
      query: "exact product match across platforms"
    },
    {
      id: 4,
      title: "Search for other products in this category (AI determined)",
      query: "similar products in category"
    },
    {
      id: 5,
      title: "Search for related products 3 recco (AI determined) eg: beds",
      query: "beds related to this product"
    }
  ];

  return (
    <div className="rounded-lg overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-[#701342] bg-[#3C3C44]">
        <h3 className="text-sm font-medium text-white">Search Recommendations</h3>
      </div>
      
      <div className="p-2 bg-[#faf8f5]">
        {searchRecommendations.map((option) => (
          <div 
            key={option.id}
            className="flex items-center justify-between p-2 hover:bg-white rounded-md cursor-pointer transition-colors"
            onClick={() => onSearch && onSearch(option.query)}
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
                <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchRecomendation;
