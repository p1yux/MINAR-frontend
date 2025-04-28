"use client";

import React, { useState, useEffect } from "react";
import SiteCatalogCard from "./SiteCatalogCard";
import ProductsCard from "./ProductsCard";
import SearchSkeleton from "./SearchSkeleton";
import Pagination from "./Pagination";
import useSearchData from "@/hooks/search/useSearchData";

const ITEMS_PER_PAGE = 5;

const SearchResults = ({ initialQuery = "laptops" }) => {
  const { 
    isLoading, 
    siteCatalogs, 
    products, 
    error,
    searchQuery,
    updateSearchQuery
  } = useSearchData(initialQuery);
  
  const [currentSiteCatalogPage, setCurrentSiteCatalogPage] = useState(1);
  const [currentProductPage, setCurrentProductPage] = useState(1);
  
  // Calculate total pages for each section
  const totalSiteCatalogPages = Math.ceil(siteCatalogs.length / ITEMS_PER_PAGE);
  const totalProductPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  
  // Get paginated data
  const paginatedSiteCatalogs = siteCatalogs.slice(
    (currentSiteCatalogPage - 1) * ITEMS_PER_PAGE,
    currentSiteCatalogPage * ITEMS_PER_PAGE
  );
  
  const paginatedProducts = products.slice(
    (currentProductPage - 1) * ITEMS_PER_PAGE,
    currentProductPage * ITEMS_PER_PAGE
  );

  // Reset pagination when search query changes
  useEffect(() => {
    setCurrentSiteCatalogPage(1);
    setCurrentProductPage(1);
  }, [searchQuery]);

  // Set initial search query only once
  useEffect(() => {
    if (initialQuery && initialQuery !== searchQuery) {
      updateSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  if (isLoading) {
    return <SearchSkeleton />;
  }

  if (error) {
    return (
      <div className="py-10 bg-[#faf8f5]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">Error loading search results: {error}</p>
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
            
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-5">
                {paginatedSiteCatalogs.map(catalog => (
                  <div key={catalog.id} className="mb-2">
                    <SiteCatalogCard
                      title={catalog.title}
                      sourceName={catalog.sourceName}
                      startingPrice={catalog.startingPrice}
                      imageUrl={catalog.imageUrl}
                      productUrl={catalog.productUrl}
                    />
                  </div>
                ))}
                
                {siteCatalogs.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No site catalogs found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
              
              {/* Pagination for site catalogs */}
              {siteCatalogs.length > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentSiteCatalogPage}
                  totalPages={totalSiteCatalogPages}
                  onPageChange={setCurrentSiteCatalogPage}
                />
              )}
            </div>
          </div>
          
          {/* Right column - Products */}
          <div className="lg:w-[65%]">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">Recommended products for you</h2>
              <p className="text-xs text-gray-600">
                {searchQuery ? `Search results for "${searchQuery}"` : "Popular products"}
              </p>
            </div>
            
            <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                {paginatedProducts.map(product => (
                  <div key={product.id} className="mb-2">
                    <ProductsCard
                      title={product.title}
                      price={product.price}
                      specs={product.specs}
                      discount={product.discount}
                      bank={product.bank}
                      deliveryDate={product.deliveryDate}
                      imageUrl={product.imageUrl}
                      productUrl={product.productUrl}
                    />
                  </div>
                ))}
                
                {products.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
              
              {/* Pagination for products */}
              {products.length > ITEMS_PER_PAGE && (
                <Pagination
                  currentPage={currentProductPage}
                  totalPages={totalProductPages}
                  onPageChange={setCurrentProductPage}
                  containerClassName="mt-4"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 