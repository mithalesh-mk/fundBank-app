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

  const [schemeNames, setSchemeNames] = useState<SchemeName[]>([]);

  const [formData, setFormData] = useState({
    amc: "Mirae Asset Mutual Fund",
    scheme: "Mirae Asset Large Cap Gr",
    lumpsum: 1000000,
    investDate: "2016-08-20",
    withdrawal: 3000,
    swpDate: "10",
    periodType: "Monthly",
    swpStartDate: "2016-08-20",
    swpEndDate: "2025-12-07",
    years: "",
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
    fetchSchemeNames(formData.amc);
  }, [formData.amc]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
                value={formData.amc}
                onChange={handleInputChange}
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
                name="scheme"
                value={formData.scheme}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {schemeNames?.map((s, index) => (
                  <option key={index} value={s.scheme_name}>
                    {s.scheme_name}
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
                name="lumpsum"
                value={formData.lumpsum}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <DateInput label="Investment Date" name="investDate" value={formData.investDate} />

            {/* Withdrawal */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                Withdrawal Amount
              </label>
              <input
                name="withdrawal"
                value={formData.withdrawal}
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
                name="swpDate"
                value={formData.swpDate}
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
                name="periodType"
                value={formData.periodType}
                onChange={handleInputChange}
                className="w-full p-2.5 rounded-lg border border-gray-200 dark:border-blue-900 
                           bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option>Monthly</option>
                <option>Quarterly</option>
                <option>Yearly</option>
              </select>
            </div>

            <DateInput label="SWP Start Date" name="swpStartDate" value={formData.swpStartDate} />
            <DateInput label="SWP End Date" name="swpEndDate" value={formData.swpEndDate} />
          </div>

          <div className="pt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-lg shadow transition-all active:scale-95">
              Submit
            </button>
          </div>
        </div>

        {/* ======================== RESULTS ======================== */}
        {result && (
          <>
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
                    ₹ {result.totalWithdrawn.toLocaleString("en-IN")}
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

            {/* Chart Box */}
            <div className="rounded-xl border border-gray-200 dark:border-blue-900 
                            bg-gray-50 dark:bg-gray-800 p-6 transition-all">

              <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400 text-center mb-4">
                Value Movement – {formData.scheme}
              </h3>

              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={result.data}>
                    <defs>
                      <linearGradient id="valueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="10%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke={darkMode ? "#1e3a8a" : "#e5e7eb"}
                    />

                    <XAxis
                      dataKey="date"
                      tick={{ fill: darkMode ? "#ccc" : "#555", fontSize: 12 }}
                      tickFormatter={(str) => {
                        const d = new Date(str);
                        return `${d.getMonth() + 1}-${d.getFullYear()}`;
                      }}
                    />

                    <YAxis
                      tick={{ fill: darkMode ? "#ccc" : "#555", fontSize: 12 }}
                      tickFormatter={(v) => `${(v / 100000).toFixed(1)}L`}
                    />

                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? "#1f2937" : "white",
                        borderColor: darkMode ? "#1e3a8a" : "#ddd",
                      }}
                      formatter={(value) => [`₹ ${value.toLocaleString()}`, "Value"]}
                    />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="url(#valueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
