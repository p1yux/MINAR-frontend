"use client";

import React from "react";
import BazaarCard from "./BazaarCard";
import useBazaarData from "@/hooks/bazaar/useBazaarData";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Bazaar Skeleton Component
const BazaarSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 max-w-6xl mx-auto">
      {Array(6).fill(0).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-sm bg-white shadow-sm">
          <div className="flex flex-col">
            <Skeleton className="h-4 w-3/4 mx-3 mt-3" />
            <div className="relative h-32 w-43 justify-center items-center mx-auto my-2 rounded-sm overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const ExploreBazaar = () => {
  const { categories, isLoading, error } = useBazaarData();

  if (isLoading) {
    return (
      <section 
        className="py-16 relative bg-[#faf8f5]" 
        style={{ 
          backgroundImage: "url('/images/bazaar/bazaarbg.png')", 
          backgroundSize: "110%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-0 left-0 right-0 -translate-y-1/2 flex justify-center">
          <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-6 text-lg shadow-md">
            Explore the Bazaar
          </Button>
        </div>
        
        <div className="container mx-auto px-6 mt-12">
          <BazaarSkeleton />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="py-16 relative" 
        style={{ 
          backgroundImage: "url('/images/bazaar/bazaarbg.png')", 
          backgroundSize: "160%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-red-500">Error loading bazaar data</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-16 relative mt-[-75px]  bg-[#faf8f5]" 
      // style={{ 
      //   backgroundImage: "url('/images/bazaar/bazaarbg.png')", 
      //   backgroundSize: "110%",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      //   width: "100%",
      //   height: "100%",
      // }}
    >
      <div className="absolute top-0 left-0 right-0 -translate-y-1/2 flex justify-center">
        <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-6 text-lg shadow-md">
          Explore the Bazaar
        </Button>
      </div>
      
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-6 max-w-6xl mx-auto">
          {categories.map((category) => (
            <BazaarCard
              key={category.id}
              title={category.title}
              imageUrl={category.imageUrl}
              url={category.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreBazaar; 