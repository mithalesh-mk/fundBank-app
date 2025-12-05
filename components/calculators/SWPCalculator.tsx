"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const sliderFill = (value: number, min: number, max: number) => {
  return ((value - min) * 100) / (max - min);
};

export default function SWPCalculator() {
  const [initial, setInitial] = useState(1000000); // starting corpus
  const [withdraw, setWithdraw] = useState(20000); // monthly SWP
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(10);

  const badgeClass =
    "min-w-[90px] text-center px-3 py-1 bg-[#59a0f7] dark:bg-[#59a0f7] text-white dark:text-black rounded-md";

  const months = years * 12;

  // SWP Formula
  function calculateFinalCorpus(
    initial: number,
    monthlyWithdraw: number,
    years: number,
    annualRate: number
  ) {
    const r = annualRate / 12 / 100;
    const n = years * 12;

    let balance = initial;

    for (let i = 0; i < n; i++) {
      balance = (balance - monthlyWithdraw) * (1 + r);
    }
    return balance;
  }

  const totalInvestment = initial;
  const totalWithdrawal = withdraw * months;
  const finalValue = calculateFinalCorpus(initial, withdraw, years, rate);

  const chartData = {
    labels: ["Total Withdrawal", "Final Value"],
    datasets: [
      {
        data: [totalWithdrawal, finalValue],
        backgroundColor: ["rgba(200, 210, 255, 0.45)", "#2b7fff"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="max-w-full w-full mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 transition">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* LEFT SECTION */}
        <div className="space-y-8">

          {/* Initial Corpus */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Initial Investment</p>
            <div className="flex items-center justify-between gap-4">
              <input
                type="range"
                min="10000"
                max="10000000"
                step="5000"
                value={initial}
                onChange={(e) => setInitial(Number(e.target.value))}
                className="w-full custom-slider"
                style={{
                  background: `linear-gradient(to right, #2b7fff ${sliderFill(
                    initial,
                    10000,
                    10000000
                  )}%, #4b5563 ${sliderFill(initial, 10000, 10000000)}%)`,
                }}
              />
              <span className={badgeClass}>₹{initial.toLocaleString()}</span>
            </div>
          </div>

          {/* Monthly Withdrawal */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Monthly Withdrawal</p>
            <div className="flex items-center justify-between gap-4">
              <input
                type="range"
                min="500"
                max="500000"
                step="500"
                value={withdraw}
                onChange={(e) => setWithdraw(Number(e.target.value))}
                className="w-full custom-slider"
                style={{
                  background: `linear-gradient(to right, #2b7fff ${sliderFill(
                    withdraw,
                    500,
                    500000
                  )}%, #4b5563 ${sliderFill(withdraw, 500, 500000)}%)`,
                }}
              />
              <span className={badgeClass}>₹{withdraw.toLocaleString()}</span>
            </div>
          </div>

          {/* Expected Return */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">
              Expected return rate (p.a)
            </p>
            <div className="flex items-center justify-between gap-4">
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full custom-slider"
                style={{
                  background: `linear-gradient(to right, #2b7fff ${sliderFill(
                    rate,
                    1,
                    20
                  )}%, #4b5563 ${sliderFill(rate, 1, 20)}%)`,
                }}
              />
              <span className={badgeClass}>{rate}%</span>
            </div>
          </div>

          {/* Time Period */}
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Time period</p>
            <div className="flex items-center justify-between gap-4">
              <input
                type="range"
                min="1"
                max="30"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full custom-slider"
                style={{
                  background: `linear-gradient(to right, #2b7fff ${sliderFill(
                    years,
                    1,
                    30
                  )}%, #4b5563 ${sliderFill(years, 1, 30)}%)`,
                }}
              />
              <span className={badgeClass}>{years} Yr</span>
            </div>
          </div>

          {/* Summary */}
          <div className="pt-4 space-y-1">
            <p className="text-gray-600 dark:text-gray-400">
              Total investment
              <span className="float-right font-semibold">
                ₹{totalInvestment.toLocaleString()}
              </span>
            </p>

            <p className="text-gray-600 dark:text-gray-400">
              Total withdrawal
              <span className="float-right font-semibold">
                ₹{totalWithdrawal.toLocaleString()}
              </span>
            </p>

            <p className="text-gray-900 dark:text-gray-200 text-lg font-bold">
              Final value
              <span className="float-right">
                ₹{Math.round(finalValue).toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION (CHART) */}
        <div className="flex justify-center items-center">
          <div className="w-60 h-60 md:w-72 md:h-72">
            <Doughnut data={chartData} />
          </div>
        </div>

      </div>
    </div>
  );
}
