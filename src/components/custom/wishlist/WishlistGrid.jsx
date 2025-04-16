"use client";

import React from "react";
import WishlistCard from "./WishlistCard";

// Static data for now as mentioned by the user
const mockWishlistItems = [
  {
    id: 1,
    title: "Women 5mm",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/product1.jpg"
  },
  {
    id: 2,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 3,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 4,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 5,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 6,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 7,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 8,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 9,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 10,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 11,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 12,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 13,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 14,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 15,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
  {
    id: 16,
    title: "Professional Laptops under 1.5 lakh",
    category: "Product / Site Catalog",
    imageUrl: "/images/wishlist/laptop.jpg"
  },
];

const WishlistGrid = () => {
  return (
    <section className="py-12 bg-[#faf8f5]">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Your Minar Wishlist</h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mockWishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              title={item.title}
              category={item.category}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistGrid; 