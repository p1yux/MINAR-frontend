import React from "react";
import SecHero from "@/components/custom/landing/SecHero";
import SearchResults from "@/components/custom/search/SearchResults";
import ExploreBazaar from "@/components/custom/explorebazaar/ExploreBazaar";
import News from "@/components/custom/landing/News";


export const metadata = {
  title: "Search Results | Minar",
  description: "Search results for your query",
};

export default function SearchResultsPage() {
  return (
    <main>
        <SecHero />
        <SearchResults />
        <div className="mt-[75px]">
            <ExploreBazaar />
            <hr className="border-gray-900 mx-auto w-1/2 mt-20" />
            <News />
        </div>
    </main>
  );
}