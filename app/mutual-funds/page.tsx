"use client";
import FilterBar from "@/components/FilterBar";
import fundService, { MutualFundScheme } from "@/services/fundService";
import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Fund {
  oneY: string;
  threeY: string;
  fiveY: string;
}

const returnKeys: (keyof Fund)[] = ["oneY", "threeY", "fiveY"];

export default function MutualFunds() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [funds, setFunds] = useState<MutualFundScheme[]>([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const allFunds = await fundService.getAllFunds();
        setFunds(allFunds);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };
    fetchFunds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 md:px-16 py-10">
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Mutual Funds
      </h1>

      {/* FILTERS */}
      <div className="mb-6">
        <FilterBar onFilterChange={(filters) => setSelectedFilters(filters)} />
      </div>

      {/* MAIN TABLE WRAPPER */}
      <div
        className="
          bg-white dark:bg-gray-800 
          rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 
          overflow-hidden w-full
        "
      >
        {/* SCROLL CONTAINER — DESKTOP */}
        <div className="hidden md:block max-h-[600px] overflow-y-auto overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
          <table className="w-full min-w-[1100px] border-collapse">
            {/* TABLE HEADER */}
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
                  key={i}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition"
                >
                  <td className="px-6 py-3 flex items-center gap-3">
                    <img
                      src={fund.amc_img || "https://logo.clearbit.com/sbi.co.in"}
                      onError={(e) => (e.currentTarget.src = "/mf.png")}
                      className="w-8 h-8 rounded"
                      alt=""
                    />
                    <span className="font-medium text-sm">
                      <a
                        href={`/mutual-funds/${fund.scheme_code}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {fund.scheme_name}
                      </a>
                    </span>
                  </td>

                  <td className="px-6 py-3 whitespace-nowrap">{fund.category || "—"}</td>

                  {returnKeys.map((key) => (
                    <td
                      key={key}
                      className="px-3 py-3 text-center font-medium text-green-600 dark:text-green-400"
                    >
                      23.45%
                    </td>
                  ))}

                  <td className="px-3 py-3 text-center">₹{fund.nav ?? "—"}</td>
                  <td className="px-3 py-3 text-center">{fund.frequency ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* MOBILE — TABLE FORMAT + HORIZONTAL + VERTICAL SCROLL */}
        <div className="max-h-[600px] overflow-x-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
          <table className="min-w-[700px] w-full border-collapse text-[12px]">
            <thead className="sticky top-0 bg-gray-100 dark:bg-gray-700 z-20 shadow-sm">
              <tr className="text-gray-700 dark:text-gray-300">
                <th className="px-3 py-2 text-left font-semibold">Fund</th>
                <th className="px-3 py-2 text-left font-semibold">Category</th>
                <th className="px-3 py-2 text-center font-semibold">1Y</th>
                <th className="px-3 py-2 text-center font-semibold">3Y</th>
                <th className="px-3 py-2 text-center font-semibold">5Y</th>
                <th className="px-3 py-2 text-center font-semibold">NAV</th>
                <th className="px-3 py-2 text-center font-semibold">Freq</th>
              </tr>
            </thead>

            <tbody className="text-gray-900 dark:text-gray-200 text-[12px]">
              {funds.map((fund, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-300 dark:border-gray-700"
                >
                  <td className="px-3 py-2 flex items-center gap-2">
                    <img
                      src={fund.amc_img || "https://logo.clearbit.com/sbi.co.in"}
                      onError={(e) => (e.currentTarget.src = "/mf.png")}
                      className="w-6 h-6 rounded"
                      alt=""
                    />
                    <Link
                      href={`/mutual-funds/${fund.scheme_code}`}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {fund.scheme_name}
                    </Link>
                  </td>

                  <td className="px-3 py-2">{fund.category ?? "—"}</td>

                  {returnKeys.map((key) => (
                    <td
                      key={key}
                      className="px-3 py-2 text-center text-green-600 dark:text-green-400"
                    >
                      23.45%
                    </td>
                  ))}

                  <td className="px-3 py-2 text-center">{fund.nav ?? "—"}</td>
                  <td className="px-3 py-2 text-center">{fund.frequency ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
