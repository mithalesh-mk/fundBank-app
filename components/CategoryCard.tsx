interface CategoryCardProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
}

export default function CategoryCard({
  title,
  isOpen,
  onClick,
}: CategoryCardProps) {
  return (
    <div
      onClick={onClick}
      className={` h-[10vh] flex items-center justify-between px-6
        cursor-pointer rounded-lg shadow-md border
        bg-gray-100 dark:bg-gray-800 
        border-gray-300 dark:border-gray-700
        transition-all duration-300
        hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700`}
    >
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h2>

      {/* Arrow */}
      <span
        className={`transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        } text-gray-700 dark:text-gray-300`}
      >
        ▼
      </span>
    </div>
  );
}
