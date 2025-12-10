"use client";

import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Moon, Sun, Download, Calendar as CalendarIcon } from "lucide-react";
import fundService, { SchemeName } from "@/services/fundService";



// ---------------------------------------------------
// AMC LIST
// ---------------------------------------------------
const amcList = [
  "Aditya Birla Sun Life Mutual Fund",
  "Angel One Mutual Fund",
  "Axis Mutual Fund",
  "Bajaj Finserv Mutual Fund",
  "Bandhan Mutual Fund",
  "Bank of India Mutual Fund",
  "Baroda BNP Paribas Mutual Fund",
  "Canara Robeco Mutual Fund",
  "Capitalmind Mutual Fund",
  "Choice Mutual Fund",
  "DSP Mutual Fund",
  "Edelweiss Mutual Fund",
  "Franklin Templeton Mutual Fund",
  "Groww Mutual Fund",
  "HDFC Mutual Fund",
  "HSBC Mutual Fund",
  "Helios Mutual Fund",
  "ICICI Prudential Mutual Fund",
  "IL&FS Mutual Fund (IDF)",
  "ITI Mutual Fund",
  "Invesco Mutual Fund",
  "JM Financial Mutual Fund",
  "Jio BlackRock Mutual Fund",
  "Kotak Mahindra Mutual Fund",
  "LIC Mutual Fund",
  "Mahindra Manulife Mutual Fund",
  "Mirae Asset Mutual Fund",
  "Motilal Oswal Mutual Fund",
  "NJ Mutual Fund",
  "Navi Mutual Fund",
  "Nippon India Mutual Fund",
  "Old Bridge Mutual Fund",
  "PGIM India Mutual Fund",
  "PPFAS Mutual Fund",
  "Quantum Mutual Fund",
  "SBI Mutual Fund",
  "Samco Mutual Fund",
  "Shriram Mutual Fund",
  "Sundaram Mutual Fund",
  "Tata Mutual Fund",
  "Taurus Mutual Fund",
  "The Wealth Company Mutual Fund",
  "Trust Mutual Fund",
  "UTI Mutual Fund",
  "Unifi Mutual Fund",
  "Union Mutual Fund",
  "WhiteOak Capital Mutual Fund",
  "Zerodha Mutual Fund",
  "quant Mutual Fund",
];

export default function SWPCalculator() {
  const [darkMode, setDarkMode] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [amc, setAmc] = useState<string>("Mirae Asset Mutual Fund");
  const [schemeNames, setSchemeNames] = useState<SchemeName[]>([]);

  const [formData, setFormData] = useState({
    scheme_code: "119551",
    swp_date: 10,
    invest_date: "2016-08-20",
    start_date: "2016-08-20",
    total_invested_amount: 1000000,
    end_date: "2025-12-07",
    withdrawal_amount: 3000,
    interval: "monthly",
  });

  const fetchSchemeNames = async (amc: string) => {
    try {
      const res = await fundService.getSchemeNames(amc);
      setSchemeNames(res);
    } catch (e) {
      console.error("Error loading schemes", e);
    }
  };

  useEffect(() => {
    fetchSchemeNames(amc);
  }, [amc]);

  // Convert number fields automatically
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    const numberFields = [
      "total_invested_amount",
      "withdrawal_amount",
      "swp_date",
    ];

    setFormData((prev) => ({
      ...prev,
      [name]: numberFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const swpResult = await fundService.calculateSwp(formData);
  
      const chartData = swpResult.swp_report.map((r: any) => ({
        date: r.current_date,
        value: Number(r.current_value),
      }));
  
      setResult({
        ...swpResult,
        data: chartData, // <<< required for chart
      });
  
      console.log("SWP Result:", swpResult);
    } catch (error) {
      console.error("Error calculating SWP:", error);
    }
  };

  

  // FIXED: invest_date name was wrong earlier
  const DateInput = ({ label, name, value }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
        {label}
      </label>

      <div className="relative">
        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        <input
          type="date"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="w-full pl-10 p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                     bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen transition-colors duration-300 ${
        dark:bg-gray-900 dark:text-gray-100 text-gray-900"
    >
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* ======================== INPUT BOX ======================== */}
        <div className="rounded-xl border border-gray-200 dark:border-blue-900 
                        bg-gray-50 dark:bg-gray-800 p-6 transition-all shadow-md">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* AMC */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Select AMC
              </label>
              <select
                name="amc"
                value={amc}
                onChange={(e) => setAmc(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {amcList.map((amc, index) => (
                  <option key={index} value={amc}>
                    {amc}
                  </option>
                ))}
              </select>
            </div>

            {/* Scheme */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Select Scheme
              </label>
              <select
                value={formData.scheme_code}
                onChange={handleInputChange}
                name="scheme_code"
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {schemeNames?.map((s, index) => (
                  <option key={index} value={s.scheme_code}>
                    {s.scheme_name} {s.scheme_code}
                  </option>
                ))}
              </select>
            </div>

            {/* Lumpsum */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Lumpsum Amount
              </label>
              <input
                name="total_invested_amount"
                value={formData.total_invested_amount}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* FIXED NAME */}
            <DateInput label="Investment Date" name="invest_date" value={formData.invest_date} />

            {/* Withdrawal */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Withdrawal Amount
              </label>
              <input
                name="withdrawal_amount"
                value={formData.withdrawal_amount}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* SWP Date */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                SWP Date
              </label>
              <select
                name="swp_date"
                value={formData.swp_date}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Period Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Select Period
              </label>
              <select
                name="interval"
                value={formData.interval}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="weekly">Weekly</option>
                <option value="fortnightly">Fortnightly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <DateInput label="SWP Start Date" name="start_date" value={formData.start_date} />
            <DateInput label="SWP End Date" name="end_date" value={formData.end_date} />
          </div>

          <div className="pt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg shadow transition-all active:scale-95"
            onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>

        {/* ======================== RESULTS ======================== */}
        {result && (
          <div className="space-y-16">
            <div className="rounded-xl border border-gray-200 dark:border-blue-900 
                            bg-gray-50 dark:bg-gray-800 p-6 flex flex-col gap-6 transition-all">

              <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
                SWP Calculator Result
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-500 dark:text-gray-300 text-xs">Installments</p>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    {result.installments}
                  </h3>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-500 dark:text-gray-300 text-xs">Total Withdrawal</p>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                    ₹ {result.totalWithdrawn}
                  </h3>
                </div>

                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-500 dark:text-gray-300 text-xs">Return (%)</p>
                  <h3 className="font-semibold text-green-600">
                    {result.returnPerc}%
                  </h3>
                </div>
              </div>
            </div>

            <div className="w-full h-72">
            <h3
                className={`text-lg font-semibold mb-4 ${
                  darkMode ? "text-gray-100" : "text-gray-800"
                }`}
              >
                SWP Growth Chart
              </h3>

              <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={result.data}>
                <defs>
                    <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke={darkMode ? "#1f2a48" : "#e5e7eb"}
                  />

                  {/* X-Axis */}
                  <XAxis
                    dataKey="date"
                    tick={{ fill: darkMode ? "#c9d1d9" : "#374151", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value: string) => {
                      const d = new Date(value);

                      // Check for invalid date
                      if (isNaN(d.getTime())) return "";

                      return d.toLocaleString("en-US", {
                        month: "short", 
                        year: "numeric",
                      });
                    }}
                  />

                  {/* Y-Axis */}
                  <YAxis
                    tick={{ fill: darkMode ? "#c9d1d9" : "#374151", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `${(v / 100000).toFixed(1)}L`}
                  />

                  {/* Tooltip */}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#111827" : "#ffffff",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                    formatter={(value: number) => [`₹ ${value.toLocaleString()}`, "Value"]}
                    
                  />

                  {/* Area Line */}
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    fill="url(#valueGradient)"
                    strokeWidth={2}
                    activeDot={{ r: 4 }}
                  />
                </AreaChart>

              </ResponsiveContainer>

              </div>

            {/* ======================== SWP REPORT TABLE ======================== */}
              <div className="rounded-xl mt-10 border border-gray-200 dark:border-blue-900 
                              bg-gray-50 dark:bg-gray-800 p-6 transition-all">

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">
                    SWP Withdrawal Report
                  </h3>

                  {/* DOWNLOAD BUTTON */}
                  <button
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
                  >
                    <Download size={16} />
                    Download Excel
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-700 text-left text-sm">
                        <th className="p-2">Date</th>
                        <th className="p-2">NAV</th>
                        <th className="p-2">Units</th>
                        <th className="p-2">Cumulative Units</th>
                        <th className="p-2">Cash Flow</th>
                        <th className="p-2">Current Value</th>
                        <th className="p-2">Capital Gains / Loss</th>
                      </tr>
                    </thead>

                    <tbody>
                      {result?.swp_report?.map((row: any, idx: number) => (
                        <tr
                          key={idx}
                          className="border-b dark:border-gray-700 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <td className="p-2">{row.current_date}</td>
                          <td className="p-2">{row.current_nav.toFixed(4)}</td>
                          <td className="p-2">{row.units.toFixed(4)}</td>
                          <td className="p-2">{row.cumulative_units.toFixed(4)}</td>
                          <td className="p-2">₹ {row.cash_flow.toLocaleString()}</td>
                          <td className="p-2">₹ {row.current_value.toLocaleString()}</td>
                          <td
                            className={`p-2 ${
                              row.capital_gains_loss >= 0
                                ? "text-green-600"
                                : "text-red-500"
                            }`}
                          >
                            ₹ {row.capital_gains_loss.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>


            

          </div>
        )}
      </div>
    </div>
  );
}
