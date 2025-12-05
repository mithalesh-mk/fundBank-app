"use client";

import FilterBar from "@/components/FilterBar";
import fundService, { MutualFundScheme } from "@/services/fundService";
import React, { useState, useRef, useEffect } from "react";

export default function MutualFunds() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [funds, setFunds] = useState<MutualFundScheme[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Fetch 50 funds at a time
 const fetchFunds = async () => {
  if (loading || !hasMore) return;

  setLoading(true);

  try {
    // This returns MutualFundScheme[]
    const newFunds = await fundService.getAllFunds(page, 30);

    // If server returns empty array → stop loading
    if (newFunds.length === 0) {
      setHasMore(false);
      setLoading(false);
      return;
    }

    setFunds(prev => [...prev, ...newFunds]);

    // If less than limit → last page
    if (newFunds.length < 30) {
      setHasMore(false);
    } else {
      setPage(prev => prev + 1);
    }

  } catch (err) {
    console.error("Fetch error:", err);
    setHasMore(false);
  }

  setLoading(false);
};

  // Load first page
  useEffect(() => {
    fetchFunds();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchFunds();
        }
      },
      { threshold: 0.2 }
    );

    const target = observerTarget.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loading]);

  console.log(process.env.NEXT_PUBLIC_APP_API_BASE_URL);

  return (
    <div className="min-h-screen px-4 md:px-16 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Mutual Funds
      </h1>

      <div className="mb-6">
        <FilterBar onFilterChange={(filters) => setSelectedFilters(filters)} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden w-full">

        <div className="md:block max-h-[600px] overflow-y-auto overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 z-20 shadow-sm">
              <tr className="text-gray-700 dark:text-gray-300 text-sm">
                <th className="px-6 py-3 text-left font-semibold w-[260px]">Fund</th>
                <th className="px-6 py-3 text-left font-semibold w-[200px]">Category</th>
                <th className="px-3 py-3 text-center font-semibold w-20">1Y</th>
                <th className="px-3 py-3 text-center font-semibold w-20">3Y</th>
                <th className="px-3 py-3 text-center font-semibold w-20">5Y</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px]">NAV</th>
                <th className="px-3 py-3 text-center font-semibold w-[120px]">Frequency</th>
              </tr>
            </thead>

            <tbody className="text-gray-900 dark:text-gray-200 text-[16px]">
              {funds.map((fund, i) => (
                <tr
                  key={`${fund.scheme_code}-${i}`}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                >
                  <td className="px-6 py-3 flex items-center gap-3">
                    <img
                      src={fund.amc_img || "https://logo.clearbit.com/sbi.co.in"}
                      onError={(e) => (e.currentTarget.src = "/mf.png")}
                      className="w-8 h-8 rounded"
                    />
                    <a
                      href={`/mutual-funds/${fund.scheme_code}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      {fund.display_name}
                    </a>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">{fund.sub_category || "—"}</td>

                  <td className="px-3 py-3 text-center text-green-600 dark:text-green-400">
                    {fund.y1_return?.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-center text-green-600 dark:text-green-400">
                    {fund.y3_return?.toFixed(2)}%
                  </td>
                  <td className="px-3 py-3 text-center text-green-600 dark:text-green-400">
                    {fund.y5_return?.toFixed(2)}%
                  </td>

                  <td className="px-3 py-3 text-center">₹{fund.nav}</td>
                  <td className="px-3 py-3 text-center">{fund.frequency}</td>
                </tr>
              ))}

              {/* Loading */}
              {loading && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600 dark:text-gray-400">Loading more...</span>
                    </div>
                  </td>
                </tr>
              )}

              {/* End */}
              {!hasMore && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center text-gray-500 dark:text-gray-400">
                    No more funds to load
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div ref={observerTarget} className="h-6" />
        </div>

      </div>
    </div>
  );
}
