"use client";

import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function EmiVsSipCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState("9");
  const [years, setYears] = useState(15);
  const [sip, setSip] = useState("15000");
  const [sipRate, setSipRate] = useState("12.5");


  const n = years * 12;
  const r = parseFloat(interestRate) / 1200;

  // EMI formula
  const EMI =
    loanAmount *
    (r * Math.pow(1 + r, n)) /
    (Math.pow(1 + r, n) - 1);

  const totalEmiOutflow = EMI * n;
  const totalInterestPaid = totalEmiOutflow - loanAmount;

  // SIP Future Value
  const SIPFutureValue =
    parseFloat(sip) *
    (((Math.pow(1 + parseFloat(sipRate) / 1200, n) - 1) / (parseFloat(sipRate) / 1200)) *
      (1 + parseFloat(sipRate) / 1200));

  console.log("sip" , SIPFutureValue, totalEmiOutflow);
  console.log("Left amount", totalEmiOutflow-SIPFutureValue)


  // Line chart (Yearly)
  const lineData = {
    labels: Array.from({ length: years + 1 }).map((_, i) => `Year ${i}`),
    datasets: [
      {
        label: "SIP Value",
        data: Array.from({ length: years + 1 }).map((_, i) =>
          parseFloat(sip) *
          (((Math.pow(1 + parseFloat(sipRate) / 1200, i * 12) - 1) /
            (parseFloat(sipRate) / 1200)) *
            (1 + parseFloat(sipRate) / 1200))
        ),
        borderWidth: 3,
        borderColor: "rgb(59,130,246)",
        tension: 0.3,
      },
      {
        label: "Total EMI Paid (Yearly)",
        data: Array.from({ length: years + 1 }).map((_, i) =>
          (EMI * (i * 12)) > totalEmiOutflow ? totalEmiOutflow : EMI * (i * 12)
        ),
        borderWidth: 3,
        borderColor: "rgb(147,197,253)",
        borderDash: [5, 5],
        tension: 0.15,
      },
    ],
  };

  // Doughnut chart
  const doughnutData = {
    labels: ["Loan Principal", "Interest Paid", "SIP Future Value"],
    datasets: [
      {
        data: [loanAmount, totalInterestPaid, SIPFutureValue],
        backgroundColor: ["#60a5fa", "#3b82f6", "#1d4ed8"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 max-w-6xl">
  
      {/* 2 COLUMN RESPONSIVE LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
  
        {/* LEFT SIDE — INPUTS */}
        <div className="space-y-6">
  
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Loan Amount (₹)</label>
            <input
              value={loanAmount}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val >= 0) setLoanAmount(val);   
            }}
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
  
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Loan Interest % (25%)</label>
            <input
              value={interestRate}
              onChange={(e) => {
                const val = e.target.value;

                // allow empty input during typing
                if (val === "") {
                  setInterestRate("");
                  return;
                }

                // allow decimals
                const num: number = parseFloat(val);

                if (!isNaN(num) && num >= 0 && num <= 20) {
                  setInterestRate(num.toString());
                }
              }}
              type="number"
              step="0.1"
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
  
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Tenure (30 Years)</label>
            <input
              value={years}
              onChange={(e) => {
                const val = Number(e.target.value)
                if (val >= 0 && val <= 30) setYears(Number(e.target.value))
            }}
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
  
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">Monthly SIP (₹)</label>
            <input
              value={sip}
                  onChange={(e) => {
                    const val = e.target.value;

                    // allow empty input during typing
                    if (val === "") {
                      setSip("");
                      return;
                    }

                    // allow decimals
                    const num: number = parseFloat(val);

                    if (!isNaN(num) && num >= 0 && num <= 10000000) {
                      setSip(num.toString());
                    }
                  }}
                  type="number"
                  step="1000"
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
  
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400">SIP Return % (25%)</label>
            <input
              value={sipRate}
                  onChange={(e) => {
                    const val = e.target.value;

                    // allow empty input during typing
                    if (val === "") {
                      setSipRate("");
                      return;
                    }

                    // allow decimals
                    const num: number = parseFloat(val);

                    if (!isNaN(num) && num >= 0 && num <= 100) {
                      setSipRate(num.toString());
                    }
                  }}
                  type="number"
                  step="0.01"
              className="w-full p-3 border rounded-xl bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
            />
          </div>
  
        </div>
  
        {/* RIGHT SIDE — CHARTS */}
        <div className="w-full">

          {/* SUMMARY CARD GRID */}
            <div className="grid grid-cols-1 gap-4 mb-8">

            {/* TOP BOX — Monthly EMI */}
            <div className="p-5 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Monthly EMI</p>
              <h2 className="text-3xl font-bold text-blue-600 dark:text-blue-300 mt-1">
                ₹ {Math.round(EMI).toLocaleString()}
              </h2>
              
            </div>

            {/* BOTTOM 2 BOXES RESPONSIVE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

              {/* Total Outflow vs SIP Value */}
              <div className="p-6 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h2 className="text-md font-bold text-blue-600 dark:text-blue-300 mb-4">Without SPI</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Loan Amount Paid</p>
                  <span className="font-semibold">
                    ₹ {Math.round(totalEmiOutflow).toLocaleString()}
                  </span>
              </div>

              {/* Loan cost with & without SIP */}
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="text-md font-bold text-blue-600 dark:text-blue-300 mb-4">Loan Cost With SIP</p>

                <div className="flex flex-col justify-between mt-2">
                  <div className="flex justify-between">                   
                    <span className="lg:text-[12px] text-sm text-gray-500 dark:text-gray-400">Net Cost</span>
                    <span className="font-semibold text-sm text-gray-400 dark:text-gray-200">
                      ₹{Math.round(totalEmiOutflow).toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between mt-1">
                  <span className="lg:text-[12px] text-sm text-gray-500 dark:text-gray-400">Net SPI Return</span>
                  <span className="font-semibold text-sm text-gray-400 dark:text-gray-200">
                    ₹{Math.round(SIPFutureValue).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between mt-1">
                  <span className="lg:text-[12px] text-sm text-gray-500 dark:text-gray-400">Net Load Amount</span>
                  <span className="lg:font-semibold text-sm text-shadow-green-500 dark:text-green-500">
                    ₹{Math.round(totalEmiOutflow - SIPFutureValue).toLocaleString()}
                  </span>
                </div>
              
              </div>

            </div>
            </div>

          <div className="p-4 border rounded-2xl border-gray-200 dark:border-gray-600 bg-blue-50 dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-black dark:text-blue-300 mb-4">
              Growth Comparison
            </h3>
            <Line data={lineData} />
          </div>
        </div>
  
      </div>
    </div>
  );
  
}
