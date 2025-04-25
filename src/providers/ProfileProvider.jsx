"use client";

import { createContext, useContext } from "react";
import { useFetchProfile } from "@/hooks/profile/useFetchProfile";
import { ErrorBoundary } from "react-error-boundary";
import { usePathname } from "next/navigation";

// Define public routes
const publicRoutes = ['/login', '/signup', '/forgot-password'];

// Create the context
const ProfileContext = createContext(null);

// Fallback component for error cases
const ProfileErrorFallback = () => {
  // Return null as we don't want to show any error UI
  return null;
};

export const ProfileProvider = ({ children }) => {
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
  const profileQuery = useFetchProfile();

  return (
    <ErrorBoundary FallbackComponent={ProfileErrorFallback}>
      <ProfileContext.Provider value={profileQuery}>
        {children}
      </ProfileContext.Provider>
    </ErrorBoundary>
  );
};

// Custom hook to easily access profile data
export const useProfile = () => {
  const context = useContext(ProfileContext);
  const pathname = usePathname();
  const isPublicRoute = publicRoutes.some(route => pathname?.startsWith(route));
  
  if (!context && !isPublicRoute) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  
  return context || { data: null, isLoading: false, isError: false, error: null };
}; 