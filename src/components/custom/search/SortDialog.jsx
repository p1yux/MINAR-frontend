"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SortDialog = ({ isOpen, onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "";
  const currentOrder = searchParams.get("order") || "asc";
  
  const [sortBy, setSortBy] = useState(currentSort);
  const [sortOrder, setSortOrder] = useState(currentOrder);
  
  const sortOptions = [
    { value: "price", label: "Price" },
    // { value: "rating", label: "Rating" },
    // { value: "availability", label: "Availability" },
    // { value: "position", label: "Relevance (Default)" }
  ];
  
  const handleApplySort = () => {
    // Create new URL with sort parameters
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortBy) {
      params.set("sort", sortBy);
      params.set("order", sortOrder);
    } else {
      params.delete("sort");
      params.delete("order");
    }
    
    // Get the current path without query params
    const path = window.location.pathname;
    
    // Navigate to the same path with updated query params
    router.push(`${path}?${params.toString()}`);
    onClose();
  };
  
  const handleClearSort = () => {
    setSortBy("");
    setSortOrder("asc");
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Sort Results</h3>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Close dialog"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Sort by</p>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <div 
                  key={option.value} 
                  className="flex items-center"
                >
                  <input
                    type="radio"
                    id={`sort-${option.value}`}
                    name="sort-by"
                    value={option.value}
                    checked={sortBy === option.value}
                    onChange={() => setSortBy(option.value)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label 
                    htmlFor={`sort-${option.value}`}
                    className="ml-2 block text-sm text-gray-700"
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {sortBy && sortBy !== "position" && (
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Order</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSortOrder("asc")}
                  className={`px-3 py-2 text-xs rounded-md flex items-center justify-center gap-1 ${
                    sortOrder === "asc" 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  aria-pressed={sortOrder === "asc"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                  <span>Ascending</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSortOrder("desc")}
                  className={`px-3 py-2 text-xs rounded-md flex items-center justify-center gap-1 ${
                    sortOrder === "desc" 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  aria-pressed={sortOrder === "desc"}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-3 w-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span>Descending</span>
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClearSort}
            className="px-4 py-2 text-xs rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleApplySort}
            className="px-4 py-2 text-xs rounded-md border border-transparent text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortDialog; 