import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginSchema } from "@/lib/zod/authSchemas";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useLoginUser = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [validationErrors, setValidationErrors] = useState({});
  const [apiErrors, setApiErrors] = useState(null);

  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      try {
        // Validate input with Zod
        loginSchema.parse(credentials);
        
        // Clear validation errors if validation passes
        setValidationErrors({});
        setApiErrors(null);
        
        // Make API request
        const response = await axiosInstance.post(
          "/api/auth/login/",
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken")
            },
          }
        );
        
        return response.data;
      } catch (error) {
        // Handle Zod validation errors
        if (error.name === "ZodError") {
          const formattedErrors = {};
          error.errors.forEach((err) => {
            formattedErrors[err.path[0]] = err.message;
          });
          setValidationErrors(formattedErrors);
          throw new Error("Validation failed");
        }
        
        // Handle API errors
        if (error.response) {
          // Server responded with a status code outside of 2xx range
          const errorMessage = error.response.data?.detail || error.response.data?.message || 'An error occurred';
          setApiErrors(errorMessage);
          throw new Error(errorMessage);
        } else if (error.request) {
          // Request was made but no response received
          setApiErrors("Network error. Please check your connection.");
          throw new Error("Network error. Please check your connection.");
        } else {
          // Something else happened
          setApiErrors(error.message || "An unexpected error occurred");
          throw error;
        }
      }
    },
    onSuccess: (data) => {
      toast.success("Login successful!");
      
      // Invalidate the profile query to refetch it with the new authentication
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      
      // Redirect to home page
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message || "Login failed");
    }
  });

  return {
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoading: loginMutation.isPending,
    isError: loginMutation.isError,
    error: loginMutation.error,
    validationErrors,
    apiErrors,
  };
};
