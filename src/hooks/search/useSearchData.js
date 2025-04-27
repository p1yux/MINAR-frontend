// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useSearchParams } from "next/navigation";
// import axiosInstance from "@/lib/axios";

// /**
//  * Custom hook to fetch search data
//  * @param {string} query - The search query
//  * @returns {Object} Object containing search results
//  */
// export const useSearchData = (query) => {
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(true);
//   const [siteCatalogs, setSiteCatalogs] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(query || "");
//   const [suggestions, setSuggestions] = useState([]);
  
//   // Get sort parameters from URL
//   const sortBy = searchParams?.get("sort") || "";
//   const sortOrder = searchParams?.get("order") || "asc";
  
//   // Add refs to track API calls
//   const lastQueryRef = useRef(null);
//   const apiCallInProgressRef = useRef(false);
//   const apiTimeoutRef = useRef(null);

//   // Helper function to validate URL
//   const safeImageUrl = (url) => {
//     if (!url) return "/images/search/placeholder.jpg";
    
//     // Check if URL is already local
//     if (url.startsWith('/')) return url;
    
//     try {
//       // Basic URL validation
//       return url && (url.startsWith('http://') || url.startsWith('https://')) 
//         ? url 
//         : "/images/search/placeholder.jpg";
//     } catch (e) {
//       return "/images/search/placeholder.jpg";
//     }
//   };
  
//   // Helper function to parse numeric values from strings
//   const parseNumericValue = (str) => {
//     if (!str) return 0;
//     const numStr = str.toString().replace(/[^0-9.]/g, '');
//     return numStr ? parseFloat(numStr) : 0;
//   };
  
//   // Helper function to get sortable rating value
//   const getRatingValue = (product) => {
//     if (!product.bank) return 0;
//     const ratingMatch = product.bank.match(/(\d+(\.\d+)?)/);
//     return ratingMatch ? parseFloat(ratingMatch[0]) : 0;
//   };
  
//   // Helper function to sort products
//   const sortProducts = (products) => {
//     if (!sortBy) return products;
    
//     return [...products].sort((a, b) => {
//       let aValue, bValue;
      
//       switch (sortBy) {
//         case "price":
//           aValue = parseNumericValue(a.price);
//           bValue = parseNumericValue(b.price);
//           break;
//         case "rating":
//           aValue = getRatingValue(a);
//           bValue = getRatingValue(b);
//           break;
//         case "availability":
//           // Sort by availability status (in stock first)
//           aValue = a.deliveryDate?.toLowerCase().includes("in stock") ? 1 : 0;
//           bValue = b.deliveryDate?.toLowerCase().includes("in stock") ? 1 : 0;
//           break;
//         case "position":
//           aValue = a.id;
//           bValue = b.id;
//           break;
//         default:
//           return 0;
//       }
      
//       // Apply sort order
//       return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
//     });
//   };

//   useEffect(() => {
//     // Clear any existing timeout to implement debouncing
//     if (apiTimeoutRef.current) {
//       clearTimeout(apiTimeoutRef.current);
//     }
    
//     // If no search query or same as last query, don't fetch
//     if (!searchQuery || searchQuery === lastQueryRef.current) {
//       return;
//     }
    
//     // Update loading state only if we're going to do a new search
//     setIsLoading(true);
    
//     // Debounce the API call (300ms)
//     apiTimeoutRef.current = setTimeout(async () => {
//       // Skip if API call already in progress for this query
//       if (apiCallInProgressRef.current) {
//         return;
//       }
      
//       // Set API call in progress flag
//       apiCallInProgressRef.current = true;
      
//       // Save this query as the last one requested
//       lastQueryRef.current = searchQuery;
      
//       try {
//         // Make API request
//         const response = await axiosInstance.post(
//           "/api/search/",
//           { input_text: searchQuery },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
        
//         const data = response.data.output.data[0];
        
//         // Extract listings (site catalogs) and products from response
//         if (data && data.listings) {
//           setSiteCatalogs(data.listings.map((listing, index) => ({
//             id: index + 1,
//             title: listing.title || "Untitled Listing",
//             sourceName: listing.hostname || "Unknown Source",
//             startingPrice: listing.price ? listing.price.replace("Prices on matching products from ", "").replace("₹", "").trim() : null,
//             imageUrl: safeImageUrl(listing.image_url)
//           })));
//         }
        
//         if (data && data.products) {
//           const mappedProducts = data.products.map((product, index) => ({
//             id: index + 1,
//             title: product.title || "Untitled Product",
//             price: product.price ? product.price.replace("₹", "").trim() : "N/A",
//             specs: null,
//             discount: product.other_details?.Discount || null,
//             bank: product.other_details?.Rating || null,
//             deliveryDate: product.other_details?.Availability || "Check website",
//             imageUrl: safeImageUrl(product.image_url),
//             position: product.position || index + 1
//           }));
          
//           // Apply sorting to products
//           setProducts(sortProducts(mappedProducts));
//         }
        
//         // Extract suggestions for future searches if available
//         if (response.data.output.data[1] && response.data.output.data[1].search) {
//           setSuggestions(response.data.output.data[1].search.map(item => ({
//             id: item.sub_task,
//             query: item.product
//           })));
//         }
        
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Search error:", err.response || err);
//         setError(err.message || 'An error occurred while fetching search results');
//         setIsLoading(false);
//       } finally {
//         // Reset the API call flag
//         apiCallInProgressRef.current = false;
//       }
//     }, 300); // 300ms debounce

//     // Cleanup function
//     return () => {
//       if (apiTimeoutRef.current) {
//         clearTimeout(apiTimeoutRef.current);
//       }
//     };
//   }, [searchQuery, sortBy, sortOrder]);

//   const updateSearchQuery = (newQuery) => {
//     // Only update if different from current query to prevent unnecessary rerenders
//     if (newQuery !== searchQuery) {
//       setSearchQuery(newQuery);
//     }
//   };

//   return {
//     isLoading,
//     siteCatalogs,
//     products,
//     suggestions,
//     error,
//     searchQuery,
//     updateSearchQuery
//   };
// };

// export default useSearchData; 



"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/lib/axios";

/**
 * Custom hook to fetch search data
 * @param {string} query - The search query
 * @returns {Object} Object containing search results
 */
export const useSearchData = (query) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [siteCatalogs, setSiteCatalogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query || "");
  const [suggestions, setSuggestions] = useState([]);
  
  // Get sort parameters from URL
  const sortBy = searchParams?.get("sort") || "";
  const sortOrder = searchParams?.get("order") || "asc";
  
  // Add refs to track API calls
  const lastQueryRef = useRef(null);
  const apiCallInProgressRef = useRef(false);
  const apiTimeoutRef = useRef(null);

  // Helper function to validate URL - memoized with useCallback
  const safeImageUrl = useCallback((url) => {
    if (!url) return "/images/search/placeholder.jpg";
    
    // Check if URL is already local
    if (url.startsWith('/')) return url;
    
    try {
      // Basic URL validation
      return url && (url.startsWith('http://') || url.startsWith('https://')) 
        ? url 
        : "/images/search/placeholder.jpg";
    } catch (e) {
      return "/images/search/placeholder.jpg";
    }
  }, []);
  
  // Helper function to parse numeric values from strings - memoized with useCallback
  const parseNumericValue = useCallback((str) => {
    if (!str) return 0;
    const numStr = str.toString().replace(/[^0-9.]/g, '');
    return numStr ? parseFloat(numStr) : 0;
  }, []);
  
  // Helper function to get sortable rating value - memoized with useCallback
  const getRatingValue = useCallback((product) => {
    if (!product.bank) return 0;
    const ratingMatch = product.bank.match(/(\d+(\.\d+)?)/);
    return ratingMatch ? parseFloat(ratingMatch[0]) : 0;
  }, []);
  
  // Helper function to sort products - memoized with useCallback
  const sortProducts = useCallback((products) => {
    if (!sortBy) return products;
    
    return [...products].sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "price":
          aValue = parseNumericValue(a.price);
          bValue = parseNumericValue(b.price);
          break;
        case "rating":
          aValue = getRatingValue(a);
          bValue = getRatingValue(b);
          break;
        case "availability":
          // Sort by availability status (in stock first)
          aValue = a.deliveryDate?.toLowerCase().includes("in stock") ? 1 : 0;
          bValue = b.deliveryDate?.toLowerCase().includes("in stock") ? 1 : 0;
          break;
        case "position":
          aValue = a.id;
          bValue = b.id;
          break;
        default:
          return 0;
      }
      
      // Apply sort order
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    });
  }, [sortBy, sortOrder, parseNumericValue, getRatingValue]);

  useEffect(() => {
    // Clear any existing timeout to implement debouncing
    if (apiTimeoutRef.current) {
      clearTimeout(apiTimeoutRef.current);
    }
    
    // If no search query or same as last query, don't fetch
    if (!searchQuery || searchQuery === lastQueryRef.current) {
      return;
    }
    
    // Update loading state only if we're going to do a new search
    setIsLoading(true);
    
    // Debounce the API call (300ms)
    apiTimeoutRef.current = setTimeout(async () => {
      // Skip if API call already in progress for this query
      if (apiCallInProgressRef.current) {
        return;
      }
      
      // Set API call in progress flag
      apiCallInProgressRef.current = true;
      
      // Save this query as the last one requested
      lastQueryRef.current = searchQuery;
      
      try {
        // Make API request
        const response = await axiosInstance.post(
          "/api/search/",
          { input_text: searchQuery },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        const data = response.data.output.data[0];
        
        // Extract listings (site catalogs) and products from response
        if (data && data.listings) {
          setSiteCatalogs(data.listings.map((listing, index) => ({
            id: index + 1,
            title: listing.title || "Untitled Listing",
            sourceName: listing.hostname || "Unknown Source",
            startingPrice: listing.price ? listing.price.replace("Prices on matching products from ", "").replace("₹", "").trim() : null,
            imageUrl: safeImageUrl(listing.image_url)
          })));
        }
        
        if (data && data.products) {
          const mappedProducts = data.products.map((product, index) => ({
            id: index + 1,
            title: product.title || "Untitled Product",
            price: product.price ? product.price.replace("₹", "").trim() : "",
            specs: null,
            discount: product.other_details?.Discount || null,
            bank: product.other_details?.Rating || null,
            deliveryDate: product.other_details?.Availability || "Check website",
            imageUrl: safeImageUrl(product.image_url),
            position: product.position || index + 1
          }));
          
          // Apply sorting to products
          setProducts(sortProducts(mappedProducts));
        }
        
        // Extract suggestions for future searches if available
        if (response.data.output.data[1] && response.data.output.data[1].search) {
          setSuggestions(response.data.output.data[1].search.map(item => ({
            id: item.sub_task,
            query: item.product
          })));
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Search error:", err.response || err);
        setError(err.message || 'An error occurred while fetching search results');
        setIsLoading(false);
      } finally {
        // Reset the API call flag
        apiCallInProgressRef.current = false;
      }
    }, 300); // 300ms debounce

    // Cleanup function
    return () => {
      if (apiTimeoutRef.current) {
        clearTimeout(apiTimeoutRef.current);
      }
    };
  }, [searchQuery, sortBy, sortOrder, safeImageUrl, sortProducts]);

  const updateSearchQuery = (newQuery) => {
    // Only update if different from current query to prevent unnecessary rerenders
    if (newQuery !== searchQuery) {
      setSearchQuery(newQuery);
    }
  };

  return {
    isLoading,
    siteCatalogs,
    products,
    suggestions,
    error,
    searchQuery,
    updateSearchQuery
  };
};

export default useSearchData;