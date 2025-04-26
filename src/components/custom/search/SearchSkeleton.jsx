"use client";

import React from "react";

const SkeletonPulse = ({ className }) => (
  <div className={`animate-shimmer bg-gray-200 rounded ${className}`}></div>
);

const CatalogSkeleton = () => (
  <div className="bg-white rounded-md shadow-sm p-4">
    {/* Image */}
    <div className="mb-3">
      <div className="relative h-28 w-full overflow-hidden rounded">
        <SkeletonPulse className="h-full w-full" />
      </div>
    </div>
    
    {/* Title */}
    <SkeletonPulse className="h-4 w-3/4 mx-auto mb-1" />
    
    {/* Price */}
    <SkeletonPulse className="h-3 w-1/2 mx-auto mb-3" />
    
    {/* Buttons */}
    <div className="flex flex-col gap-1.5">
      <SkeletonPulse className="h-8 w-full rounded-full" />
      <SkeletonPulse className="h-8 w-full rounded-full" />
    </div>
  </div>
);

const ProductSkeleton = () => (
  <div className="bg-white p-3 rounded-md shadow-sm flex">
    {/* Image */}
    <div className="flex-shrink-0 mr-3">
      <div className="relative h-20 w-20 overflow-hidden rounded">
        <SkeletonPulse className="h-full w-full" />
      </div>
    </div>
    
    {/* Content */}
    <div className="flex-1 min-w-0">
      {/* Title */}
      <SkeletonPulse className="h-3 w-full mb-1" />
      <SkeletonPulse className="h-3 w-2/3 mb-2" />
      
      {/* Price */}
      <SkeletonPulse className="h-4 w-1/4 mb-1" />
      
      {/* Delivery */}
      <SkeletonPulse className="h-2 w-1/3 mb-2" />
      
      {/* Action Buttons */}
      <div className="flex gap-1.5 mt-2">
        <SkeletonPulse className="h-6 w-1/3 rounded-full" />
        <SkeletonPulse className="h-6 w-1/3 rounded-full" />
      </div>
    </div>
  </div>
);

const SearchSkeleton = () => {
  return (
    <div className="py-10 bg-[#faf8f5]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Site Catalogs */}
          <div className="lg:w-[35%] border-r border-gray-200 pr-6">
            <div className="mb-4">
              <SkeletonPulse className="h-6 w-1/3 mb-1" />
              <SkeletonPulse className="h-4 w-2/3" />
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-5">
                {Array(3).fill(0).map((_, index) => (
                  <div key={`catalog-skeleton-${index}`} className="mb-2">
                    <CatalogSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Products */}
          <div className="lg:w-[65%]">
            <div className="mb-4">
              <SkeletonPulse className="h-6 w-1/2 mb-1" />
              <SkeletonPulse className="h-4 w-1/3" />
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                {Array(5).fill(0).map((_, index) => (
                  <div key={`product-skeleton-${index}`} className="mb-2">
                    <ProductSkeleton />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSkeleton; 