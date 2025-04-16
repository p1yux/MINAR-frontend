import React from "react";
import TrackedProducts from "@/components/custom/track/TrackedProducts";
import SecHero from "@/components/custom/landing/SecHero";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import News from "@/components/custom/landing/News";

export const metadata = {
  title: "Tracked Products | Minar",
  description: "Monitor price changes and availability of your tracked products",
};

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5]">
      <SecHero />
      <TrackedProducts />
      <div className="mt-[75px]">
        <ExploreBazaar />
        <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
        <News />
      </div>
    </main>
  );
}
