"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const WishlistCard = ({ title, category, imageUrl }) => {
  return (
    <div className="relative bg-[#f7f7f7] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {/* Wishlist heart icon */}
      <div className="absolute top-2 right-2 z-10">
        <div className="text-red-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
        </div>
      </div>

      {/* Product image */}
      <div className="p-4 flex justify-center">
        <div className="relative h-28 w-28 mx-auto">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Product info */}
      <div className="p-3 text-center">
        <h3 className="text-xs font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">{title}</h3>
        <p className="text-[10px] text-gray-500 mt-1">{category}</p>
        
        {/* View button */}
        <Link href="#">
          <div className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black text-xs py-1 px-3 rounded-full inline-block transition-colors">
            View on Minar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WishlistCard;
