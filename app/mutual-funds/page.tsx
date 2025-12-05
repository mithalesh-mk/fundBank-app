'use client';

import FilterBar from '@/components/FilterBar';
import fundService, { MutualFundScheme } from '@/services/fundService';
import React, { useState, useRef, useEffect } from 'react';

export default function MutualFunds() {
  const [appliedFilters, setAppliedFilters] = useState({
    category: [] as string[],
    fundhouse: '',
    tag: '',
  });
  const [pendingFilters, setPendingFilters] = useState({
    category: [] as string[],
    fundhouse: '',
    tag: '',
  });
  const [funds, setFunds] = useState<MutualFundScheme[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [noResults, setNoResults] = useState(false);

  // Fetch 50 funds at a time
  const fetchFunds = async (reset: boolean, filtersOverride?: any) => {
  if (loading) return;

  const usedFilters = filtersOverride ?? appliedFilters;
  const categoryFilter = usedFilters.category;

  if (reset) {
    setPage(1);
    setHasMore(true);
    setFunds([]);
    setNoResults(false);
  }

  const currentPage = reset ? 1 : page;
  setLoading(true);

  try {
    let newFunds = await fundService.getAllFunds(currentPage, 15, categoryFilter);
    console.log("API returned funds:", newFunds); 
    // 🛡️ SAFETY CHECK 1: If API returns null/undefined/non-array
    if (newFunds == null || !Array.isArray(newFunds)) {
      newFunds = [];                 
    }

    // 🛡️ SAFETY CHECK 2: If page=1 and no results
    if (reset && newFunds.length === 0) {
      setFunds([]);
      setNoResults(true);
      setLoading(false);
      setHasMore(false);
      return;
    }

    // 🛡️ SAFETY CHECK 3: Append or replace
    if (reset) {
      setFunds(newFunds);
    } else {
      setFunds(prev => Array.isArray(prev) ? [...prev, ...newFunds] : newFunds);
    }

    console.log("Fetched funds:", newFunds);
    // 🛡️ SAFETY CHECK 4: pagination
    if (newFunds.length < 15) {
      setHasMore(false);
    } else {
      setPage(currentPage + 1);
    }

  } catch (err) {
    console.error("FETCH ERROR:", err);
    setNoResults(true);
    setHasMore(false);
  }

  setLoading(false);
};

  // Load first page
  useEffect(() => {
    fetchFunds(false);
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchFunds(false);
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

  const getReturnColor = (value?: number) => {
    if (value === undefined || value === null) return 'text-gray-400'; // fallback
    return value < 0
      ? 'text-red-600 dark:text-red-400'
      : 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="min-h-screen px-4 md:px-16 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Mutual Funds
      </h1>

      <div className="mb-6">
        <FilterBar
          filters={pendingFilters}
          setFilters={setPendingFilters}
          applyFilters={() => {
            setAppliedFilters(pendingFilters);
            fetchFunds(true, pendingFilters); 
          }}
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-full">
        <div
          className="md:block max-h-[800px] overflow-y-auto overflow-x-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
        >
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 z-20 border-b-2 border-gray-200 dark:border-gray-600">
              <tr className="text-gray-700 dark:text-gray-300 text-md">
                <th className="px-6 py-3 text-left font-semibold w-[260px]">
                  Funds
                </th>
                <th className="px-6 py-3 text-left font-semibold w-[200px]">
                  Category
                </th>
                <th className="px-3 py-3 text-center font-semibold w-20">1Y</th>
                <th className="px-3 py-3 text-center font-semibold w-20">3Y</th>
                <th className="px-3 py-3 text-center font-semibold w-20">5Y</th>
                <th className="px-3 py-3 text-center font-semibold w-[100px]">
                  NAV
                </th>
                <th className="px-3 py-3 text-center font-semibold w-[120px]">
                  Frequency
                </th>
              </tr>
            </thead>
            {noResults && !loading && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-gray-500 dark:text-gray-400 text-lg">
                  No matching funds found.
                </td>
              </tr>
            )}


            <tbody className="text-gray-900 dark:text-gray-200 text-[16px]">
              {funds && Array.isArray(funds) && funds.length > 0 && funds.map((fund, i) => (
                <tr
                  key={`${fund.scheme_code}-${i}`}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/40 transition"
                >
                  <td className="px-6 py-3 flex items-center gap-3">
                    <img
                      src={
                        fund.amc_img || 'https://logo.clearbit.com/sbi.co.in'
                      }
                      onError={(e) => (e.currentTarget.src = '/mf.png')}
                      className="w-8 h-8 rounded"
                    />
                    <a
                      href={`/mutual-funds/${fund.scheme_code}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                    >
                      {fund?.display_name || '—'}
                    </a>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">
                    {fund?.sub_category || '—'}
                  </td>

                  <td
                    className={`px-3 py-3 text-center ${getReturnColor(
                      fund.y1_return
                    )}`}
                  >
                    {fund.y1_return?.toFixed(2)}%
                  </td>

                  <td
                    className={`px-3 py-3 text-center ${getReturnColor(
                      fund.y3_return
                    )}`}
                  >
                    {fund.y3_return?.toFixed(2)}%
                  </td>

                  <td
                    className={`px-3 py-3 text-center ${getReturnColor(
                      fund.y5_return
                    )}`}
                  >
                    {fund.y5_return?.toFixed(2)}%
                  </td>

                  <td className="px-3 py-3 text-center">₹{fund.nav}</td>
                  <td className="px-3 py-3 text-center">{fund.frequency}</td>
                </tr>
              ))}

              {/* Loading */}
              {loading  && (
                <tr>
                  <td colSpan={7} className="px-6 py-6 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-gray-600 dark:text-gray-400">
                        Loading more...
                      </span>
                    </div>
                  </td>
                </tr>
              )}

              {/* End */}
              {!hasMore || (Array.isArray(funds) && funds.length == 0) && !loading && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-6 text-center text-gray-500 dark:text-gray-400"
                  >
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
