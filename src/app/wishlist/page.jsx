import React from "react";
import WishlistGrid from "@/components/custom/wishlist/WishlistGrid";
import SecHero from "@/components/custom/landing/SecHero";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import News from "@/components/custom/landing/News";

export const metadata = {
  title: "My Wishlist | Minar",
  description: "View and manage your saved items on Minar",
};

export default function WishlistPage() {
  return (
    <main className="bg-[#faf8f5]">
        <SecHero />
        <WishlistGrid />
        <div className="mt-[75px]">
            <ExploreBazaar />
            <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
            <News />
        </div>
    </main>
  );
}
