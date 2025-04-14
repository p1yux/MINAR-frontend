"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full relative">
      {/* Background SVG for entire page */}
      <div className="absolute inset-0 -z-10">
        <Image 
          src="/assets/background/authbg01.png" 
          alt="Background" 
          fill 
          className="object-cover"
          priority
          quality={100}
        />
      </div>
      
      {/* Left side - Auth form */}
      <div className="w-full md:w-1/2 p-6 md:p-10 lg:p-16 flex flex-col justify-center">
        <div className="mb-8 ml-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-semibold"></span>
            </div>
            <span className="font-medium text-2xl text-gray-900">MiNAR</span>
          </Link>
        </div>
        <div className="ml-6">
          {children}
        </div>
      </div>

      {/* Right side - Brand visual */}
      <div className="hidden md:flex w-1/2 relative">
        {/* Content */}
        <div className="relative w-full h-full flex flex-col items-center justify-center p-10">
          <div className="w-full max-w-md aspect-video bg-white rounded-lg shadow-sm flex items-center justify-center">
            <div className="text-4xl font-bold flex items-center text-gray-900">
              MINAR <span className="ml-2">▶</span>
            </div>
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900">The one stop shopping experience</h2>
            <p className="mt-1 text-gray-600">Login to discover, compare and shop better.</p>
          </div>
          <div className="absolute bottom-4 text-sm text-center opacity-70 text-gray-900">
            Made with love in India.
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
