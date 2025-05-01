"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLoginUser } from "@/hooks/auth/useLoginUser";

const LoginForm = () => {
  const [loginMethod, setLoginMethod] = useState("email"); // "email" or "mobile"
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isLoading, validationErrors, apiErrors } = useLoginUser();

  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (loginMethod === "email") {
      login({ email, password });
    } else {
      // Mobile login logic remains the same for now
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      console.log("OTP sent to", mobileNumber);
    }, 1000);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
  };

  return (
    <div className="w-full max-w-xs">
      <h1 className="text-xl font-semibold text-gray-900 mb-1">Sign in</h1>
      <p className="text-gray-600 text-sm mb-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-gray-900 hover:underline">
          Create one
        </Link>
      </p>

      {/* <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md mb-5 bg-gray-900 text-white text-sm"
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
      </button> */}

      {/* <div className="flex items-center mb-5">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="px-3 text-xs text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
      </div> */}

      <div className="mb-4 flex justify-between">
        <button
          type="button"
          onClick={() => setLoginMethod("email")}
          className={`text-sm px-3 py-1 rounded ${
            loginMethod === "email" 
              ? "bg-gray-900 text-white" 
              : "bg-gray-100 text-gray-600"
          }`}
          aria-label="Use email login"
        >
          Email
        </button>
        {/* <button
          type="button"
          onClick={() => setLoginMethod("mobile")}
          className={`text-sm px-3 py-1 rounded ${
            loginMethod === "mobile" 
              ? "bg-gray-900 text-white" 
              : "bg-gray-100 text-gray-600"
          }`}
          aria-label="Use mobile login"
        >
          Mobile
        </button> */}
      </div>
      
      {apiErrors && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
          {apiErrors}
        </div>
      )}
      
      {loginMethod === "email" ? (
        <>
          <p className="text-gray-600 mb-2 text-xs">Enter your email and password to login</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
              className="w-full border border-gray-700 rounded-md p-2.5 mb-3 bg-white text-gray-900 text-sm"
              required
              aria-label="Email address"
            />
            {validationErrors?.email && (
              <p className="text-red-500 text-xs mb-2">{validationErrors.email}</p>
            )}
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              className="w-full border border-gray-700 rounded-md p-2.5 mb-3 bg-white text-gray-900 text-sm"
              required
              aria-label="Password"
            />
            {validationErrors?.password && (
              <p className="text-red-500 text-xs mb-2">{validationErrors.password}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm"
              disabled={isLoading}
              aria-label="Login"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-2 text-xs">Enter your mobile number below to login</p>
      <form onSubmit={handleSubmit}>
        <input
          type="tel"
          value={mobileNumber}
          onChange={handleMobileNumberChange}
          placeholder="mobile number"
          className="w-full border border-gray-700 rounded-md p-2.5 mb-3 bg-white text-gray-900 text-sm"
          required
          aria-label="Mobile number"
        />
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm"
          disabled={isSubmitting}
          aria-label="Get OTP"
        >
          {isSubmitting ? "Sending..." : "Get OTP"}
        </button>
      </form>
        </>
      )}
    </div>
  );
};

export default LoginForm;
