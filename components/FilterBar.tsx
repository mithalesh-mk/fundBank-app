'use client';

import { ChevronDown, ChevronRight, DropletIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

interface FilterBarProps {
  filters: any;
  setFilters: (filters: any) => void;
  applyFilters: () => void;
}


interface Categories {
  [key: string]: string[];
}

const categories: Categories = {
  Equity: [
    'Multi Cap Fund',
    'Large Cap Fund',
    'Large & Mid Cap Fund',
    'Mid Cap Fund',
    'Small Cap Fund',
    'ELSS',
    'Dividend Yield Fund',
    'Sectoral/Thematic',
    'Contra Fund',
    'Focused Fund',
    'Value Fund',
    'Flexi Cap Fund',
  ],

  Hybrid: [
    'Aggressive Hybrid Fund',
    'Conservative Hybrid Fund',
    'Arbitrage Fund',
    'Equity Savings',
    'Dynamic Asset Allocation or Balanced Advantage',
  ],

  Debt: [
    'Low Duration Fund',
    'Short Duration Fund',
    'Medium Duration Fund',
    'Medium to Long Duration Fund',
    'Long Duration Fund',
    'Dynamic Bond Fund',
    'Gilt Fund',
    'Gilt Fund with 10 year constant duration',
    'Corporate Bond Fund',
    'Credit Risk Fund',
    'Floater Fund',
    'Banking and PSU Fund',
    'Fixed Maturity Plans - Debt',
    'Interval Plans',
    'Ultra Short Duration Fund',
    'Liquid Fund',
    'Money Market Fund',
    'Overnight Fund',
    'Target Maturity Fund',
  ],

  'Solution Oriented': [
    'Childrens Fund',
    'Retirement Fund',
    'Investment cum Insurance',
  ],

  Others: ['Fund of Funds', 'Index Funds/ETFs'],
};

// ---- STYLES ----
const btnStyle =
  'cursor-pointer px-4 py-2 text-sm rounded-full border bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition select-none';

const dropdownStyle =
  'absolute left-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg py-2 z-50';

const itemStyle =
  'px-4 py-2 text-sm flex  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition';

export default function FiltersBar({ setFilters,applyFilters,filters}: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);


  const wrapperRef = useRef<HTMLDivElement>(null);

  // ---- CLOSE ON OUTSIDE CLICK ----
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ---- UPDATE FILTER ----
  const updateFilter = (key: string, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    setOpenDropdown(null);
  };

  const isAllSelected = (parent: string) => {
    const subs = categories[parent];
    return subs.every((sub) => filters.category.includes(sub));
  };

  const toggleParent = (parent: string) => {
    const subs = categories[parent];
    const allSelected = isAllSelected(parent);

    let newList;

    if (allSelected) {
      // remove all subcategories
      newList = filters.category.filter((c) => !subs.includes(c));
    } else {
      // add missing subcategories
      const missing = subs.filter((c) => !filters.category.includes(c));
      newList = [...filters.category, ...missing];
    }

    const updated = { ...filters, category: newList };
    setFilters(updated);
  };

  const toggleSubCategory = (sub: string) => {
    const exists = filters.category.includes(sub);

    const updatedList = exists
      ? filters.category.filter((c) => c !== sub)
      : [...filters.category, sub];

    const updated = { ...filters, category: updatedList };
    setFilters(updated);
  };

  return (
    <div ref={wrapperRef} className="mb-6 flex flex-wrap items-center gap-3">
      {/* ---------- CATEGORY ---------- */}
      <div className="relative">
        <div
          onClick={() =>
            setOpenDropdown(openDropdown === 'category' ? null : 'category')
          }
          className={btnStyle}
        >
          {filters.category.length > 0
            ? `${filters.category.length} selected`
            : 'Categories'}
          <ChevronDown className="inline-block w-4 h-4 ml-1 mb-0.5" />
        </div>

        {openDropdown === 'category' && (
  <div className="absolute mt-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 shadow-lg z-50 flex overflow-hidden">
    
    {/* LEFT PANEL - Parent Categories */}
    <div className="w-56 border-r border-gray-200 dark:border-gray-700 py-2">
      {Object.keys(categories).map((parent) => {
        const checked = isAllSelected(parent);

        return (
          <div
            key={parent}
            className="px-4 py-2 flex items-center justify-between text-sm cursor-pointer
                       hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            onClick={() => setActiveCategory(parent)}
          >
            <div className="flex items-center gap-3">
              <Checkbox
                checked={checked}
                onChange={() => toggleParent(parent)}
              />
              <span className="text-gray-700 dark:text-gray-300">{parent}</span>
            </div>

            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        );
      })}

      {/* APPLY BUTTON */}
      <button
        className="m-3 w-[85%] px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
        onClick={() => {
          applyFilters();
          setOpenDropdown(null);
        }}
      >
        Apply Filters
      </button>
    </div>

    {/* RIGHT PANEL — Subcategories */}
    {activeCategory && (
      <div
        className="w-64 max-h-72 overflow-y-auto py-2
          [&::-webkit-scrollbar]:w-2
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {categories[activeCategory].map((sub) => {
          const checked = filters.category.includes(sub);

          return (
            <div
              key={sub}
              className="px-4 py-2 flex items-center gap-3 text-sm cursor-pointer 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={(e) => {
                e.stopPropagation();
                toggleSubCategory(sub);
              }}
            >
              <Checkbox checked={checked} onChange={() => toggleSubCategory(sub)} />

              <span className="text-gray-700 dark:text-gray-300">{sub}</span>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}

      </div>

      {/* ---------- FUND HOUSE ---------- */}
      <div className="relative">
        <button
          onClick={() =>
            setOpenDropdown(openDropdown === 'fundhouse' ? null : 'fundhouse')
          }
          className={btnStyle}
        >
          {filters.fundhouse || 'Fund House ▾'}
        </button>

        {openDropdown === 'fundhouse' && (
          <div className={dropdownStyle}>
            {[
              'SBI Mutual Fund',
              'HDFC Mutual Fund',
              'ICICI Prudential',
              'Kotak Mutual Fund',
              'Axis Mutual Fund',
            ].map((item) => (
              <div
                key={item}
                className={itemStyle}
                onClick={() => updateFilter('fundhouse', item)}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- EXTRA BUTTON TAGS ---------- */}
      {['Index Only', 'Flexi Cap', '4★ & Above'].map((tag) => (
        <button
          key={tag}
          onClick={() => updateFilter('tag', tag)}
          className={`${btnStyle} ${
            filters.tag === tag
              ? 'bg-green-600 text-white border-green-700 shadow'
              : ''
          }`}
        >
          {tag}
        </button>
      ))}

      {/* ---------- CLEAR ALL ---------- */}
      <button
        className="ml-auto text-sm text-gray-500 dark:text-gray-400 hover:underline"
        onClick={() => {
          setFilters({ category: [], fundhouse: '', tag: '' });
          onFilterChange?.({ category: '', fundhouse: '', tag: '' });
        }}
      >
        Clear All
      </button>
    </div>
  );
}

const Checkbox = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) => (
  <div
    onClick={(e) => {
      e.stopPropagation();
      onChange();
    }}
    className={`w-4 h-4 rounded border flex items-center justify-center cursor-pointer transition 
      ${
        checked
          ? 'bg-green-600 border-green-600'
          : 'border-gray-400 dark:border-gray-600'
      }`}
  >
    {checked && (
      <svg
        className="w-3 h-3 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        viewBox="0 0 24 24"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    )}
  </div>
);
