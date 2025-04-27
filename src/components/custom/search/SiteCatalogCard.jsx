"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCreateWishlist } from "@/hooks/wishlist/useCreateWishlist";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";

const SiteCatalogCard = ({ 
  title, 
  sourceName, 
  startingPrice, 
  imageUrl,
  productUrl // Add this prop to receive the actual catalog URL 
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

  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="mb-3">
        <div className="relative h-28 w-full overflow-hidden">
          {isValidImageUrl ? (
          <Image
              src={displayImageUrl}
            alt={title}
            fill
            className="object-contain"
              unoptimized={!displayImageUrl.startsWith('/')}
          />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs">
              No image available
            </div>
          )}
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-center mb-1">{title}</h3>
      
      {startingPrice && (
        <div className="text-xs text-gray-600 text-center mb-3">
          <p>Starting from ₹{startingPrice}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-1.5">
        <Link href={actualProductUrl || "#"} target="_blank" rel="noopener noreferrer">
          <div className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-medium py-1.5 px-3 rounded-full text-center transition-colors">
            Browse on Minar
          </div>
        </Link>
        
        <button
          onClick={handleAddToWishlist}
          disabled={isLoading || isInWishlist}
          className="border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full text-center transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
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
    </div>
  );
};

export default SiteCatalogCard;
