"use client";

import React from "react";
import Image from "next/image";

const NewsCard = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
      <div className="flex p-4 gap-4 items-center">
        <div className="w-28 h-20 relative rounded-md overflow-hidden flex-shrink-0">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 line-clamp-2">{title}</p>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
};

const News = () => {
  const newsItems = [
    {
      image: "/images/news1.jpg",
      title: "Featured by YourStory - Minar raises 20000 million USD pre-seed round",
      description: "",
    },
    {
      image: "/images/news2.jpg",
      title: "There's a new e-commerce revolution brewing",
      description: "",
    },
    {
      image: "/images/news3.jpg",
      title: "Minar- the coolest new way to experience the internet, and people are going cray cray",
      description: "",
    },
  ];

  return (
    <section className="py-16 bg-[#faf8f5] mt-[-50px]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">News: What's Buzzing at Minar?</h2>
        </div>
        
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-gray-800">
            From AI breakthroughs to new features, stay in the loop with Minar's latest updates, 
            <br />
            shopping tips, and behind-the-scenes magic.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {newsItems.map((item, index) => (
            <NewsCard
              key={index}
              image={item.image}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
