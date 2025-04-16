"use client";

import React from "react";
import Image from "next/image";
import SecNav from "../search/SecNav";

const SecHero = () => {
  return (
    <section className="mx-auto">
      <div 
        className="relative h-[200px] overflow-hidden "
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/headers/secnavbg.png"
            alt="Secondary Navigation Background"
            fill
            priority
            quality={100}
            className="object-cover"
            sizes="100vw"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/90 via-orange-200/90 to-pink-200/90"></div> */}
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex items-center mx-auto mt-10 mb-10">
          <SecNav />
        </div>
      </div>
    </section>
  );
};

export default SecHero;
