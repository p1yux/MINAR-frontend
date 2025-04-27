"use client";

import React from "react";
import WishlistCard from "./WishlistCard";
import { useFetchWishlist } from "@/hooks/wishlist/useFetchWishlist";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback for when wishlist is loading
const WishlistSkeleton = () => {
  return Array(8)
    .fill(0)
    .map((_, index) => (
      <div key={index} className="bg-[#f7f7f7] rounded-lg overflow-hidden shadow-sm p-4">
        <div className="flex justify-center mb-4">
          <Skeleton className="h-28 w-28 rounded-md" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
          <Skeleton className="h-6 w-24 mx-auto rounded-full mt-2" />
        </div>
      </div>
    ));
};

const WishlistGrid = () => {
  const { data: wishlistItems, isLoading, error } = useFetchWishlist();

  return (
    <section className="py-12 bg-[#faf8f5]">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Minar Wishlist</h1>
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500">Failed to load wishlist items. Please try again later.</p>
          </div>
        )}
        
        {!error && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {isLoading ? (
              <WishlistSkeleton />
            ) : wishlistItems && wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <WishlistCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  category={item.product_type || "Product / Site Catalog"}
                  imageUrl={item.product_image_url}
                  productUrl={item.product_url}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">Your wishlist is empty.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistGrid; 