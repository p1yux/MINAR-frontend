import React from "react";
import SecHero from "@/components/custom/landing/SecHero";
import SearchResults from "@/components/custom/search/SearchResults";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import News from "@/components/custom/landing/News";
import { Suspense } from "react";

export const metadata = {
  title: "Search | Minar",
  description: "Search for products and catalogs across multiple platforms",
};

const SecHeroLoading = () => (
  <div className="relative h-[200px] bg-[#faf8f5] animate-pulse"></div>
);

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";
  
  return (
    <main className="bg-[#faf8f5]">
        <Suspense fallback={<SecHeroLoading />}>
            <SecHero />
        </Suspense>
        <SearchResults initialQuery={query} />
        <div className="mt-[100px]">
            <ExploreBazaar />
            <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
            <News />
        </div>
    </main>
  );
} 