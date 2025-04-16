"use client";

import React from "react";
import SiteCatalogCard from "./SiteCatalogCard";
import ProductsCard from "./ProductsCard";
import useSearchData from "@/hooks/search/useSearchData";

const SearchResults = ({ initialQuery = "laptops" }) => {
  const { 
    isLoading, 
    siteCatalogs, 
    products, 
    error 
  } = useSearchData(initialQuery);

  if (isLoading) {
    return (
      <div className="py-10 bg-[#faf8f5]">
        <div className="container mx-auto px-4 text-center">
          <p>Loading search results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 bg-[#faf8f5]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Error loading search results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 bg-[#faf8f5]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Site Catalogs */}
          <div className="lg:w-[35%] border-r border-gray-200 pr-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">Site Catalogs</h2>
              <p className="text-xs text-gray-600">All search results from source websites</p>
            </div>
            
            <div className="space-y-5">
              {siteCatalogs.map(catalog => (
                <div key={catalog.id} className="mb-2">
                  <SiteCatalogCard
                    title={catalog.title}
                    sourceName={catalog.sourceName}
                    startingPrice={catalog.startingPrice}
                    imageUrl={catalog.imageUrl}
                  />
                </div>
              ))}
              
              <div className="text-center pt-2">
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
          </div>
          
          {/* Right column - Products */}
          <div className="lg:w-[65%]">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">Recommended products for you</h2>
              <p className="text-xs text-gray-600">Search results for pink bedsheets with price below 3000</p>
            </div>
            
            <div className="space-y-3">
              {products.map(product => (
                <div key={product.id} className="mb-2">
                  <ProductsCard
                    title={product.title}
                    price={product.price}
                    specs={product.specs}
                    discount={product.discount}
                    bank={product.bank}
                    deliveryDate={product.deliveryDate}
                    imageUrl={product.imageUrl}
                  />
                </div>
              ))}
              
              <div className="text-center pt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 