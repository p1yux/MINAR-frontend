"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCreateWishlist } from "@/hooks/wishlist/useCreateWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";

const SiteCatalogCard = ({ 
  title, 
  sourceName, 
  startingPrice, 
  imageUrl,
  productUrl, // URL for the catalog
  onOpenBrowser, // New prop for browser control
  compactMode = false // Flag for compact display mode
}) => {
  const { addToWishlist, isLoading } = useCreateWishlist();
  const { data: wishlistItems } = useFetchWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);
  
  // Use a default image if imageUrl is not provided or invalid
  const fallbackImageUrl = "/images/search/placeholder.jpg";
  
  // Check if the URL is a valid image URL
  const isValidImageUrl = imageUrl && 
    (imageUrl.startsWith('/') || 
     imageUrl.startsWith('http') || 
     imageUrl.startsWith('https'));
  
  const displayImageUrl = isValidImageUrl ? imageUrl : fallbackImageUrl;
  
  // Use actual product URL or fallback to current page
  const actualProductUrl = productUrl || window.location.href;

  // Check if this catalog is already in wishlist
  useEffect(() => {
    if (wishlistItems && wishlistItems.length > 0) {
      const found = wishlistItems.some(item => 
        item.title === title && 
        item.product_image_url === displayImageUrl
      );
      setIsInWishlist(found);
    }
  }, [wishlistItems, title, displayImageUrl]);

  const handleAddToWishlist = () => {
    if (!isInWishlist) {
      addToWishlist({
        title: title,
        product_image_url: displayImageUrl,
        product_url: actualProductUrl,
        product_type: "Catalog"
      });
    }
  };

  const handleOpenBrowser = () => {
    if (onOpenBrowser) {
      onOpenBrowser(actualProductUrl);
    }
  };

  return (
    <div className={`bg-white rounded-md shadow-sm ${compactMode ? 'p-2' : 'p-4'}`}>
        {/* Catalog Image */}
      <div className={`${compactMode ? 'mb-2' : 'mb-3'}`}>
        <div className={`relative ${compactMode ? 'h-20' : 'h-28'} w-full overflow-hidden rounded`}>
            {isValidImageUrl ? (
              <Image
                src={displayImageUrl}
                alt={title}
                fill
                className="object-cover"
                unoptimized={!displayImageUrl.startsWith('/')}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
                No image
              </div>
            )}
          </div>
        </div>
        
        {/* Catalog Details */}
      <h3 className={`${compactMode ? 'text-xs' : 'text-sm'} font-medium text-center mb-1 line-clamp-2`}>{title}</h3>
      <p className={`${compactMode ? 'text-[8px]' : 'text-[10px]'} text-gray-600 text-center ${compactMode ? 'mb-1.5' : 'mb-2'}`}>
          {sourceName || "Unknown Source"}
          {startingPrice && ` • Starting from ₹${startingPrice}`}
        </p>
        
      {/* Action Buttons - horizontal in compact mode */}
      {compactMode ? (
        <div className="flex gap-1">
          <button
            onClick={handleOpenBrowser}
            className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black text-[8px] font-medium py-1 px-2 rounded-full transition-colors"
            aria-label={`Browse ${title} on Minar`}
          >
            Browse
          </button>
          
          <button
            onClick={handleAddToWishlist}
            disabled={isLoading || isInWishlist}
            className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 text-[8px] font-medium py-1 px-2 rounded-full flex items-center justify-center gap-0.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isInWishlist ? "Already in wishlist" : "Add to Minar Wishlist"}
          >
            <span>{isInWishlist ? "In Wishlist" : "Wishlist"}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isInWishlist ? "currentColor" : "none"}
              stroke={isInWishlist ? "none" : "currentColor"}
              strokeWidth={1.5}
              className="w-1.5 h-1.5 text-red-500"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-1.5">
          <button
            onClick={handleOpenBrowser}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-medium py-1.5 px-3 rounded-full transition-colors"
            aria-label={`Browse ${title} on Minar`}
          >
            Browse on Minar
          </button>
          
          <button
            onClick={handleAddToWishlist}
            disabled={isLoading || isInWishlist}
            className="w-full border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full flex items-center justify-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isInWishlist ? "Already in wishlist" : "Add to Minar Wishlist"}
          >
            <span>{isInWishlist ? "In Wishlist" : "Add to Minar Wishlist"}</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill={isInWishlist ? "currentColor" : "none"}
              stroke={isInWishlist ? "none" : "currentColor"}
              strokeWidth={1.5}
              className="w-3 h-3 text-red-500"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </button>
        </div>
      )}
      </div>
  );
};

export default SiteCatalogCard;
