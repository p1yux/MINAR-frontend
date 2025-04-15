"use client";

import React from "react";

const OurStory = () => {
  return (
    <section className="py-16 bg-[#faf8f5] mt-[-50px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-1 text-gray-900">Our Story:</h2>
          <h3 className="text-3xl font-bold text-gray-900">From Search to Find</h3>
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-gray-800">
            We got tired of endless clicking, infinite tabs, and the same old internet — so we built Minar to create the simplest one stop shop shopping experience. Your search ends here.
          </p>
        </div>
        
        {/* Video/image placeholder */}
        <div className="max-w-3xl mx-auto border border-gray-200 rounded-md overflow-hidden">
          <div className="relative pt-[56.25%] bg-white"> {/* 16:9 aspect ratio */}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-800">Minar heartfelt story</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
    </section>
  );
};

export default OurStory;
