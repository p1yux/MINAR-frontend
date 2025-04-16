"use client";

import React, { useState } from "react";
import TrackProductCard from "./TrackProductCard";
import TrackRecomendation from "./TrackRecomendation";
import SearchRecomendation from "../search/SearchRecomendation";

// Mock data for demonstration purposes
const mockTrackedProducts = [
  {
    id: 1,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    imageUrl: "/images/search/hp-laptop.jpg",
    currentValue: "240",
    initialValue: "1000",
    isTracking: true
  },
  {
    id: 2,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    imageUrl: "/images/search/hp-laptop.jpg",
    currentValue: "240",
    initialValue: "1000",
    isTracking: true
  },
  {
    id: 3,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    imageUrl: "/images/search/hp-laptop.jpg",
    currentValue: "240",
    initialValue: "1000",
    isTracking: true
  },
  {
    id: 4,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    imageUrl: "/images/search/hp-laptop.jpg",
    currentValue: "240",
    initialValue: "1000",
    isTracking: true
  }
];

const TrackedProducts = () => {
  const [trackedProducts, setTrackedProducts] = useState(mockTrackedProducts);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleToggleTracking = (productId, isTracking) => {
    setTrackedProducts(
      trackedProducts.map(product => 
        product.id === productId ? { ...product, isTracking } : product
      )
    );
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
    // Here you would implement the actual search logic
  };
  
  const handleTrackOption = (optionId) => {
    console.log("Selected track option:", optionId);
    // Here you would implement the actual tracking logic
  };

  return (
    <div className="bg-[#faf8f5] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Tracked products</h1>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Product Cards */}
          <div className="lg:w-2/3">
            {trackedProducts.map(product => (
              <TrackProductCard
                key={product.id}
                title={product.title}
                imageUrl={product.imageUrl}
                currentValue={product.currentValue}
                initialValue={product.initialValue}
                isTracking={product.isTracking}
                onToggleTracking={(isTracking) => handleToggleTracking(product.id, isTracking)}
              />
            ))}
            
            <div className="text-center mt-4">
              <button className="text-gray-600 hover:text-gray-900 flex items-center justify-center mx-auto text-xs">
                <span>scroll down to see more</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  className="w-3 h-3 ml-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Right Column - Recommendations */}
          <div className="lg:w-1/3 space-y-4">
            {/* Search input */}
            <div className="bg-white p-2 rounded-lg shadow-sm">
              <div className="flex items-center border rounded-full px-3 py-1">
                <input 
                  type="text" 
                  placeholder="Search for products... Get anything delivered from anywhere."
                  className="flex-1 outline-none text-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-gray-100 rounded-full p-1 ml-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-3 h-3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <SearchRecomendation onSearch={handleSearch} />
            
            <TrackRecomendation onSelect={handleTrackOption} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackedProducts; 