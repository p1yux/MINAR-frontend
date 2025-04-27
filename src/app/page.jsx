import React from "react";
import HeroSection from "@/components/custom/landing/HeroSection";
import HowToUse from "@/components/custom/landing/HowToUse";
import WhatWeDo from "@/components/custom/landing/WhatWeDo";
import OurStory from "@/components/custom/landing/OurStory";
import News from "@/components/custom/landing/News";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import { Suspense } from "react";

const HeroSectionLoading = () => (
  <div className="relative h-[200px] bg-[#faf8f5] animate-pulse"></div>
);

export default function Home() {
  return (
    <div>
      <Suspense fallback={<HeroSectionLoading />}>
        <HeroSection />
      </Suspense>
      <ExploreBazaar />
      <HowToUse />
      <WhatWeDo />
      <OurStory />
      <News />
    </div>
  );
}
