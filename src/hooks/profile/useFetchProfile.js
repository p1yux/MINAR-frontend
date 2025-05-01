import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

// Define public routes where profile fetching errors should be silent
const publicRoutes = ['/login', '/signup', '/verify'];

export const useFetchProfile = () => {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
  
  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get("/api/auth/users/me");
      return response.data;
    } catch (error) {
      // Don't show error toast if it's an authentication error (401)
      // or if the user is on a public route
      if ((error.response && error.response.status === 401) || isPublicRoute) {
        // Silent failure on public routes or auth errors
        return null;
      }
      
      // Only log errors to console if not on public routes
      if (!isPublicRoute) {
        console.error("Error fetching profile:", error.response || error);
        toast.error("Failed to load profile data");
      }
      
      throw error;
    }
  };

  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: isPublicRoute ? 0 : 1, // Don't retry on public routes
    refetchOnWindowFocus: !isPublicRoute, // Don't refetch on public routes
    // Don't throw errors for 401 responses or on public routes
    useErrorBoundary: (error) => {
      return error.response?.status !== 401 && !isPublicRoute;
    },
    // Disable the query on public routes to prevent unnecessary fetching
    enabled: !isPublicRoute,
  });
};
