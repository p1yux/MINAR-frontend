import React from "react";
import HeroSection from "@/components/custom/landing/HeroSection";
import HowToUse from "@/components/custom/landing/HowToUse";
import WhatWeDo from "@/components/custom/landing/WhatWeDo";
import OurStory from "@/components/custom/landing/OurStory";
import News from "@/components/custom/landing/News";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ExploreBazaar />
      <HowToUse />
      <WhatWeDo />
      <OurStory />
      <News />
    </div>
  );
}
