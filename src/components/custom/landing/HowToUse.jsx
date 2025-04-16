"use client";

import React from "react";

const HowToUse = () => {
  const steps = [
    {
      id: 1,
      title: "Tell Minar what you're looking for",
      description: "– any product, any detail, and any special requirements."
    },
    {
      id: 2,
      title: "Minar instantly searches the internet",
      description: "to find all your perfect matches across multiple sites."
    },
    {
      id: 3,
      title: "View it all on Minar",
      description: "– switch between products and sites in just a click."
    },
    {
      id: 4,
      title: "Use the Minar Assistant to refine results,",
      description: "explore alternatives and ask product-related questions."
    },
    {
      id: 5,
      title: "Wishlist favorites, compare options, buy from anywhere",
      description: "– all through Minar."
    },
    {
      id: 6,
      title: "Track any product detail and get live updates about deals and price changes!"
    }
  ];

  return (
    <section id="use" className="py-16 bg-[#faf8f5] mt-[-50px]">
      <div className="container mx-auto px-6 mb-12">

        <div className="max-w-3xl mx-auto mb-20 border border-gray-200 rounded-md overflow-hidden">
          <div className="relative pt-[56.25%] bg-white"> {/* 16:9 aspect ratio */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-gray-900">MINAR</span>
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-gray-900"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>


        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How to Use Minar</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div key={step.id} className="text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-900 to-red-700 text-white rounded-xl flex items-center justify-center mx-auto mb-4 gap-1">
                <span className="font-semibold">{step.id}</span>
              </div>
              <h3 className=" text-gray-900 mb-2">{step.title}</h3>
              {step.description && (
                <p className="text-gray-700 text-sm">{step.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-900 mx-auto w-1/2 mt-25" />
    </section>
    
  );
};

export default HowToUse;
