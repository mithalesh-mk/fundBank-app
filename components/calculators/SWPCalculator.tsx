"use client";

import { useState } from "react";

export default function SwpCalculator() {
  const [form, setForm] = useState({
    amc: "",
    scheme: "",
    lumpsum: "",
    withdrawAmount: "",
    withdrawDate: "10",
    investDate: "",
    swpStart: "",
    swpEnd: "",
    periodYears: "",
    frequency: "Monthly",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Mutual Fund SWP Calculator
      </h1>

      {/* Main Card */}
      <div className="max-w-5xl mx-auto bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl 
                      border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 md:p-8">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* AMC */}
          <div>
            <label className="form-label">Select AMC</label>
            <select
              name="amc"
              value={form.amc}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option>Mirae Asset Mutual Fund</option>
              <option>Aditya Birla Sun Life</option>
              <option>HDFC Mutual Fund</option>
            </select>
          </div>

          {/* Scheme */}
          <div>
            <label className="form-label">Select Scheme</label>
            <select
              name="scheme"
              value={form.scheme}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Select</option>
              <option>Mirae Asset Large Cap Gr</option>
            </select>
          </div>

          {/* Lumpsum */}
          <div>
            <label className="form-label">Lumpsum Amount</label>
            <input
              name="lumpsum"
              type="number"
              value={form.lumpsum}
              onChange={handleChange}
              className="form-input"
              placeholder="1000000"
            />
          </div>

          {/* Investment Date */}
          <div>
            <label className="form-label">Investment Date</label>
            <input
              type="date"
              name="investDate"
              value={form.investDate}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Withdrawal Amount */}
          <div>
            <label className="form-label">Withdrawal Amount</label>
            <input
              name="withdrawAmount"
              type="number"
              value={form.withdrawAmount}
              onChange={handleChange}
              className="form-input"
              placeholder="3000"
            />
          </div>

          {/* SWP Date */}
          <div>
            <label className="form-label">Select SWP Date</label>
            <select
              name="withdrawDate"
              value={form.withdrawDate}
              onChange={handleChange}
              className="form-input"
            >
              <option>1</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>25</option>
            </select>
          </div>

          {/* Frequency */}
          <div>
            <label className="form-label">Select Period</label>
            <select
              name="frequency"
              value={form.frequency}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Monthly">Monthly</option>
            </select>
          </div>

          {/* SWP Start Date */}
          <div>
            <label className="form-label">SWP Start Date</label>
            <input
              type="date"
              name="swpStart"
              value={form.swpStart}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* SWP End Date */}
          <div>
            <label className="form-label">SWP End Date</label>
            <input
              type="date"
              name="swpEnd"
              value={form.swpEnd}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          {/* Period in Years */}
          <div>
            <label className="form-label">Period (in Years)</label>
            <input
              type="number"
              name="periodYears"
              value={form.periodYears}
              onChange={handleChange}
              className="form-input"
              placeholder="eg 5"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 text-center">
          <button className="px-8 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-700 
                             text-white shadow-md">
            Submit
          </button>
        </div>
      </div>

      {/* Result Table */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Systematic Withdrawal Plan Calculator
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/40 backdrop-blur-xl">
          <table className="w-full text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
              <tr>
                <th className="th">Scheme</th>
                <th className="th">AMC Name</th>
                <th className="th">Withdrawal Period</th>
                <th className="th">Installments</th>
                <th className="th">Total Withdrawal</th>
                <th className="th">Current Value</th>
                <th className="th">Return (%)</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <td className="td">Mirae Asset Large Cap Gr</td>
                <td className="td">MiraeMF</td>
                <td className="td">20-08-2016 → 01-12-2025</td>
                <td className="td">111</td>
                <td className="td">3,33,000</td>
                <td className="td">25,66,478</td>
                <td className="td font-semibold text-green-500">13.41</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* Extra Styles */
