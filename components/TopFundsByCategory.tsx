"use client";

import fundService, { FundDetails } from '@/services/fundService';
import React, { useEffect } from 'react';

const TopFundsByCategory = () => {
  const categories = [
    "Equity Scheme",
    "Debt Scheme",
    "Hybrid Scheme",
    "Income",
    "Solution Oriented Scheme",
    "ELSS",
    "Money Market",
    "Other Scheme",
  ];

  const [topFunds, setTopFunds] = React.useState<FundDetails[]>([]);
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const getTopFunds = async (category: string) => {
    try {
      setActiveCategory(category);
      setLoading(true);

      const resp = await fundService.getTopFunds(category);
      if (resp.ok) {
        setTopFunds(resp.data);
      } else {
        console.error(resp.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    getTopFunds(categories[0])
  },[]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
          Top Funds by Category
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Best performing funds from different fund houses
        </p>
      </div>

      {/* Categories */}
      <div
        className="
            mb-10
            flex gap-3
            overflow-x-auto
            whitespace-nowrap
            px-2
            scrollbar-hide
            sm:flex-wrap sm:justify-center sm:overflow-visible
        "
        >
        {categories.map((category) => (
            <button
            style={{scrollbarWidth: 'none'}}
            key={category}
            onClick={() => getTopFunds(category)}
            disabled={loading}
            className={`
                flex-shrink-0
                px-4 py-2 rounded-full text-sm font-medium transition-all
                border
                ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                ${
                activeCategory === category
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-500"
                }
            `}
            >
            {category}
            </button>
        ))}
        </div>


      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse"
            />
          ))}

        {!loading &&
          topFunds.map((fund) => (
            <div
              key={fund.display_name}
              className="rounded-xl border border-gray-200 dark:border-gray-800 p-5
                         bg-white dark:bg-gray-900 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={fund.amc_img}
                  alt={fund.fund_house}
                  className="w-12 h-12 object-contain rounded-md"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white leading-tight">
                    {fund.display_name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {fund.fund_house}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  3Y Returns
                </span>
                <span className="text-lg font-semibold text-green-600">
                  {fund.cagr_3y.toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Empty state */}
      {!loading && activeCategory && topFunds.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No funds found for this category.
        </p>
      )}
    </section>
  );
};

export default TopFundsByCategory;
