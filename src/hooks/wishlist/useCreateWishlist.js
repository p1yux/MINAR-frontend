"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const useCreateWishlist = () => {
  const queryClient = useQueryClient();

  const createWishlistMutation = useMutation({
    mutationFn: async (wishlistItem) => {
      try {
        const response = await axiosInstance.post(
          "/api/wishlist/",
          {
            title: wishlistItem.title,
            product_image_url: wishlistItem.product_image_url,
            product_url: wishlistItem.product_url,
            product_type: wishlistItem.product_type
          },
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken")
            },
          }
        );
        
        return response.data;
      } catch (error) {
        console.error("Wishlist creation error:", error.response || error);
        
        if (error.response) {
          const errorMessage = error.response.data?.detail || error.response.data?.message || 'Failed to add item to wishlist';
          throw new Error(errorMessage);
        } else if (error.request) {
          throw new Error("Network error. Please check your connection.");
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast.success("Item added to wishlist!");
      
      // Invalidate wishlist query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add item to wishlist");
    }
  });

  return {
    addToWishlist: createWishlistMutation.mutate,
    addToWishlistAsync: createWishlistMutation.mutateAsync,
    isLoading: createWishlistMutation.isPending,
    isError: createWishlistMutation.isError,
    error: createWishlistMutation.error,
  };
};

export default useCreateWishlist;
