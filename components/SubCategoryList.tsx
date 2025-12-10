import Link from "next/link";

interface SubCategoryListProps {
  isOpen: boolean;
  subcategories: string[];
  categoryName: string;
}

export default function SubCategoryList({
  isOpen,
  subcategories,
  categoryName,
}: SubCategoryListProps) {
  return (
    <div
      className={`
        overflow-hidden transition-all duration-300
        ${isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"}
      `}
    >
      {subcategories.map((sub, idx) => (
        <Link
          key={idx}
          href={`/learn/${categoryName.toLowerCase()}/${sub
            .toLowerCase()
            .replace(/ /g, "-")}`}
        >
          <div
            className="py-3 pl-4 pr-2 
              border-b border-gray-300 dark:border-gray-700
              text-gray-800 dark:text-gray-200
              cursor-pointer transition
              hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {sub}
          </div>
        </Link>
      ))}
    </div>
  );
}
