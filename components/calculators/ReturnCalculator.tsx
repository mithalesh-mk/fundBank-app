"use client";
import React, { useState } from "react";
import { Calculator, Percent, TrendingUp, IndianRupee } from "lucide-react";


export default function ReturnCalculator({nav, expectedCagr}: {nav: number, expectedCagr: number}) {
  const [sip, setSip] = useState("5000");
  const [years, setYears] = useState("5");
  const [result, setResult] = useState<{
    invested: number;
    value: number;
    units: number;
    profit: number;
  } | null>(null);

  const calculateSIP = () => {
    const monthlySip = parseFloat(sip);
    const t = parseFloat(years) * 12;
    const r = expectedCagr / 100 / 12;

    if (!monthlySip || !t) return;

    // Each month: SIP buys units at given NAV
    let totalUnits = 0;

    for (let i = 0; i < t; i++) {
      let units = monthlySip / nav;
      totalUnits += units;
    }

    const invested = monthlySip * t;
    const finalValue = totalUnits * nav * Math.pow(1 + r, t); // applying CAGR on NAV
    const profit = finalValue - invested;

    setResult({
      invested,
      value: finalValue,
      units: totalUnits,
      profit,
    });
  };

  return (
    <div className="p-8 rounded-3xl bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-200 to-purple-300 dark:from-purple-900/40 dark:to-purple-800/30 shadow-inner">
          <Calculator className="w-6 h-6 text-purple-700 dark:text-purple-300" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Return Calculator (SIP Based)
        </h2>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 mb-10">

        {/* SIP Amount */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Monthly SIP Amount
          </label>
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-200 dark:border-gray-700">
            <IndianRupee className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <input
              type="number"
              value={sip}
              onChange={(e) => setSip(e.target.value)}
              className="bg-transparent outline-none w-full text-gray-900 dark:text-gray-200"
            />
          </div>
          <input
            type="range"
            min="500"
            max="50000"
            step="500"
            value={sip}
            onChange={(e) => setSip(e.target.value)}
            className="w-full accent-purple-600 dark:accent-purple-400"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>₹500</span>
            <span>₹50,000</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
            Duration (Years)
          </label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="bg-gray-100 dark:bg-gray-800/40 p-3 rounded-xl border border-gray-200 dark:border-gray-700 w-full outline-none text-gray-900 dark:text-gray-200"
          />
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full accent-purple-600 dark:accent-purple-400"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>1 Yr</span>
            <span>30 Yrs</span>
          </div>
        </div>

      </div>

      {/* Button */}
      <button
        onClick={calculateSIP}
        className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
      >
        Calculate SIP Returns
      </button>

      {/* Output */}
      {result && (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 gap-6">

          {/* Total Invested */}
          <div className="p-6 rounded-lg flex items-center gap-4">
            <div className="p-3 rounded-full bg-purple-600 text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.598 1M12 8V6m0 10v2m8-8a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300">
                Total Invested
              </p>
              <p className="text-lg font-bold text-purple-900 dark:text-purple-100 mt-1">
                ₹{result.invested.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Maturity Value */}
          <div className="p-6 rounded-3xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-600 text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M3 10h2l1 9h12l1-9h2M5 6h14l1 4H4l1-4z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-green-700 dark:text-green-300">
                Maturity Value
              </p>
              <p className="text-lg font-bold text-green-900 dark:text-green-100 mt-1">
                ₹{result.value.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Units Accumulated */}
          <div className="p-6 rounded-3xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-blue-600 text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M12 8V4m0 0l3 3m-3-3L9 7m-5 7h2l1 5h10l1-5h2M5 12h14" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                Units Accumulated
              </p>
              <p className="text-lg font-bold text-blue-900 dark:text-blue-100 mt-1">
                {result.units.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Profit */}
          <div className="p-6 rounded-3xl flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500 text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M4 12l6 6L20 6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-yellow-700 dark:text-yellow-300">
                Profit
              </p>
              <p className="text-lg font-bold text-yellow-900 dark:text-yellow-100 mt-1">
                ₹{result.profit.toFixed(0)}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
