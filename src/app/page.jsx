import React from "react";
import HeroSection from "@/components/custom/landing/HeroSection";
import HowToUse from "@/components/custom/landing/HowToUse";
import WhatWeDo from "@/components/custom/landing/WhatWeDo";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <HowToUse />
      <WhatWeDo />
    </div>
  );
}
