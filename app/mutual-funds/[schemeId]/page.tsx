"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import fundService from "@/services/fundService";
import IntradayChart from "@/components/IntradayChart";
import FundDetailsCard from "@/components/FundDetailsCard";

const ranges = [
  { label: "1M", days: 30 },
  { label: "3M", days: 90 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
];

export interface FundMeta {
    fund_house: string;
    scheme_type: string;
    scheme_category: string;
    scheme_code: number;
    scheme_name: string;
    isin_growth: string;
    isin_div_reinvestment: string;
  }
  
export default function Graph() {
  const params = useParams();
  const schemeId = params?.schemeId;

  const [selectedRange, setSelectedRange] = useState("1M");
  const [allData, setAllData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [schemeName, setSchemeName] = useState("");
  const [fundMeta, setFundMeta] = useState<FundMeta | null>(null);

  const fetchAllRanges = async () => {
    if (!schemeId) return;
  
    setLoading(true);
  
    try {
      // Create all promises for each range
      const promises = ranges.map(async (range) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - range.days);
  
        const startStr = start.toISOString().split("T")[0];
        const endStr = end.toISOString().split("T")[0];
  
        try {
          const response = await fundService.getFundNAV(
            schemeId.toString(),
            startStr,
            endStr
          );
          // Return an object with label + data
          setSchemeName(response?.meta.scheme_name || "");
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
        if (res.status === "fulfilled") {
          tempData[res.value.label] = res.value.data;
        }
      });
  
      setAllData(tempData);
  
    } catch (err) {
      console.error("Error fetching ranges:", err);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAllRanges();
  }, [schemeId]);

  if (!schemeId) return <p>Invalid Scheme</p>;

  const data = allData[selectedRange];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-black dark:text-white pt-12 px-6">
  
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
  
        {/* LEFT SECTION (graph + heading) */}
        <div className="lg:col-span-2">
  
          {/* Fund Heading + Logo */}
          <div className="mb-6 flex items-center gap-4">
            <img
              src="https://logo.clearbit.com/sbi.co.in"
              alt="Fund Logo"
              className="w-12 h-12 rounded-md shadow"
            />
            <h1 className="text-2xl font-bold">
              {schemeName || "Mutual Fund Scheme"}
            </h1>
          </div>
  
          {/* GRAPH CARD */}
          <div className="relative w-full h-[450px] rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg p-4">
  
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
            <div className="absolute bottom-3 right-3 flex gap-2">
              {ranges.map((r) => (
                <button
                  key={r.label}
                  onClick={() => setSelectedRange(r.label)}
                  className={`px-3 py-1 text-sm font-medium rounded-2xl border transition
                    ${
                      selectedRange === r.label
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"
                    }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
  
          </div>
        </div>
  
        {/* RIGHT SECTION (card) */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <FundDetailsCard fundMeta={fundMeta} />
          </div>
        </div>
  
      </div>
    </div>
  );
  
}
