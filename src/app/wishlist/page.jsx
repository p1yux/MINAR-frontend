import React from "react";
import WishlistGrid from "@/components/custom/wishlist/WishlistGrid";
import SecHero from "@/components/custom/landing/SecHero";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import News from "@/components/custom/landing/News";
import { Suspense } from "react";

export const metadata = {
  title: "My Wishlist | Minar",
  description: "View and manage your saved items on Minar",
};

const SecHeroLoading = () => (
  <div className="relative h-[200px] bg-[#faf8f5] animate-pulse"></div>
);

export default function WishlistPage() {
  return (
    <main className="bg-[#faf8f5]">
        <Suspense fallback={<SecHeroLoading />}>
            <SecHero />
        </Suspense>
        <WishlistGrid />
        <div className="mt-[75px]">
            <ExploreBazaar />
            <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
            <News />
        </div>
    </main>
  );
}
