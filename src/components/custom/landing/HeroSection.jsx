"use client";

import React from "react";
import Image from "next/image";
import SearchBar from "@/components/custom/search/SearchBar";

const HeroSection = () => {
  return (
    <section className="relative min-h-[550px] flex items-center justify-center overflow-hidden pt-24 pb-20">
      
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/headers/StartPage.png"
          alt="Minar Hero Background"
          fill
          priority
          quality={100}
          className="object-cover mt-[-40px]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/10 via-yellow-100/5 to-pink-200/10"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          A new internet experience for{" "}
          <span className="text-blue-600">discovering</span>
        </h1>
        <p className="text-lg text-gray-800 mb-10 max-w-2xl mx-auto">
          Your search ends here. Discover, compare, and shop—all on Minar
        </p>

        <SearchBar />
      </div>
    </section>
  );
};

export default HeroSection;
