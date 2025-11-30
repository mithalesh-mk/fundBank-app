"use client";
import FilterBar from "@/components/FilterBar";
import fundService, { MutualFundScheme } from "@/services/fundService";
import React, { useEffect, useState } from "react";

interface Fund {
    logo: string;
    name: string;
    category: string;
    oneY: string;
    threeY: string;
    fiveY: string;
    rating: string;
    risk: string;
}

const returnKeys: (keyof Fund)[] = ["oneY", "threeY", "fiveY"];

const fundData = [
  {
    logo: "https://logo.clearbit.com/sbi.co.in",
    name: "SBI Gold Fund",
    category: "Commodities • Gold",
    oneY: "+62.63%",
    threeY: "+32.26%",
    fiveY: "+19.62%",
    rating: "5★",
    risk: "Very High",
  },
  {
    logo: "https://logo.clearbit.com/motilaloswal.com",
    name: "Motilal Oswal Midcap Fund",
    category: "Equity • Mid Cap",
    oneY: "-2.63%",
    threeY: "+27.59%",
    fiveY: "+31.22%",
    rating: "5★",
    risk: "Very High",
  },
  {
    logo: "https://logo.clearbit.com/bandhan.com",
    name: "Bandhan Small Cap Fund",
    category: "Equity • Small Cap",
    oneY: "+2.83%",
    threeY: "+32.00%",
    fiveY: "+29.87%",
    rating: "5★",
    risk: "Very High",
  },
  {
    logo: "https://logo.clearbit.com/ppfas.com",
    name: "Parag Parikh Flexi Cap Fund",
    category: "Equity • Flexi Cap",
    oneY: "+9.31%",
    threeY: "+21.80%",
    fiveY: "+21.92%",
    rating: "5★",
    risk: "Very High",
  },
  {
    logo: "https://logo.clearbit.com/hdfc.com",
    name: "HDFC Flexi Cap Fund",
    category: "Equity • Flexi Cap",
    oneY: "+11.03%",
    threeY: "+21.88%",
    fiveY: "+26.91%",
    rating: "5★",
    risk: "Very High",
  },
];

export default function MutualFunds() {
    const [selectedFilters, setSelectedFilters] = useState({});
    const [funds, setFunds] = useState<MutualFundScheme[]>();

    useEffect(() => {
        // Fetch all funds on component mount
        const fetchFunds = async () => {
            try {
                const allFunds = await fundService.getAllFunds();
                setFunds(allFunds);
                console.log("Fetched funds:", allFunds);
            } catch (error) {
                console.error("Error fetching funds:", error);
            }
        };
        fetchFunds();
    }, []);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-10">

      {/* PAGE HEADER */}
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        All Mutual Funds
      </h1>

      {/* FILTERS */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
      <FilterBar onFilterChange={(filters) => setSelectedFilters(filters)} />
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">

        <table className="w-full min-w-[900px]">

          {/* HEADER */}
          <thead className="bg-gray-100 dark:bg-gray-800/70 border-b border-gray-200 dark:border-gray-700">
            <tr className="text-gray-700 dark:text-gray-300 text-sm">
              <th className="px-6 py-4 font-semibold text-left w-[260px]">Fund Name</th>
              <th className="px-6 py-4 font-semibold text-left w-[150px]">Category</th>
              <th className="px-6 py-4 font-semibold text-center w-20">1Y</th>
              <th className="px-6 py-4 font-semibold text-center w-20">3Y</th>
              <th className="px-6 py-4 font-semibold text-center w-20">5Y</th>
              <th className="px-6 py-4 font-semibold text-center w-[70px]">Rating</th>
              <th className="px-6 py-4 font-semibold text-center w-[100px]">Risk</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-gray-900 dark:text-gray-200 text-sm">
            {fundData.map((fund: Fund, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-800 
                hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                {/* FUND NAME + LOGO */}
                <td className="px-6 py-4 flex items-center gap-3 whitespace-nowrap">
                  <img src={fund.logo} className="w-8 h-8 rounded" alt="" />
                  <span className="font-medium">{fund.name}</span>
                </td>

                {/* CATEGORY */}
                <td className="px-6 py-4 whitespace-nowrap">{fund.category}</td>

                {/* RETURNS */}
                {returnKeys.map((key) => (
                  <td
                    key={key}
                    className={`px-6 py-4 font-medium text-center whitespace-nowrap ${
                      fund[key].startsWith("-")
                        ? "text-red-500 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    {fund[key]}
                  </td>
                ))}

                {/* RATING */}
                <td className="px-6 py-4 text-center whitespace-nowrap">{fund.rating}</td>

                {/* RISK */}
                <td className="px-6 py-4 text-center whitespace-nowrap">{fund.risk}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
