"use client";

import React, { useState, useRef, useEffect } from "react";

const ForgotPasswordForm = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // Ensure only numbers are entered
    if (value === "" || /^[0-9]+$/.test(value)) {
      setOtp(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("OTP verified:", otp);
    }, 1000);
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-xl mb-5 text-gray-900">Enter the OTP you received on your mobile number</h1>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          ref={inputRef}
          type="text"
          value={otp}
          onChange={handleOtpChange}
          placeholder="OTP"
          className="w-full border border-gray-700 rounded-md p-2.5 bg-white text-gray-900 text-sm"
          maxLength={6}
          required
          aria-label="One-time password"
        />
        
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm"
          disabled={isSubmitting || otp.length < 4}
          aria-label="Verify OTP"
        >
          {isSubmitting ? "Verifying..." : "Sign in to Minar"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
