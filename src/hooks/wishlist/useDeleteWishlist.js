"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const useDeleteWishlist = () => {
  const queryClient = useQueryClient();

  const deleteWishlistMutation = useMutation({
    mutationFn: async (wishlistId) => {
      try {
        const response = await axiosInstance.delete(
          `/api/wishlist/${wishlistId}/`,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken")
            },
          }
        );
        
        return response.data;
      } catch (error) {
        console.error("Wishlist deletion error:", error.response || error);
        
        if (error.response) {
          const errorMessage = error.response.data?.detail || error.response.data?.message || 'Failed to remove item from wishlist';
          throw new Error(errorMessage);
        } else if (error.request) {
          throw new Error("Network error. Please check your connection.");
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast.success("Item removed from wishlist!");
      
      // Invalidate wishlist query to refetch the updated list
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to remove item from wishlist");
    }
  });

  return {
    removeFromWishlist: deleteWishlistMutation.mutate,
    removeFromWishlistAsync: deleteWishlistMutation.mutateAsync,
    isLoading: deleteWishlistMutation.isPending,
    isError: deleteWishlistMutation.isError,
    error: deleteWishlistMutation.error,
  };
};

export default useDeleteWishlist; 