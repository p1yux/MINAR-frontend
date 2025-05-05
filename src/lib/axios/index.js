import axios from "axios";
import Cookies from "js-cookie";

const environment = process.env.NEXT_PUBLIC_ENV || "development";
const baseURL = environment === "production" 
  ? process.env.NEXT_PUBLIC_FRONTEND_URL
  : process.env.NEXT_PUBLIC_FRONTEND_URL;

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "X-CSRFToken": Cookies.get("csrftoken"),
    "Referer": process.env.NEXT_PUBLIC_REFERER,
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add CSRF token if available
    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    
    // Ensure referer is set on every request
    config.headers["Referer"] = process.env.NEXT_PUBLIC_REFERER;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error);
    // Handle response errors (e.g., refresh token, logout on 401, etc.)
    return Promise.reject(error);
  }
);

export default axiosInstance; 