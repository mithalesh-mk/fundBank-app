export interface Category {
  name: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    name: "Finance Basics",
    subcategories: ["NAV Meaning", "Mutual Funds 101", "Compounding Power"],
  },
  {
    name: "FundBank Features",
    subcategories: ["SIP Calculator", "SWP Guide", "Fund Comparison"],
  },
  {
    name: "Advanced Investing",
    subcategories: ["Risk Management", "Portfolio Building", "Tax Saving Funds"],
  },
];
