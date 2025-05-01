"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Try to get email from session storage
    try {
      if (typeof window !== "undefined") {
        const storedEmail = sessionStorage.getItem("pending_verification_email");
        if (storedEmail) {
          setEmail(storedEmail);
        }
      }
    } catch (e) {
      console.error("Session storage error:", e);
    }
  }, []);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are entered
    if (value === "" || /^[0-9]+$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      const response = await axiosInstance.post("/api/auth/verify-email/", {
        token: parseInt(otp, 10)  // Convert string to integer
      });
      
      toast.success("Email verified successfully!");
      
      // Clear the pending email from session storage
      try {
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("pending_verification_email");
        }
      } catch (e) {
        console.error("Session storage error:", e);
      }
      
      router.push("/login");
    } catch (error) {
      console.error("Verification error:", error.response?.data || error);
      
      // Handle validation errors from the API
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          setError(error.response.data);
        } else if (error.response.data.token) {
          setError(Array.isArray(error.response.data.token) 
            ? error.response.data.token[0] 
            : error.response.data.token);
        } else if (error.response.data.detail) {
          setError(error.response.data.detail);
        } else {
          setError("Invalid verification code");
        }
      } else {
        setError("Failed to verify. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-xl mb-5 text-gray-900">Enter the OTP you received on your Email</h1>
      
      {email && (
        <p className="text-sm text-gray-700 mb-4">
          Verification code has been sent to <span className="font-medium">{email}</span>
        </p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            ref={inputRef}
            type="text"
            value={otp}
            onChange={handleOtpChange}
            placeholder="OTP"
            className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
            maxLength={6}
            aria-label="One-time password"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm"
          disabled={isSubmitting || otp.length < 4}
          aria-label="Verify OTP"
        >
          {isSubmitting ? "Verifying..." : "Verify Email"}
        </button>
        
        <p className="text-xs text-gray-600 mt-2">
          Please check your email inbox for the verification code we sent you after registration.
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
