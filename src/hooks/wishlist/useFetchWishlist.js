"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";

export const useFetchWishlist = () => {
  const fetchWishlist = async () => {
    try {
      const response = await axiosInstance.get("/api/wishlist/");
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlist:", error.response || error);
      toast.error("Failed to load wishlist items");
      throw error;
    }
  };

  return useQuery({
    queryKey: ["wishlist"],
    queryFn: fetchWishlist,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
  });
};

export default useFetchWishlist;
