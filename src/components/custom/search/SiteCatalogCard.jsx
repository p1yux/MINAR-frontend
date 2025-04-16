"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const SiteCatalogCard = ({ title, sourceName, startingPrice, imageUrl }) => {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <div className="mb-3">
        <div className="relative h-28 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>
      
      <h3 className="text-sm font-medium text-center mb-1">{title}</h3>
      
      {startingPrice && (
        <div className="text-xs text-gray-600 text-center mb-3">
          <p>Laptops starting from ₹{startingPrice}</p>
        </div>
      )}
      
      <div className="flex flex-col gap-1.5">
        <Link href="#">
          <div className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-medium py-1.5 px-3 rounded-full text-center transition-colors">
            Browse on Minar
          </div>
        </Link>
        
        <Link href="#">
          <div className="border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-medium py-1.5 px-3 rounded-full text-center transition-colors flex items-center justify-center gap-1">
            <span>Add to Minar Wishlist</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-3 h-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SiteCatalogCard;
