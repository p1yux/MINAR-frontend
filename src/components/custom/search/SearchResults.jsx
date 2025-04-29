"use client";

import React, { useState, useEffect, useRef } from "react";
import SiteCatalogCard from "./SiteCatalogCard";
import ProductsCard from "./ProductsCard";
import SearchSkeleton from "./SearchSkeleton";
import useSearchData from "@/hooks/search/useSearchData";
import useBrowserSession from "@/hooks/browser/useBrowserSession";

const SearchResults = ({ initialQuery = "laptops" }) => {
  const { 
    isLoading, 
    siteCatalogs, 
    products, 
    error,
    searchQuery,
    updateSearchQuery
  } = useSearchData(initialQuery);
  
  const [activeBrowser, setActiveBrowser] = useState({
    isOpen: false,
    url: "",
  });
  
  const [browserSearchQuery, setBrowserSearchQuery] = useState("");

  const canvasRef = useRef(null);
  const sessionStartedRef = useRef(false);

  const {
    isLoading: isBrowserLoading,
    isConnected,
    imageBitmap,
    error: browserError,
    startSession,
    stopSession,
    sendMouseClick,
    sendKeyboardEvent,
    sendWheel,
  } = useBrowserSession();

  // Set initial search query only once
  useEffect(() => {
    if (initialQuery && initialQuery !== searchQuery) {
      updateSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  // Handle browser session lifecycle
  useEffect(() => {
    if (activeBrowser.isOpen && !sessionStartedRef.current && activeBrowser.url) {
      sessionStartedRef.current = true;
      startSession(activeBrowser.url).catch(() => {
        sessionStartedRef.current = false;
      });
    }
    if (!activeBrowser.isOpen && sessionStartedRef.current) {
      stopSession().finally(() => {
        sessionStartedRef.current = false;
      });
    }
  }, [activeBrowser.isOpen, activeBrowser.url, startSession, stopSession]);

  // Draw each new frame
  useEffect(() => {
    if (!imageBitmap || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas to match stream
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    // Draw
    ctx.drawImage(imageBitmap, 0, 0);
    canvas.focus();
  }, [imageBitmap]);

  // Browser event handlers
  const handleClick = (e) => {
    if (!canvasRef.current || !isConnected) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvasRef.current.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvasRef.current.height;
    sendMouseClick(Math.round(x), Math.round(y));
    canvasRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (!isConnected) return;
    sendKeyboardEvent(e.key);
    e.preventDefault();
  };

  const handleWheel = (e) => {
    if (!canvasRef.current || !isConnected) return;
    e.preventDefault();
    // Send scroll deltas
    sendWheel(e.deltaX, e.deltaY);
  };

  // Pass the browser control to child components
  const handleOpenBrowser = (url) => {
    setActiveBrowser({
      isOpen: true,
      url,
    });
  };

  const handleCloseBrowser = () => {
    setActiveBrowser({
      isOpen: false,
      url: "",
    });
    setBrowserSearchQuery("");
  };
  
  const handleBrowserSearch = (e) => {
    e.preventDefault();
    if (browserSearchQuery.trim()) {
      // You would implement the actual search functionality here
      console.log("Searching for:", browserSearchQuery);
    }
  };

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
    <div className="py-10 bg-[#faf8f5] ">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content container - always visible but resized when browser is open */}
          <div className={`flex flex-col lg:flex-row w-full gap-4 ${activeBrowser.isOpen ? 'lg:w-[30%]' : ''}`}>
            {/* Left column - Site Catalogs */}
            <div className={`lg:w-[35%] border-r border-gray-200 pr-3 ${activeBrowser.isOpen ? 'lg:w-[48%] pr-2' : ''}`}>
              <div className="mb-2">
                <h2 className={`text-lg font-semibold mb-1 ${activeBrowser.isOpen ? 'text-sm' : ''}`}>Site Catalogs</h2>
                <p className={`text-xs text-gray-600 ${activeBrowser.isOpen ? 'text-[10px]' : ''}`}>All search results from source websites</p>
              </div>
              
              <div className={`${activeBrowser.isOpen ? 'max-h-[80vh]' : 'max-h-[100vh]'} overflow-y-auto pr-2 custom-scrollbar`}>
                <div className="space-y-5">
                  {siteCatalogs.map(catalog => (
                    <div key={catalog.id} className={`mb-2 ${activeBrowser.isOpen ? 'transform scale-90 origin-top-left' : ''}`}>
                      <SiteCatalogCard
                        title={catalog.title}
                        sourceName={catalog.sourceName}
                        startingPrice={catalog.startingPrice}
                        imageUrl={catalog.imageUrl}
                        productUrl={catalog.productUrl}
                        onOpenBrowser={handleOpenBrowser}
                        compactMode={activeBrowser.isOpen}
                      />
                    </div>
                  ))}
                  
                  {siteCatalogs.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No site catalogs found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Right column - Products - always visible */}
            <div className={`lg:w-[65%] ${activeBrowser.isOpen ? 'lg:w-[52%]' : ''}`}>
              <div className={`mb-2 ${activeBrowser.isOpen ? 'mb-1' : 'mb-4'}`}>
                <h2 className={`text-lg font-semibold mb-1 ${activeBrowser.isOpen ? 'text-sm' : ''}`}>Recommended products</h2>
                <p className={`text-xs text-gray-600 ${activeBrowser.isOpen ? 'text-[10px]' : ''}`}>
                  {searchQuery ? `Results for "${searchQuery}"` : "Popular products"}
                </p>
              </div>
              
              <div className={`${activeBrowser.isOpen ? 'max-h-[80vh]' : 'max-h-[100vh]'} overflow-y-auto pr-2 custom-scrollbar`}>
                <div className="space-y-3">
                  {products.map(product => (
                    <div key={product.id} className={`mb-2 ${activeBrowser.isOpen ? 'transform scale-90 origin-top-left' : ''}`}>
                      <ProductsCard
                        title={product.title}
                        price={product.price}
                        specs={product.specs}
                        discount={product.discount}
                        bank={product.bank}
                        deliveryDate={product.deliveryDate}
                        imageUrl={product.imageUrl}
                        productUrl={product.productUrl}
                        onOpenBrowser={handleOpenBrowser}
                        compactMode={activeBrowser.isOpen}
                      />
                    </div>
                  ))}
                  
                  {products.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-gray-500">No products found for "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Browser section with search functionality - takes up larger portion of container when active */}
          {activeBrowser.isOpen && (
            <div className="w-full lg:w-[70%] flex flex-col">
              {/* Browser window */}
              <div className="bg-white rounded-lg shadow-xl overflow-hidden h-[60vh] flex flex-col">
                <div className="flex items-center justify-between p-3 border-b">
                  <h3 className="text-base font-semibold text-gray-900">
                    Interactive Browser {isConnected && "(Connected)"}
                  </h3>
                  <button
                    onClick={handleCloseBrowser}
                    className="text-gray-600 p-1.5 hover:bg-gray-200 rounded-lg"
                    aria-label="Close browser"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                
                <div className="relative flex-1 p-0 overflow-hidden">
                  {isBrowserLoading && !imageBitmap && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
                      <span className="ml-2 text-gray-600">Loading...</span>
                    </div>
                  )}
                  
                  {browserError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500">
                      <p className="mb-2">Error: {browserError}</p>
                      <button
                        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                        onClick={() => startSession(activeBrowser.url)}
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  
                  {/* Canvas for super-fast rendering - optimized dimensions */}
                  <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain"
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    onWheel={handleWheel}
                    tabIndex={0}
                  />
                </div>
              </div>
              
              {/* Search bar and recommendations below browser */}
              <div className="mt-4 space-y-3">
                {/* Search bar */}
                <div className="relative w-full">
                  <form onSubmit={handleBrowserSearch} className="flex">
                    <div className="relative flex-grow">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Search for anything...Track any detail for this product...Ask about any detail and review of this product..."
                        value={browserSearchQuery}
                        onChange={(e) => setBrowserSearchQuery(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-gray-50 text-sm text-gray-700 hover:bg-gray-100 rounded-r-md"
                    >
                      Search
                    </button>
                  </form>
                </div>
                
                {/* Recommendation tabs */}
                <div className="flex w-full border rounded-md overflow-hidden">
                  <button className="flex-1 py-2 px-4 bg-blue-50 border-r text-xs font-medium">
                    Search Recommendations
                  </button>
                  <button className="flex-1 py-2 px-4 bg-white border-r text-xs font-medium">
                    Track Recommendations
                  </button>
                  <button className="flex-1 py-2 px-4 bg-white text-xs font-medium">
                    Ask Recommendations
                  </button>
                </div>
                
                {/* Recommendation content */}
                <div className="border rounded-md p-3 bg-white">
                  <ul className="space-y-2">
                    <li className="flex items-center text-xs text-gray-700">
                      <svg className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Search for related products (I recc) (AI determined) eg: phones
                    </li>
                    <li className="flex items-center text-xs text-gray-700">
                      <svg className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Search for related products 2 recc (AI determined) eg: pink covers
                    </li>
                    <li className="flex items-center text-xs text-gray-700">
                      <svg className="h-4 w-4 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      Search for this exact product on other platforms to get more deals
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults; 