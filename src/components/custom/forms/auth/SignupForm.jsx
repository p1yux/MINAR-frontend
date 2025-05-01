"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    is_newsletter_interested: false,
    password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    // Phone validation
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    // Confirm password validation
    if (!formData.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await axiosInstance.post("/api/auth/register/", {
        ...formData
      });
      
      // Save email to session storage for verification page
      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem("pending_verification_email", formData.email);
        }
      } catch (e) {
        console.error("Session storage error:", e);
      }
      
      toast.success("Account created successfully! Please verify your email.");
      router.push("/verify");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      
      // Handle validation errors from the API
      if (error.response?.data) {
        const apiErrors = {};
        Object.entries(error.response.data).forEach(([key, value]) => {
          apiErrors[key] = Array.isArray(value) ? value[0] : value;
        });
        setErrors(apiErrors);
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-2xl font-semibold mb-5 text-gray-900">Create your Minar Account</h1>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            aria-label="First Name"
          />
          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>}
        </div>
        
        <div>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            aria-label="Last Name"
          />
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>}
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="E-mail ID"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            aria-label="Email"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            aria-label="Mobile Number"
          />
          {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number}</p>}
        </div>
        
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            aria-label="Password"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>
        
        <div>
          <input
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            aria-label="Confirm Password"
          />
          {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>}
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            name="is_newsletter_interested"
            checked={formData.is_newsletter_interested}
            onChange={handleChange}
            id="newsletter"
            className="h-4 w-4 text-gray-900 focus:ring-gray-800 border-gray-300 rounded"
          />
          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-700">
            Subscribe to our newsletter
          </label>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm"
          disabled={isSubmitting}
          aria-label="Sign Up"
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
        
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
