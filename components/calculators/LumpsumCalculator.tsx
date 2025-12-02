"use client";

import React, { useState } from "react";
import { CalendarDays, PlusCircle } from "lucide-react";

export default function LumpsumCalculator() {
  const [funds, setFunds] = useState([{ fund: "", amount: "", start: "", end: "" }]);

  const addFund = () => {
    if (funds.length === 4) return;
    setFunds([...funds, { fund: "", amount: "", start: "", end: "" }]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      
      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Lump Sum Return Calculator
      </h1>

      {/* CARD WRAPPER */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 md:p-8 space-y-8">

        {funds.map((item, index) => (
          <div key={index} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Fund {index + 1}
            </h2>

            {/* FUND NAME & AMOUNT */}
            <div className="grid md:grid-cols-2 gap-6">

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Fund Name</label>
                <input
                  type="text"
                  placeholder="HSBC Value Fund Reg Gr"
                  className="input-premium"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Enter Amount</label>
                <input
                  type="number"
                  placeholder="100000"
                  className="input-premium"
                />
              </div>
            </div>

            {/* DATES */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Select Start Date</label>
                <input type="date" className="input-premium" />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Select End Date</label>
                <input type="date" className="input-premium" />
              </div>
            </div>

          </div>
        ))}

        {/* ADD FUND */}
        {funds.length < 4 && (
          <button
            onClick={addFund}
            className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium hover:opacity-80"
          >
            <PlusCircle size={18} /> Add another fund (upto 4)
          </button>
        )}

        {/* PREFILL */}
        <div className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-sm">Prefill start date with inception date</span>
        </div>

        {/* SUBMIT */}
        <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-lg font-semibold">
          Submit
        </button>
      </div>

    {/* SUMMARY TABLE */}
    <div className="mt-12">

        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Summary</h2>
            <button className="px-4 py-2 bg-emerald-500 text-white text-sm rounded-lg hover:bg-emerald-600">
            Download Result
            </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="min-w-full text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                {[
                    "Scheme Name",
                    "AMC Name",
                    "Category",
                    "Launch Date",
                    "Amount Invested",
                    "Value on End Date",
                    "Profit",
                    "CAGR (%)",
                    "Absolute (%)",
                ].map((h) => (
                    <th
                    key={h}
                    className="px-4 py-3 font-semibold text-left border-b dark:border-gray-700 whitespace-nowrap"
                    >
                    {h}
                    </th>
                ))}
                </tr>
            </thead>

            <tbody>
                {/* MF Row */}
                <tr className="text-gray-800 dark:text-gray-200">
                <td className="td-premium text-indigo-600">HSBC Value Fund Reg Gr</td>
                <td className="td-premium">HSBCMF</td>
                <td className="td-premium">Equity: Value</td>
                <td className="td-premium">01-01-2013</td>
                <td className="td-premium">1,00,000</td>
                <td className="td-premium">4,49,162</td>
                <td className="td-premium">3,49,162</td>
                <td className="td-premium">16.19</td>
                <td className="td-premium">349.16</td>
                </tr>

                {/* Benchmark Rows */}
                {[
                ["NIFTY 500 TRI", "-", "-", "01-01-1995", "3,98,374", "2,98,374", "14.81", "298.37"],
                ["Fixed Deposit", "-", "-", "-", "1,84,232", "84,232", "6.3", "84.23"],
                ["Gold", "-", "-", "-", "5,15,113", "4,15,113", "17.8", "415.11"],
                ["PPF", "-", "-", "-", "2,05,593", "1,05,593", "7.47", "105.59"],
                ].map((r, i) => (
                <tr key={i} className="bg-yellow-50/40 dark:bg-yellow-900/10">
                    <td className="td-premium font-medium">{r[0]}</td>
                    <td className="td-premium">-</td>
                    <td className="td-premium">-</td>
                    <td className="td-premium">{r[3]}</td>
                    <td className="td-premium">{r[4]}</td>
                    <td className="td-premium">{r[5]}</td>
                    <td className="td-premium">{r[6]}</td>
                    <td className="td-premium">{r[7]}</td>
                    <td className="td-premium">{r[7]}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
    </div>
    </div>
  );
}
