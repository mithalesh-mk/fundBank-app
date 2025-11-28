"use client";

import React, { useState, useRef, useEffect } from "react";

interface FilterBarProps {
  onFilterChange?: (filters: any) => void;
}

export default function FiltersBar({ onFilterChange }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    category: "",
    fundhouse: "",
    tag: "",
  });

  const wrapperRef = useRef<HTMLDivElement>(null);

  // ---- CLOSE ON OUTSIDE CLICK ----
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ---- UPDATE FILTER ----
  const updateFilter = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange?.(updatedFilters);
    setOpenDropdown(null);
  };

  // ---- STYLES ----
  const btnStyle =
    "px-4 py-1.5 text-sm rounded-full border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm";

  const dropdownStyle =
    "absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg py-2 z-50";

  const itemStyle =
    "px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition";

  return (
    <div ref={wrapperRef} className="mb-6 flex flex-wrap items-center gap-3">

      {/* ---------- CATEGORY ---------- */}
      <div className="relative">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === "category" ? null : "category")
          }
          className={btnStyle}
        >
          {filters.category || "Categories ▾"}
        </button>

        {openDropdown === "category" && (
          <div className={dropdownStyle}>
            {[
              "Large Cap",
              "Mid Cap",
              "Small Cap",
              "Flexi Cap",
              "ELSS",
              "Sectoral",
            ].map((item) => (
              <div
                key={item}
                className={itemStyle}
                onClick={() => updateFilter("category", item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- FUND HOUSE ---------- */}
      <div className="relative">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === "fundhouse" ? null : "fundhouse")
          }
          className={btnStyle}
        >
          {filters.fundhouse || "Fund House ▾"}
        </button>

        {openDropdown === "fundhouse" && (
          <div className={dropdownStyle}>
            {[
              "SBI Mutual Fund",
              "HDFC Mutual Fund",
              "ICICI Prudential",
              "Kotak Mutual Fund",
              "Axis Mutual Fund",
            ].map((item) => (
              <div
                key={item}
                className={itemStyle}
                onClick={() => updateFilter("fundhouse", item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- EXTRA BUTTON TAGS ---------- */}
      {["Index Only", "Flexi Cap", "4★ & Above"].map((tag) => (
        <button
          key={tag}
          onClick={() => updateFilter("tag", tag)}
          className={`${btnStyle} ${
            filters.tag === tag
              ? "bg-green-600 text-white border-green-700 shadow"
              : ""
          }`}
        >
          {tag}
        </button>
      ))}

      {/* ---------- CLEAR ALL ---------- */}
      <button
        className="ml-auto text-sm text-gray-500 dark:text-gray-400 hover:underline"
        onClick={() => {
          setFilters({ category: "", fundhouse: "", tag: "" });
          onFilterChange?.({ category: "", fundhouse: "", tag: "" });
        }}
      >
        Clear All
      </button>
    </div>
  );
}
