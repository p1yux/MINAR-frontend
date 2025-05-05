"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useLogoutUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await axiosInstance.post("/api/auth/logout/", null, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        });
        return response.data;
      } catch (error) {
        console.error("Logout error:", error.response || error);
        throw error;
      }
    },
    onSuccess: () => {
      // Clear user data from React Query cache
      queryClient.clear();
      
      // Show success notification
      toast.success("Logged out successfully");
      
      // Redirect to login page
      router.push("/login");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to log out");
      
      // Force logout on client-side even if API fails
      queryClient.clear();
    },
  });

  return {
    logout: logoutMutation.mutate,
    isLoading: logoutMutation.isPending,
  };
};
