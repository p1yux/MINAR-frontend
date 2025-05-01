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
    updateSearchQuery,
    searchRecommendations
  } = useSearchData(initialQuery);
  
  // State for storing recommendations from API
  const [recommendations, setRecommendations] = useState({
    search: [],
    track: [],
    ask: []
  });
  
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

  // Update recommendations whenever searchRecommendations changes
  useEffect(() => {
    if (searchRecommendations) {
      console.log("Search recommendations updated:", searchRecommendations);
      setRecommendations({
        search: searchRecommendations.search || [],
        track: searchRecommendations.track || [],
        ask: searchRecommendations.ask || []
      });
    }
  }, [searchRecommendations]);

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

  // Update recommendations from search data when browser opens
  useEffect(() => {
    if (activeBrowser.isOpen && searchRecommendations) {
      setRecommendations({
        search: searchRecommendations.search || [],
        track: searchRecommendations.track || [],
        ask: searchRecommendations.ask || []
      });
    }
  }, [activeBrowser.isOpen, searchRecommendations]);

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
      <div className={`container mx-auto px-4 ${activeBrowser.isOpen ? 'w-full' : 'max-w-7xl'}`}>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content container - always visible but resized when browser is open */}
          <div className={`flex flex-col lg:flex-row w-full gap-4 ${activeBrowser.isOpen ? 'lg:w-[30%]' : ''}`}>
            {/* Left column - Site Catalogs */}
            <div className={`lg:w-[35%] border-r border-gray-200 pr-3 ${activeBrowser.isOpen ? 'lg:w-[48%] pr-2' : ''}`}>
              <div className="mb-2 text-center">
                <h2 className={`text-lg font-semibold mb-1  ${activeBrowser.isOpen ? 'text-sm' : ''}`}>Site Catalogs</h2>
                <p className={`text-xs text-gray-600 ${activeBrowser.isOpen ? 'text-[10px]' : ''}`}>All search results from source websites</p>
              </div>
              
              <div className={`${activeBrowser.isOpen ? 'max-h-[90vh]' : 'max-h-[100vh]'} overflow-y-auto pr-2 custom-scrollbar`}>
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
              <div className={`mb-2 text-center ${activeBrowser.isOpen ? 'mb-1' : 'mb-4'}`}>
                <h2 className={`text-lg font-semibold mb-1 ${activeBrowser.isOpen ? 'text-sm' : ''}`}>Recommended products</h2>
                <p className={`text-xs text-gray-600 ${activeBrowser.isOpen ? 'text-[10px]' : ''}`}>
                  {searchQuery ? `Results for "${searchQuery}"` : "Popular products"}
                </p>
              </div>
              
              <div className={`${activeBrowser.isOpen ? 'max-h-[90vh]' : 'max-h-[100vh]'} overflow-y-auto pr-2 custom-scrollbar`}>
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
                {/* <div className="flex items-center justify-between p-3 border-b">
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
                </div> */}
                
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
                  <button
                    onClick={handleCloseBrowser}
                    className="absolute top-2 right-2 z-10 bg-white text-gray-600 p-1.5 hover:bg-gray-200 rounded-lg shadow-md"
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
              </div>
              
              {/* Search bar and recommendations below browser */}
              <div className="mt-4 space-y-3">
                {/* Search bar with buttons */}
                <div className="relative w-full rounded-full border border-gray-300 bg-white overflow-hidden">
                  <div className="flex items-center">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <div className="h-8 w-8 bg-black rounded-full flex items-center justify-center">
                        {/* Black circle placeholder */}
                      </div>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-14 pr-3 py-2.5 bg-white text-sm focus:outline-none"
                      placeholder="Search for anything...Track any detail for this product...Ask about any detail and review of this product..."
                      value={browserSearchQuery}
                      onChange={(e) => setBrowserSearchQuery(e.target.value)}
                    />
                    <div className="flex items-center space-x-2 pr-2">
                      <button 
                        type="button" 
                        className="rounded-full px-3 py-1 border border-gray-300 text-xs"
                      >
                        <span className="flex items-center">
                          <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                          </svg>
                          Search
                        </span>
                      </button>
                      <button 
                        type="button" 
                        className="rounded-full px-3 py-1 border border-gray-300 text-xs"
                      >
                        <span className="flex items-center">
                          <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5h2v2H9v-2zm0-6h2v4H9V5z" />
                          </svg>
                          Track
                        </span>
                      </button>
                      <button 
                        type="button" 
                        className="rounded-full px-3 py-1 border border-gray-300 text-xs"
                      >
                        <span className="flex items-center">
                          <svg className="h-3.5 w-3.5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                          Ask
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Three recommendation sections */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Search Recommendations */}
                  <div className="bg-white rounded-md overflow-hidden">
                    <div className="p-2 border-b border-gray-700 bg-[#5B1233]">
                      <h3 className="text-white text-sm font-medium">Search Recommendations</h3>
                    </div>
                    <div className="p-3 pt-2">
                      <ul className="space-y-2">
                        {recommendations.search && recommendations.search.length > 0 ? (
                          recommendations.search.map((item, index) => (
                            <li key={`search-${index}`} className="flex items-center text-xs text-gray-700">
                              <div className="mr-2 flex-shrink-0">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <circle cx="12" cy="12" r="10" stroke="#5B1233" fill="white" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16l-6-6 1.5-1.5L12 13l4.5-4.5L18 10l-6 6z" stroke="#5B1233" />
                                </svg>
                              </div>
                              <span>{item.sub_task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-gray-500 text-center py-2">
                            {isLoading ? "Loading recommendations..." : "No search recommendations available"}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Track Recommendations */}
                  <div className="bg-white rounded-md overflow-hidden">
                    <div className="p-2 border-b border-gray-700 bg-[#3F4650]">
                      <h3 className="text-white text-sm font-medium">Track Recommendations</h3>
                    </div>
                    <div className="p-3 pt-2">
                      <ul className="space-y-2">
                        {recommendations.track && recommendations.track.length > 0 ? (
                          recommendations.track.map((item, index) => (
                            <li key={`track-${index}`} className="flex items-center text-xs text-gray-700">
                              <div className="mr-2 flex-shrink-0">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <circle cx="12" cy="12" r="10" stroke="#3F4650" fill="white" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16l-6-6 1.5-1.5L12 13l4.5-4.5L18 10l-6 6z" stroke="#3F4650" />
                                </svg>
                              </div>
                              <span>{item.sub_task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-gray-500 text-center py-2">
                            {isLoading ? "Loading recommendations..." : "No track recommendations available"}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  
                  {/* Ask Recommendations */}
                  <div className="bg-white rounded-md overflow-hidden">
                    <div className="p-2 border-b border-gray-700 bg-[#001C4E]">
                      <h3 className="text-white text-sm font-medium">Ask Recommendations</h3>
                    </div>
                    <div className="p-3 pt-2">
                      <ul className="space-y-2">
                        {recommendations.ask && recommendations.ask.length > 0 ? (
                          recommendations.ask.map((item, index) => (
                            <li key={`ask-${index}`} className="flex items-center text-xs text-gray-700">
                              <div className="mr-2 flex-shrink-0">
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <circle cx="12" cy="12" r="10" stroke="#001C4E" fill="white" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16l-6-6 1.5-1.5L12 13l4.5-4.5L18 10l-6 6z" stroke="#001C4E" />
                                </svg>
                              </div>
                              <span>{item.sub_task}</span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-gray-500 text-center py-2">
                            {isLoading ? "Loading recommendations..." : "No ask recommendations available"}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
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