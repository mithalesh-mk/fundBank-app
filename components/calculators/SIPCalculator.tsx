"use client";
import React, { useState } from "react";

export default function SPICalculator() {
  const [form, setForm] = useState({
    category: "",
    amount: "",
    frequency: "",
    start: "",
    end: "",
  });

  const [funds, setFunds] = useState([""]); // start with 1 fund

  const frequencies = ["Monthly", "Quarterly", "Half-Yearly", "Yearly"];

  // Add new fund input (max 4)
  const addFund = () => {
    if (funds.length < 4) setFunds([...funds, ""]);
  };

  // Remove specific fund
  const removeFund = (index: number) => {
    const updated = funds.filter((_, i) => i !== index);
    setFunds(updated);
  };

  // Update specific fund
  const updateFund = (index: number, value: string) => {
    const updated = [...funds];
    updated[index] = value;
    setFunds(updated);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50 dark:bg-gray-900 transition-colors">
      
      {/* ------- Page Header ------- */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Mutual Fund SIP Calculator
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Estimate returns for any mutual fund based on your SIP inputs.
        </p>
      </div>

      {/* ------- Calculator Card ------- */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-sm p-6 border border-gray-200 dark:border-gray-700 transition-all">

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Category */}
          <div>
            <label className="calc-label">Select Category</label>
            <select
              className="calc-select"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Choose Category</option>
              <option value="Large Cap">Equity: Large Cap</option>
              <option value="Mid Cap">Equity: Mid Cap</option>
            </select>
          </div>

          {/* -------- Dynamic Funds Section -------- */}
          <div className="space-y-4">
            {funds.map((value, index) => (
              <div key={index}>
                <label className="calc-label">Fund {index + 1}</label>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter fund name"
                    className="calc-input flex-1"
                    value={value}
                    onChange={(e) => updateFund(index, e.target.value)}
                  />

                  {/* Remove button (only if more than 1 fund) */}
                  {funds.length > 1 && (
                    <button
                      onClick={() => removeFund(index)}
                      className="text-red-500 dark:text-red-400 text-xl font-bold"
                    >
                      ✖
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Add Fund Button */}
            {funds.length < 4 && (
              <p
                onClick={addFund}
                className="text-green-600 dark:text-green-400 text-sm cursor-pointer"
              >
                + Add another fund (upto 4)
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="calc-label">Installment Amount</label>
            <input
              placeholder="3000"
              className="calc-input decr"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
            />
          </div>

          {/* Frequency */}
          <div>
            <label className="calc-label">Select Frequency</label>
            <select
              className="calc-select"
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
            >
              <option>Select</option>
              {frequencies.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="calc-label">Select Start Date</label>
            <input
              type="date"
              className="calc-input"
              value={form.start}
              onChange={(e) => setForm({ ...form, start: e.target.value })}
            />
          </div>

          {/* End Date */}
          <div>
            <label className="calc-label">Select End Date</label>
            <input
              type="date"
              className="calc-input"
              value={form.end}
              onChange={(e) => setForm({ ...form, end: e.target.value })}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow">
            Submit
          </button>
        </div>
      </div>

      {/* ------- Summary Section ------- */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Summary
        </h2>

        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow">
          <table className="w-full text-left border-2">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr className="text-gray-700 text-sm dark:text-gray-300">
                {[
                  "Fund Name",
                  "AMC",
                  "Launch Date",
                  "Nav Date",
                  "Nav",
                  "Units",
                  "Installments",
                  "Investment",
                  "SIP Value",
                  "XIRR (%)",
                ].map((th) => (
                  <th key={th} className="px-2 py-3 text-sm font-medium">
                    {th}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr className="border-t text-sm border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200">
                <td className="px-4 py-3 text-blue-600 dark:text-blue-400 cursor-pointer">
                  Axis Large Cap Fund Dir Gr
                </td>
                <td className="px-4">AxisMF</td>
                <td className="px-4">01/01/2013</td>
                <td className="px-4">27/11/2025</td>
                <td className="px-4">72.18</td>
                <td className="px-4">175.909</td>
                <td className="px-4">4</td>
                <td className="px-4">12,000</td>
                <td className="px-4">12,697</td>
                <td className="px-4">10.88</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
