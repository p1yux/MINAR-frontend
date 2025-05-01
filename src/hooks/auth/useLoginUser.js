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
          // Check for 401 status code and email verification error messages in various formats
          if (error.response.status === 401) {
            const errorData = error.response.data;
            
            // Check common patterns for email verification error messages
            const isEmailNotVerified = 
              // Direct string messages
              errorData?.detail === "Email not verified" || 
              errorData?.message === "Email not verified" || 
              errorData?.error === "Email not verified" ||
              // Array of error messages
              (Array.isArray(errorData?.non_field_errors) && 
               errorData.non_field_errors.some(msg => 
                 typeof msg === 'string' && msg.toLowerCase().includes('email') && msg.toLowerCase().includes('verif')
               )) ||
              // String contains verification keywords
              (typeof errorData === 'string' && 
               errorData.toLowerCase().includes('email') && 
               errorData.toLowerCase().includes('verif')) ||
              // Check various parts of the response for verification keywords
              Object.values(errorData || {}).some(
                val => typeof val === 'string' && 
                val.toLowerCase().includes('email') && 
                val.toLowerCase().includes('verif')
              );
            
            if (isEmailNotVerified) {
              throw new Error("email_not_verified");
            }
          }
          
          // Server responded with other status code outside of 2xx range
          const errorMessage = error.response.data?.detail || 
                              error.response.data?.message || 
                              (typeof error.response.data === 'string' ? error.response.data : 'An error occurred');
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
      if (error.message === "email_not_verified") {
        toast.info("Please verify your email to continue");
        
        // Store the email in session storage for the verify page
        try {
          if (typeof window !== "undefined") {
            sessionStorage.setItem("pending_verification_email", loginMutation.variables?.email || "");
          }
        } catch (e) {
          console.error("Session storage error:", e);
        }
        
        router.push("/verify");
        return;
      }
      
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
