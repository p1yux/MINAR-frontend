"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const exampleSuggestions = [
  "Where can I get cute red dresses below 3000",
  "Find me a bouquet of roses and tulips under 1000",
  "Pink bathrobes with >4 star rating from Amazon",
  "Find me gaming laptops below 1.5 lakhs",
  "Find all deals on the new iPhone 16 series",
  "I wanted to buy the canon 70D dslr but it's out of stock",
  // "Large area rugs for the living room ideas",
  // "Outfits I can wear to dinner with husband",
  // "Find budget sunglasses from Amazon under 500",
  // "Online stores that sell wooden coffee tables below 5000",
];

const SearchBar = ({ initialQuery = "", onSearch }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(initialQuery || "");
  
  // Initialize search query from URL parameter
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // If onSearch prop is provided, call it
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      // Otherwise navigate to search page with query parameter
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    // Call onSearch if provided, otherwise navigate
    if (onSearch) {
      onSearch(suggestion);
    } else {
      router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main search bar */}
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search for anything on Minar...."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-3.5 rounded-2xl border-none shadow-lg focus:outline-none text-gray-800 text-base bg-white"
          aria-label="Search"
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Popular search suggestions */}
      <div className="mt-5 flex flex-wrap gap-2 justify-center">
        {exampleSuggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="bg-white/90 hover:bg-white text-gray-800 text-xs py-2 px-4 rounded-full shadow-sm whitespace-nowrap transition-colors duration-200"
            tabIndex={0}
            aria-label={`Search for ${suggestion}`}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
