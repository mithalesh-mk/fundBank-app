"use client";

import { TrendingUp, LineChart, BarChart3, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="px-4 mb-6 md:mb-6 md:py-4">

      {/* Hero Section */}
      <section className="mt-10 bg-linear-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 md:p-14 shadow-lg border border-white/20 dark:border-gray-700 transition">
        
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Track. Analyze. Grow Your <span className="text-blue-600 dark:text-blue-400">Investments</span>
        </h1>

        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl">
          Stay updated with real-time mutual fund trends, market insights, and smart tools to help you invest better.
        </p>

        <button className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md flex items-center gap-2 transition font-medium">
          Explore Mutual Funds <ArrowRight size={18} />
        </button>

        {/* Decorative Chart Illustration */}
        <div className="mt-8 flex gap-6 text-gray-500 dark:text-gray-400">
          <LineChart className="w-10 h-10" />
          <BarChart3 className="w-10 h-10" />
          <TrendingUp className="w-10 h-10" />
        </div>
      </section>

      {/* Market Stats */}
      <section className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nifty 50</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">+0.82%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Today’s change</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sensex</h3>
          <p className="text-2xl font-bold text-green-600 mt-2">+0.56%</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Today’s change</p>
        </div>

        <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow border border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Global Market Sentiment
          </h3>
          <p className="text-2xl font-bold text-blue-600 mt-2">Neutral</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Updated 5 min ago</p>
        </div>
      </section>

      {/* Trending Mutual Funds */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Trending Mutual Funds
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Card 1 */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Axis Bluechip Fund
            </h3>
            <p className="text-green-600 font-bold mt-3 text-xl">18.4% / 1Y</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Large Cap</p>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              SBI Small Cap Fund
            </h3>
            <p className="text-green-600 font-bold mt-3 text-xl">32.1% / 1Y</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Small Cap</p>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-800 cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ICICI Tech Fund
            </h3>
            <p className="text-green-600 font-bold mt-3 text-xl">22.7% / 1Y</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sectoral – Technology</p>
          </div>

        </div>
      </section>

    </div>
  );
}
