"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SortDialog from "./SortDialog";
import ExploreDialog from "./ExploreDialog";
import useSearchData from "@/hooks/search/useSearchData";

const SecNav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortDialogOpen, setIsSortDialogOpen] = useState(false);
  const [isExploreDialogOpen, setIsExploreDialogOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeoutRef = useRef(null);
  
  // Get suggestions from search data hook if available
  const { suggestions = [], updateSearchQuery } = useSearchData(searchParams.get("q") || "");
  
  // Initialize search query from URL parameter
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [searchParams]);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    // Set searching state for UI feedback
    setIsSearching(true);
    
    // Clear any existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Navigate to search page with query parameter
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    
    // Let the URL change complete, then update the search query
    // This ensures we only have one search operation happening
    searchTimeoutRef.current = setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  return (
    <>
    <div className="flex items-center justify-between px-3 py-3 w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="flex-1 max-w-3xl">
          <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            placeholder="Search for anything on Minar..."
              className="w-full bg-transparent rounded-2xl py-4 pl-4 pr-10 text-sm outline-none shadow-sm border border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search"
              disabled={isSearching}
          />
            <button 
              type="submit"
              className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 ${
                isSearching ? 'bg-gray-400' : 'bg-black'
              }`}
              aria-label="Search button"
              disabled={isSearching}
            >
              {isSearching ? (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-3.5 h-3.5 text-white"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              )}
            </button>
          </form>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 ml-4">
          <button 
            className="bg-white rounded-md text-[10px] font-medium py-1.5 px-6 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
            aria-label="Sort results"
            onClick={() => setIsSortDialogOpen(true)}
            disabled={isSearching}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span>SORT</span>
        </button>
          <button 
            className="bg-white rounded-md text-[10px] font-medium py-1.5 px-6 shadow-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1"
            aria-label="Explore more results"
            onClick={() => setIsExploreDialogOpen(true)}
            disabled={isSearching}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-3 w-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
            <span>EXPLORE MORE</span>
        </button>
      </div>
    </div>

      {/* Sort Dialog */}
      <SortDialog 
        isOpen={isSortDialogOpen} 
        onClose={() => setIsSortDialogOpen(false)} 
      />

      {/* Explore Dialog */}
      <ExploreDialog 
        isOpen={isExploreDialogOpen} 
        onClose={() => setIsExploreDialogOpen(false)} 
        suggestions={suggestions.map((suggestion, index) => ({
          id: index + 1,
          query: suggestion.query,
          description: suggestion.description || ""
        }))}
      />
    </>
  );
};

export default SecNav;
