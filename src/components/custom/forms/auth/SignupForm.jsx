"use client";

import React, { useState } from "react";
import Link from "next/link";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("Form submitted:", formData);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-2xl font-semibold mb-5 text-gray-900">Create your Minar Account</h1>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
          required
          aria-label="First Name"
        />
        
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
          required
          aria-label="Last Name"
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="E-mail ID"
          className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
          required
          aria-label="Email"
        />
        
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          placeholder="Mobile Number"
          className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
          required
          aria-label="Mobile Number"
        />
        
        <div className="relative">
          <input
            type="text"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => e.target.type = "text"}
            placeholder="Date of Birth"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            required
            aria-label="Date of Birth"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm"
          disabled={isSubmitting}
          aria-label="Get OTP"
        >
          {isSubmitting ? "Sending..." : "Get OTP"}
        </button>
      </form>
      
      <div className="my-5 flex items-center">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-xs text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-gray-900 text-white text-sm"
        type="button"
        aria-label="Sign in with Google"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z"
            fill="white"
          />
          <path
            d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.14 18.63 6.71 16.7 5.84 14.1H2.18V16.94C3.99 20.53 7.7 23 12 23Z"
            fill="white"
          />
          <path
            d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z"
            fill="white"
          />
          <path
            d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.84 9.91C6.71 7.3 9.14 5.38 12 5.38Z"
            fill="white"
          />
        </svg>
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default SignupForm;
