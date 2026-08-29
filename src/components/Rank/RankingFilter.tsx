interface RankingFilterProps {
  categories: string[];
  selectedSchool: string;
  onSelect: (category: string) => void;
}

const RankingFilter = ({
  categories,
  selectedSchool,
  onSelect,
}: RankingFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 px-5">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-1.5 rounded-full text-[14px] whitespace-nowrap transition-colors ${
            selectedSchool === category
              ? "bg-[#333333] text-white"
              : "bg-white text-gray-800 border border-gray-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default RankingFilter;
