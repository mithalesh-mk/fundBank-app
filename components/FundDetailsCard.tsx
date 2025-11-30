"use client";
import React from "react";
import {
  Home,
  FolderKanban,
  Layers,
  Hash,
  FileCode2,
  Code2,
} from "lucide-react";

interface FundMeta {
  fund_house: string;
  scheme_type: string;
  scheme_category: string;
  scheme_code: number;
  scheme_name: string;
  isin_growth: string;
  isin_div_reinvestment: string;
}

interface FundDetailsCardProps {
  fundMeta: FundMeta | null;
}

export default function FundDetailsCard({ fundMeta }: FundDetailsCardProps) {
  if (!fundMeta) {
    return (
      <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300">No fund metadata available.</p>
      </div>
    );
  }

  const details = [
    { label: "Fund House", value: fundMeta.fund_house, icon: <Home className="w-4 h-4" /> },
    { label: "Scheme Type", value: fundMeta.scheme_type, icon: <FolderKanban className="w-4 h-4" /> },
    { label: "Scheme Category", value: fundMeta.scheme_category, icon: <Layers className="w-4 h-4" /> },
    { label: "Scheme Code", value: fundMeta.scheme_code, icon: <Hash className="w-4 h-4" /> },
    { label: "ISIN (Growth)", value: fundMeta.isin_growth, icon: <FileCode2 className="w-4 h-4" /> },
    { label: "ISIN (Div Reinvestment)", value: fundMeta.isin_div_reinvestment, icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800 transition-all">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          📄 Fund Details
        </h2>
      </div>

      {/* Scheme Name */}
      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        {fundMeta.scheme_name}
      </p>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className="mt-1 text-gray-600 dark:text-gray-300">
              {item.icon}
            </div>

            <div>
              <p className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wide">
                {item.label}
              </p>
              <p className="text-gray-900 dark:text-gray-200 font-medium mt-0.5 break-words">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
