interface RankingListItemProps {
  rank: number;
  name: string;
  address: string;
  imageUrl: string;
}

const RankingListItem = ({
  rank,
  name,
  address,
  imageUrl,
}: RankingListItemProps) => {
  return (
    <div className="flex gap-4 px-5 mb-4">
      {/* 썸네일 영역 */}
      <div className="relative w-[100px] h-[100px] bg-[#D9D9D9] rounded-[16px] shrink-0">
        <button className="absolute top-2 left-2 p-1">
          <img src="/heart.svg" alt="찜하기" className="w-5 h-5" />
        </button>
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col justify-center py-1">
        <div className="w-6 h-6 rounded-full bg-[#E5E5E5] flex items-center justify-center text-[13px] font-bold text-gray-700 mb-1">
          {rank}
        </div>
        <h4 className="text-[16px] font-bold text-gray-900 mb-1">{name}</h4>
        <p className="text-[12px] text-gray-400 flex items-center gap-1">
          <span className="text-red-500">📍</span>
          {address}
        </p>
      </div>
    </div>
  );
};

export default RankingListItem;
