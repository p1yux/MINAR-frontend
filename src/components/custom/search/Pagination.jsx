"use client";

import React from "react";

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  containerClassName = "",
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    if (totalPages <= 7) {
      // If total pages is 7 or less, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Display strategy: 1 ... 4 5 6 ... 10 (if currentPage is 5)
      // Always include first and last pages
      pageNumbers.push(1);
      
      // Add ellipsis if current page is far from first page
      if (currentPage > 3) {
        pageNumbers.push('...');
      }
      
      // Calculate range around current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add pages around current page
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis if current page is far from last page
      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      
      // Add last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  const pageNumbers = getPageNumbers();
  
  const handlePageClick = (page) => {
    if (page === '...') return; // Skip ellipsis
    if (page !== currentPage) {
      onPageChange(page);
    }
  };
  
  // Handle previous and next buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  if (totalPages <= 1) return null;
  
  return (
    <div className={`flex items-center justify-center gap-2 my-6 ${containerClassName}`}>
      {/* Previous button */}
      <button
        className={`p-2 rounded-full ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-100"
        }`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      {/* Page numbers */}
      {pageNumbers.map((page, index) => (
        <button
          key={`page-${page}-${index}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
            page === currentPage
              ? "bg-gray-900 text-white"
              : page === '...'
                ? "text-gray-400 cursor-default"
                : "text-gray-800 hover:bg-gray-100"
          }`}
          onClick={() => handlePageClick(page)}
          aria-label={page === '...' ? "More pages" : `Go to page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </button>
      ))}
      
      {/* Next button */}
      <button
        className={`p-2 rounded-full ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-100"
        }`}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination; 