"use client";

import { useState, useEffect } from "react";

// This mock data will be replaced with actual API calls
const mockBazaarCategories = [
  { id: 1, title: "Rayban Sunglasses", imageUrl: "/images/bazaar/rayban.jpg" },
  { id: 2, title: "Nike Air Max On", imageUrl: "/images/bazaar/nike.jpg" },
  { id: 3, title: "Bridal Jewellery", imageUrl: "/images/bazaar/bridal.jpg" },
  { id: 4, title: "Bags from all brands", imageUrl: "/images/bazaar/bags.jpg" },
  { id: 5, title: "Makeup", imageUrl: "/images/bazaar/makeup.jpg" },
  { id: 6, title: "Premium shoes for everyday use", imageUrl: "/images/bazaar/shoes.jpg" },
  { id: 7, title: "Western wedding dresses", imageUrl: "/images/bazaar/wedding.jpg" },
  { id: 8, title: "Men's Jeans", imageUrl: "/images/bazaar/jeans.jpg" },
  { id: 9, title: "Women's traditional", imageUrl: "/images/bazaar/women-traditional.jpg" },
  { id: 10, title: "Men's Indian traditional", imageUrl: "/images/bazaar/men-traditional.jpg" },
  { id: 11, title: "Pretty tops for women", imageUrl: "/images/bazaar/tops.jpg" },
  { id: 12, title: "Leather jackets", imageUrl: "/images/bazaar/jackets.jpg" },
  { id: 13, title: "iPhone 16", imageUrl: "/images/bazaar/iphone.jpg" },
  { id: 14, title: "Laptops for professionals", imageUrl: "/images/bazaar/laptops.jpg" },
  { id: 15, title: "Air Conditioner", imageUrl: "/images/bazaar/ac.jpg" },
  { id: 16, title: "Smart TV", imageUrl: "/images/bazaar/tv.jpg" },
  { id: 17, title: "Headphones, earphones", imageUrl: "/images/bazaar/headphones.jpg" },
  { id: 18, title: "Bluetooth speakers", imageUrl: "/images/bazaar/speakers.jpg" },
  { id: 19, title: "Comfy sofas for home", imageUrl: "/images/bazaar/sofa.jpg" },
  { id: 20, title: "Wardrobes, cupboards", imageUrl: "/images/bazaar/wardrobe.jpg" },
  { id: 21, title: "John Grisham books", imageUrl: "/images/bazaar/grisham.jpg" },
  { id: 22, title: "Spiritual books", imageUrl: "/images/bazaar/spiritual.jpg" },
  { id: 23, title: "Toys for Kids", imageUrl: "/images/bazaar/toys.jpg" },
  { id: 24, title: "Dog food under 5k", imageUrl: "/images/bazaar/dogfood.jpg" },
];

const mockPopularSearches = [
  "Where can I get red dresses below 3000",
  "I wanted to buy the canon 700D but can't decide",
  "Find me a bouquet of roses and tulips under...",
  "Large step rugs for the living room below",
  "Outfits I can wear to dinner with husband...",
  "Find me gaming laptops below 1.5 lakhs...",
  "Find all deals on the new iPhone 16, deals...",
  "Denim shorts that sell wooden coffee mugs..."
];

/**
 * Custom hook to fetch bazaar data
 * @returns {Object} Object containing bazaar categories and popular searches
 */
export const useBazaarData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In the future, these will be actual API calls
        // const categoriesResponse = await fetch('/api/bazaar/categories');
        // const categories = await categoriesResponse.json();
        
        // const searchesResponse = await fetch('/api/bazaar/popular-searches');
        // const searches = await searchesResponse.json();
        
        setCategories(mockBazaarCategories);
        setPopularSearches(mockPopularSearches);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    categories,
    popularSearches,
    isLoading,
    error
  };
};

export default useBazaarData; 