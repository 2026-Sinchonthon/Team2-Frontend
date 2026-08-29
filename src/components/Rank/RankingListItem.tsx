import HeartIcon from "../HeartIcon";

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
      <div className="relative w-[142px] h-[83px] bg-[#D9D9D9] rounded-[16px] shrink-0 overflow-hidden">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur-sm border border-[#f74651] flex items-center justify-center text-[13px] font-bold text-[#f74651] shadow-md">
          {rank}
        </div>
      </div>

      {/* 정보 영역 */}
      <div className="flex flex-col justify-center py-1">
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
