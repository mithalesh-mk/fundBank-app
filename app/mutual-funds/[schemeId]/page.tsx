'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import fundService from '@/services/fundService';
import IntradayChart from '@/components/IntradayChart';
import ReturnCalculator from '@/components/calculators/ReturnCalculator';
import NumberFlow, { continuous } from '@number-flow/react';
import { all } from 'axios';

const ranges = [
  { label: '1M', days: 30 },
  { label: '3M', days: 90 },
  { label: '6M', days: 180 },
  { label: '1Y', days: 365 },
  { label: '3Y', days: 1095 },
  { label: '5Y', days: 365 * 5 },
  { label: 'All', days: 365 * 10 },
];

export interface FundMeta {
  y5_return: number;
  nav: number;
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
  isin_growth: string;
  isin_div_reinvestment: string;
  amc_img: string;
}

export default function Graph() {
  const params = useParams();
  const schemeId = params?.schemeId;

  const [selectedRange, setSelectedRange] = useState('1M');
  const [allData, setAllData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [schemeName, setSchemeName] = useState('');
  const [fundMeta, setFundMeta] = useState<FundMeta | null>(null);
  const [expectedCagr, setExpectedCagr] = useState<number | null>(null);
  const [returnsByRange, setReturnsByRange] = useState<
    Record<string, number | null>
  >({});

  const calculateReturn = (data: any[]) => {
    if (!data || data.length < 2) return null;

    const navEnd = data[0]?.nav;
    const navStart = data[data.length - 1]?.nav;
    if (!navStart || !navEnd) return null;
    return ((navEnd - navStart) / navStart) * 100;
  };

  const calculateExpectedCagr = (meta: FundMeta | null) => {
    if (!meta) return null;
  
    // Prefer long-term CAGR
    if (meta.y5_return && meta.y5_return > 0) {
      return meta.y5_return;
    }
  
    // Fallback to 3Y return
    const threeY = returnsByRange['3Y'];
    if (threeY && threeY > 0) {
      return threeY / 3;
    }
  
    // Fallback to 1Y return
    const oneY = returnsByRange['1Y'];
    if (oneY && oneY > 0) {
      return oneY;
    }
  
    // Final fallback
    return 12;
  };
  

  const fetchAllRanges = async () => {
    if (!schemeId) return;

    setLoading(true);

    try {
      // Create all promises for each range
      const promises = ranges.map(async (range) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - range.days);

        const startStr = start.toISOString().split('T')[0];
        const endStr = end.toISOString().split('T')[0];

        try {
          const response = await fundService.getFundNAV(
            schemeId.toString(),
            startStr,
            endStr
          );
          // Return an object with label + data
          setSchemeName(response?.meta.scheme_name || '');
          setFundMeta(response?.meta || null);
          return { label: range.label, data: response?.data || null };
        } catch (error) {
          console.error(`Error fetching ${range.label} data:`, error);
          return { label: range.label, data: null };
        }
      });

      // Wait for all requests to finish (even if some fail)
      const results = await Promise.allSettled(promises);

      const tempData: Record<string, any> = {};
      results.forEach((res) => {
        if (res.status === 'fulfilled') {
          tempData[res.value.label] = res.value.data;
        }
      });
      console.log(tempData);
      setAllData(tempData);
      const tempReturns: Record<string, number | null> = {};
      Object.keys(tempData).forEach((label) => {
        tempReturns[label] = calculateReturn(tempData[label]);
      });
      setReturnsByRange(tempReturns);
    } catch (err) {
      console.error('Error fetching ranges:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && fundMeta) {
      const cagr = calculateExpectedCagr(fundMeta);
      setExpectedCagr(cagr);
    }
  }, [loading, fundMeta, returnsByRange]);
  

  useEffect(() => {
    fetchAllRanges();
  }, [schemeId]);

  if (!schemeId) return <p>Invalid Scheme</p>;

  const data = allData[selectedRange];
  const latestNav = data ? data[data.length - 1]?.nav : null;
  console.log('cagr ', expectedCagr)

  return (
    <div className="min-h-screen dark:bg-gray-900 text-black dark:text-white pt-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION (graph + heading) */}
        <div className="lg:col-span-2">
          {/* Fund Heading + Logo */}
          <div className="mb-6 flex items-center gap-4">
            <img
              src={fundMeta?.amc_img}
              alt="Fund Logo"
              className="w-12 h-12 rounded-md"
            />
            <h1 className="text-md md:text-2xl font-bold">
              {schemeName || 'Mutual Fund Scheme'}
            </h1>
          </div>
          <div className="mb-3">
            {!loading && returnsByRange[selectedRange] !== null && (
              <span className="md:text-lg text-md font-semibold">
                {' '}
                {returnsByRange[selectedRange] > 0 ? (
                  <span className="text-green-600 md:text-[24px] text-[20px]">
                    {'+'}
                    <NumberFlow
                      plugins={[continuous]}
                      value={returnsByRange[selectedRange] ?? 0}
                      spinTiming={{ duration: 500 }}
                    />
                    %
                  </span>
                ) : (
                  <span className="text-red-600">
                    <NumberFlow
                      plugins={[continuous]}
                      value={returnsByRange[selectedRange] ?? 0}
                      spinTiming={{ duration: 500 }}
                    />
                    %
                  </span>
                )}{' '}
              </span>
            )}
            {!loading && (
              <span className="text-[12px] font-semibold text-gray-400 dark:text-gray-500 ml-1">
                {selectedRange} return
              </span>
            )}

            {!loading &&
              (() => {
                const current = Number(allData['1M']?.[0]?.nav);
                const previous = Number(allData['1M']?.[1]?.nav);

                const change = previous
                  ? ((current - previous) / previous) * 100
                  : 0;

                const isPositive = change >= 0;

                return (
                  <span
                    className={`text-[12px] font-semibold ml-1 block ${
                      isPositive ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {isPositive? '+ ' + change.toFixed(2): '- ' + change.toFixed(2)}% <span className='text-gray-400'>1D</span>
                  </span>
                );
              })()}
          </div>

          <div className="relative w-full h-[350px] sm:h-[420px] lg:h-[450px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg">Loading...</p>
              </div>
            ) : !data ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-lg">No Data Available</p>
              </div>
            ) : (
              <IntradayChart data={data} />
            )}

            {/* RANGE BUTTONS */}
          </div>
          <div className="w-fit mx-auto flex flex-wrap gap-2 px-2">
            {!loading &&
              ranges.map((r) => {
                if (r.label === '3M' && allData['3M'].length < 30) return null;
                if (r.label === '6M' && allData['6M'].length < 90) return null;
                if (r.label === '1Y' && allData['1Y'].length < 180) return null;
                if (r.label === '3Y' && allData['3Y'].length < 365) return null;
                if (r.label === '5Y' && allData['5Y'].length < 1095)
                  return null;
                if (r.label === 'All' && allData['All'].length < 365 * 5)
                  return null;

                return (
                  <button
                    key={r.label}
                    onClick={() => setSelectedRange(r.label)}
                    className={`px-3 py-1 text-sm font-medium rounded-2xl border transition
                    ${
                      selectedRange === r.label
                        ? 'bg-green-600 text-white border-green-700'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
          </div>
        </div>

        {/* RIGHT SECTION (CALCULATOR) */}
        <div className="lg:col-span-1 space-y-8">
          <ReturnCalculator
            nav={latestNav ?? 10}
            expectedCagr={expectedCagr?? 0}
          />
        </div>

        {/* EXPLORE MORE SECTION */}
        <div className="lg:col-span-3 space-y-8 mt-10">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Explore More
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Mutual Fund News
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Latest announcements, market updates, and fund house news.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Top Performing Funds
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check out the top-performing mutual funds.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 cursor-pointer">
              <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">
                Sector Insights
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Learn how different sectors are performing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
