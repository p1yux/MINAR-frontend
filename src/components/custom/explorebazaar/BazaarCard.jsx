"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const BazaarCard = ({ title, imageUrl, url }) => {
  // Use provided URL or fallback to # if not available
  const targetUrl = url || "#";

  return (
    <div className="overflow-hidden rounded-sm bg-white shadow-sm hover:shadow-md transition-all duration-300 ">
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-900 px-3 pt-3">{title}</h3>
        
        <Link href={targetUrl} target="_blank" rel="noopener noreferrer" className="block relative">
          <div className="relative h-32 w-43 justify-center items-center mx-auto my-2 rounded-sm overflow-hidden">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105 rounded-sm"
            />
            <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4"
              aria-hidden="true"
              style={{ rotate: "-30deg" }}
            >
              <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z" clipRule="evenodd" />
            </svg>
          </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BazaarCard;
