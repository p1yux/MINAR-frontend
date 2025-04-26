"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ExploreDialog = ({ isOpen, onClose, suggestions = [] }) => {
  const router = useRouter();
  
  const defaultSuggestions = [
    { id: 1, query: "Related products", description: "Find items similar to current search" },
    { id: 2, query: "Price comparison", description: "Compare prices across platforms" },
    { id: 3, query: "Alternative brands", description: "See products from different brands" },
    { id: 4, query: "Accessories", description: "Find accessories for this product" }
  ];
  
  const allSuggestions = suggestions.length > 0 
    ? suggestions 
    : defaultSuggestions;
    
  const handleSuggestionClick = (query) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
    onClose();
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
            <h3 className="text-lg font-semibold text-gray-900">Explore More Options</h3>
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
          <p className="text-sm text-gray-600 mb-4">
            Try these suggestions to explore more related products and options:
          </p>
          
          <div className="space-y-2">
            {allSuggestions.map((suggestion) => (
              <div 
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.query)}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{suggestion.query}</h4>
                    {suggestion.description && (
                      <p className="text-xs text-gray-600 mt-0.5">{suggestion.description}</p>
                    )}
                  </div>
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-gray-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your own search query..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    handleSuggestionClick(e.target.value);
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 text-gray-500" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreDialog; 