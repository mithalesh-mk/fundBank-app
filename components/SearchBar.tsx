"use client";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full w-full">
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search mutual funds..."
        className="ml-2 bg-transparent focus:outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
