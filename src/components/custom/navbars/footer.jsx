"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  
  // Skip rendering this footer in auth pages
  const isAuthPage = pathname.includes("/(auth)");
  
  if (isAuthPage) return null;

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 - Logo and Newsletter */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-white mr-2"></div>
              <span className="text-xl font-bold">MINAR</span>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Join our newsletter!</h2>
            <p className="text-sm text-gray-300 mb-4">
              You're an important part of the Minar journey to create a 
              new internet experience. Sign up to stay in the loop with 
              Minar's latest updates, shopping tips, and behind-the-scenes magic.
            </p>
            
            <Link href="/newsletter" aria-label="Join our newsletter">
              <div className="inline-block mt-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="32" 
                  height="32" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </Link>
          </div>
          
          {/* Column 2 - Get to know us */}
          <div>
            <h2 className="text-xl font-bold mb-6">Get to know us</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/about-minar" className="hover:underline">
                  About MINAR
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:underline">
                  News
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:underline">
                  About our story
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Connect with us */}
          <div>
            <h2 className="text-xl font-bold mb-6">Connect with us</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a href="mailto:support@theminarnet.com" className="hover:underline">
                  support@theminarnet.com
                </a>
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <a href="tel:+912038392991" className="hover:underline">
                  +91 2038392991
                </a>
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
                <a href="https://twitter.com/minar" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Twitter
                </a>
              </li>
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <a href="https://instagram.com/minar" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Let us help you */}
          <div>
            <h2 className="text-xl font-bold mb-6">Let us help you</h2>
            <ul className="space-y-4">
              <li>
                <Link href="/account" className="hover:underline">
                  Your Account
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:underline">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Back to top */}
      <div className="border-t border-gray-800 py-4 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-gray-400 hover:text-white"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
