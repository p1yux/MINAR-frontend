import React from "react";
import SecHero from "@/components/custom/landing/SecHero";
import SearchResults from "@/components/custom/search/SearchResults";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import News from "@/components/custom/landing/News";

export const metadata = {
  title: "Search | Minar",
  description: "Search for products and catalogs across multiple platforms",
};

export default async function SearchPage({ searchParams }) {
  const query = searchParams?.q || "";
  
  return (
    <main className="bg-[#faf8f5]">
        <SecHero />
        <SearchResults initialQuery={query} />
        <div className="mt-[100px]">
            <ExploreBazaar />
            <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
            <News />
        </div>
    </main>
  );
} 