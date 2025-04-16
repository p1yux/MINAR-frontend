"use client";

import React from "react";

const WhatWeDo = () => {
  const features = [
    {
      id: 1,
      title: "Shop Smarter, Not Harder",
      description: "Skip the endless browsing. Minar scans the entire internet — from big marketplaces to hidden gems — to find exactly what you want.",
      bgColor: "bg-gradient-to-br from-amber-100 to-amber-50",
    },
    {
      id: 2,
      title: "Your very own assistant experience",
      description: "Want alternatives, better deals, or something similar? Or just have questions about what you're buying? Just use your very own personal assistant.",
      bgColor: "bg-gradient-to-br from-blue-100 to-blue-50",
    },
    {
      id: 3,
      title: "Track It Till It's Yours",
      description: "Minar's personal assistant keeps you updated with live tracking on prices, discounts, availability, details and more — so you can compare and buy like a pro.",
      bgColor: "bg-gradient-to-br from-red-100 to-red-50",
    },
    {
      id: 4,
      title: "Make shopping simpler",
      description: "There once existed the idea of an all-app. Anything more than a whisper, and it would vanish. Not anymore. Browse, compare, track, ask, and buy, all through the Minar experience.",
      bgColor: "bg-gradient-to-br from-green-100 to-green-50",
    },
  ];

  return (
    <section id="about" className="py-16 bg-[#faf8f5] mt-[-50px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-1 text-gray-900">What We Do:</h2>
          <h3 className="text-3xl font-bold text-gray-900">e-Shopping, Curated for You</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`${feature.bgColor} p-8 rounded-lg`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
    </section>
  );
};

export default WhatWeDo;
