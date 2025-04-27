"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

// Fallback mock data in case API fails
const mockBazaarCategories = [
  { id: 1, title: "Rayban Sunglasses", imageUrl: "/images/bazaar/rayban.jpg" },
  { id: 2, title: "Nike Air Max On", imageUrl: "/images/bazaar/nike.jpg" },
  { id: 3, title: "Bridal Jewellery", imageUrl: "/images/bazaar/bridal.jpg" },
  { id: 4, title: "Bags from all brands", imageUrl: "/images/bazaar/bags.jpg" },
  { id: 5, title: "Makeup", imageUrl: "/images/bazaar/makeup.jpg" },
  { id: 6, title: "Premium shoes for everyday use", imageUrl: "/images/bazaar/shoes.jpg" },
  { id: 7, title: "Western wedding dresses", imageUrl: "/images/bazaar/wedding.jpg" },
  { id: 8, title: "Men's Jeans", imageUrl: "/images/bazaar/jeans.jpg" },
];

const mockPopularSearches = [
  "Where can I get red dresses below 3000",
  "I wanted to buy the canon 700D but can't decide",
  "Find me a bouquet of roses and tulips under...",
  "Large step rugs for the living room below",
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
        // Fetch bazaar data from the API
        const response = await axiosInstance.get("/api/bazaar/");
        
        // Transform API response to match component expectations
        const transformedCategories = response.data.map(item => ({
          id: item.id,
          title: item.title,
          imageUrl: item.image_url,
          url: item.url // Store the URL for redirection
        }));
        
        setCategories(transformedCategories);
        setPopularSearches(mockPopularSearches); // Keep static popular searches for now
        setIsLoading(false);
      } catch (err) {
        console.error("Bazaar data fetch error:", err.response || err);
        toast.error("Failed to load bazaar data");
        
        // Fallback to mock data if API fails
        setCategories(mockBazaarCategories);
        setPopularSearches(mockPopularSearches);
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