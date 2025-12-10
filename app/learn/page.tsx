"use client";

import { useState } from "react";
import CategoryCard from "@/components/CategoryCard";
import SubCategoryList from "@/components/SubCategoryList";
import { categories, Category } from "./data/categories";

export default function LearnPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const handleToggle = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="min-h-screen py-10 px-5 sm:px-10 bg-white dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Learn Page
      </h1>

      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Welcome to the Learn section of the FundBank app!
      </p>

      {/* Categories Grid */}
      <div className="flex flex-col gap-4">
        {categories.map((cat: Category) => (
          <div key={cat.name} className="w-full">
            <CategoryCard
              title={cat.name}
              isOpen={openCategory === cat.name}
              onClick={() => handleToggle(cat.name)}
            />

            <SubCategoryList
              isOpen={openCategory === cat.name}
              subcategories={cat.subcategories}
              categoryName={cat.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
