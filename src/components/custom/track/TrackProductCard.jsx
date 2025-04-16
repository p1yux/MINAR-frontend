"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

const TrackProductCard = ({
  title,
  imageUrl,
  price,
  currentValue,
  initialValue,
  isTracking = true,
  onToggleTracking
}) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-4 border border-gray-100">
      <div className="flex items-start gap-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <div className="relative h-24 w-24 overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xs font-medium text-gray-900 mb-1.5 line-clamp-2">{title}</h3>
          
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-md inline-block mb-2">
            Current Value: Rs {currentValue || price || initialValue}
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-1.5 mt-2">
            <Link href="#">
              <div className="bg-yellow-400 hover:bg-yellow-500 text-black text-[10px] font-medium py-1 px-2 rounded-full transition-colors">
                Browse on Minar
              </div>
            </Link>
            
            <Link href="#">
              <div className="border border-gray-300 hover:border-gray-400 text-gray-700 text-[10px] font-medium py-1 px-2 rounded-full flex items-center gap-0.5 transition-colors">
                <span>Add to Minar Wishlist</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  strokeWidth={1.5} 
                  stroke="currentColor" 
                  fill="none"
                  className="w-2 h-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Tracking Controls */}
        <div className="flex flex-col space-y-2 min-w-[180px] ml-2">
          <button className="text-[10px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors w-full text-center">
            Task: let me know when price changes
          </button>
          
          <button className="text-[10px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors w-full text-center">
            Metric being tracked: Price
          </button>
          
          <button className="text-[10px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors w-full text-center">
            Initial value: Rs {initialValue || price}
          </button>
        </div>
      </div>
      
      {/* Remove Tracking */}
      {/* <div className="flex items-center mt-3">
        <div className="flex items-center gap-2">
          <div className="bg-red-50 text-red-700 text-[10px] px-2 py-1 rounded-md">
            Remove Tracking
          </div>
          <Switch
            checked={isTracking}
            onCheckedChange={onToggleTracking}
            className="data-[state=checked]:bg-gray-500"
            size="sm"
          />
        </div>
      </div> */}
    </div>
  );
};

export default TrackProductCard;
