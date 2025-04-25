import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { z } from "zod";

// Custom date validator to ensure YYYY-MM-DD format
const dateValidator = (val) => {
  if (!val) return true; // Allow empty values
  // Check if date is in YYYY-MM-DD format
  return /^\d{4}-\d{2}-\d{2}$/.test(val);
};

// Validation schema for profile update
const profileUpdateSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone_number: z.string().nullable().optional(),
  date_of_birth: z.string()
    .nullable()
    .optional()
    .refine(dateValidator, {
      message: "Date must be in YYYY-MM-DD format",
    }),
  is_newsletter_interested: z.boolean(),
});

export const useUpdateProfile = (userId) => {
  const queryClient = useQueryClient();
  
  if (!userId) {
    throw new Error("User ID is required for profile update");
  }
  
  const updateProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      try {
        // Ensure date format is YYYY-MM-DD if it exists
        const formattedData = { ...profileData };
        
        if (formattedData.date_of_birth) {
          // If date is already in correct format, use it as is
          // Otherwise, try to format it properly
          if (!dateValidator(formattedData.date_of_birth)) {
            try {
              // Parse the date and format it as YYYY-MM-DD
              const date = new Date(formattedData.date_of_birth);
              if (!isNaN(date.getTime())) {
                formattedData.date_of_birth = date.toISOString().split('T')[0];
              } else {
                throw new Error("Invalid date format");
              }
            } catch (e) {
              toast.error("Invalid date format. Please use YYYY-MM-DD format.");
              throw new Error("Invalid date format");
            }
          }
        }
        
        // Validate profile data with Zod
        profileUpdateSchema.parse(formattedData);
        
        // Send request to API
        const response = await axiosInstance.patch(
          `/api/auth/users/${userId}/`,
          formattedData,
          {
            headers: {
              "Content-Type": "application/json",
              "X-CSRFToken": Cookies.get("csrftoken"),
            },
          }
        );
        
        return response.data;
      } catch (error) {
        // Handle Zod validation errors
        if (error.name === "ZodError") {
          const validationErrors = {};
          error.errors.forEach((err) => {
            validationErrors[err.path[0]] = err.message;
            toast.error(err.message);
          });
          throw new Error("Validation failed", { cause: { validationErrors } });
        }
        
        // Handle API errors
        console.error("Profile update error:", error.response || error);
        
        if (error.response) {
          const errorData = error.response.data;
          
          // Handle specific date format error from the API
          if (errorData && errorData.date_of_birth && Array.isArray(errorData.date_of_birth)) {
            const dateError = errorData.date_of_birth[0];
            toast.error(`Date of Birth: ${dateError}`);
            throw new Error(`Date of Birth: ${dateError}`);
          }
          
          const errorMessage = errorData?.detail || errorData?.message || "Failed to update profile";
          toast.error(errorMessage);
          throw new Error(errorMessage);
        }
        
        toast.error("An unexpected error occurred");
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      
      // Update the profile data in the cache
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
  
  return {
    updateProfile: updateProfileMutation.mutate,
    updateProfileAsync: updateProfileMutation.mutateAsync,
    isLoading: updateProfileMutation.isPending,
    isError: updateProfileMutation.isError,
    error: updateProfileMutation.error,
  };
};
