"use client";

import { useState, useEffect } from "react";

// Mock data that will be replaced with API calls in the future
const mockSiteCatalogs = [
  {
    id: 1,
    title: "Bedsheets from Amazon",
    sourceName: "Amazon",
    startingPrice: "16,000",
    imageUrl: "/images/search/amazon-bedsheets.jpg"
  },
  {
    id: 2,
    title: "Bedsheets from Flipkart",
    sourceName: "Flipkart",
    startingPrice: "15,000",
    imageUrl: "/images/search/flipkart-bedsheets.jpg"
  },
  {
    id: 3,
    title: "Bedsheets from Myntra",
    sourceName: "Myntra",
    startingPrice: null,
    imageUrl: "/images/search/myntra-bedsheets.jpg"
  }
];

const mockProducts = [
  {
    id: 1,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    price: "56,990",
    specs: null,
    discount: "1500",
    bank: "HDFC",
    deliveryDate: "Sun, 27 Apr",
    imageUrl: "/images/search/hp-laptop.jpg"
  },
  {
    id: 2,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    price: "56,990",
    specs: null,
    discount: "1500",
    bank: "HDFC",
    deliveryDate: "Sun, 27 Apr",
    imageUrl: "/images/search/hp-laptop.jpg"
  },
  {
    id: 3,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    price: "56,990",
    specs: null,
    discount: "1500",
    bank: "HDFC",
    deliveryDate: "Sun, 27 Apr",
    imageUrl: "/images/search/hp-laptop.jpg"
  },
  {
    id: 4,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    price: "56,990",
    specs: null,
    discount: "1500",
    bank: "HDFC",
    deliveryDate: "Sun, 27 Apr",
    imageUrl: "/images/search/hp-laptop.jpg"
  },
  {
    id: 5,
    title: "HP 15, 13th Gen Intel Core i5-13344, 16GB DDR4, 512GB SSD, (Win 11, Office 21, Silver, 1.59kg), Anti-Glare, 15.6-inch(39.6cm) FHD Laptop, Iris Xe Graphics, FHD Camera",
    price: "56,990",
    specs: null,
    discount: "1500",
    bank: "HDFC",
    deliveryDate: "Sun, 27 Apr",
    imageUrl: "/images/search/hp-laptop.jpg"
  }
];

/**
 * Custom hook to fetch search data
 * @param {string} query - The search query
 * @returns {Object} Object containing search results
 */
export const useSearchData = (query) => {
  const [isLoading, setIsLoading] = useState(true);
  const [siteCatalogs, setSiteCatalogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // In the future, these will be actual API calls
        // const siteCatalogsResponse = await fetch(`/api/search/site-catalogs?query=${searchQuery}`);
        // const siteCatalogs = await siteCatalogsResponse.json();
        
        // const productsResponse = await fetch(`/api/search/products?query=${searchQuery}`);
        // const products = await productsResponse.json();
        
        setSiteCatalogs(mockSiteCatalogs);
        setProducts(mockProducts);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred');
        setIsLoading(false);
      }
    };

    if (searchQuery) {
      fetchData();
    }
  }, [searchQuery]);

  const updateSearchQuery = (newQuery) => {
    setSearchQuery(newQuery);
  };

  return {
    isLoading,
    siteCatalogs,
    products,
    error,
    searchQuery,
    updateSearchQuery
  };
};

export default useSearchData; 