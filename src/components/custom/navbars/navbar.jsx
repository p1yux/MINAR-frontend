"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname.includes("/(auth)");
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  if (isAuthPage) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-gradient-to-r from-pink-300 via-yellow-300 to-orange-300 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          {/* Left section - Logo and main nav */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-900 font-bold text-lg">
              MINAR
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link href="/bazaar" className="text-gray-900 hover:text-gray-700 text-sm">
                Bazaar
              </Link>
              <Link href="/learn" className="text-gray-900 hover:text-gray-700 text-sm">
                Learn how to use Minar
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-gray-700 text-sm">
                What we do
              </Link>
              <Link href="/story" className="text-gray-900 hover:text-gray-700 text-sm">
                Our Story
              </Link>
              <Link href="/news" className="text-gray-900 hover:text-gray-700 text-sm">
                News
              </Link>
              <Link href="/contact" className="text-gray-900 hover:text-gray-700 text-sm">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center space-x-3">
            <Link
              href="/tracking"
              className="px-4 py-1.5 rounded-full border border-gray-700 text-xs text-gray-900 hover:bg-gray-100"
            >
              Product Tracking
            </Link>
            <Link
              href="/wishlist"
              className="px-4 py-1.5 rounded-full border border-gray-700 text-xs text-gray-900 hover:bg-gray-100 flex items-center"
            >
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </span>
              Wishlist
            </Link>
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-sm border border-gray-900 bg-gray-900 hover:bg-white hover:text-gray-900 transition-colors text-white text-xs flex items-center"
            >
              <span className="mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
              </span>
              SIGN IN TO VIEW
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
