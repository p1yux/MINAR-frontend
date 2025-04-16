import React from "react";
import SecHero from "@/components/custom/landing/SecHero";

export const metadata = {
  title: "Search Results | Minar",
  description: "Search results for your query",
};

export default function SearchResultsPage() {
  return (
    <main>
      <SecHero />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-xl font-bold mb-4">Search Results</h1>
        <p>Your search results will appear here.</p>
        </div>
    </main>
  );
}