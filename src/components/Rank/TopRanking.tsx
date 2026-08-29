import { useState } from "react";

interface TopRankItem {
  id: number;
  name: string;
  subtitle?: string;
  imageUrl: string;
}

interface TopRankingProps {
  top3: TopRankItem[];
}

const TopRanking = ({ top3 }: TopRankingProps) => {
  // 0: 2위(왼쪽), 1: 1위(중앙 - 기본값), 2: 3위(오른쪽)
  const [activeIndex, setActiveIndex] = useState(1);

  // 데이터가 없거나 3개가 안 되면 에러 없이 빈 화면(또는 로딩) 처리
  if (!top3 || top3.length < 3) {
    return (
      <div className="h-[200px] flex items-center justify-center text-gray-400">
        데이터를 불러오는 중...
      </div>
    );
  }

  // 데이터가 확실히 있을 때만 접근하므로 에러가 발생하지 않습니다.
  const reordered = [top3[1], top3[0], top3[2]];
  const ranks = [2, 1, 3];

  const offset = 1 - activeIndex;

  return (
    <div className="px-5 mb-8 overflow-x-hidden pb-16">
      <div
        className="flex items-end justify-center gap-3 transition-transform duration-500 ease-out w-full h-[200px]"
        style={{
          transform: `translateX(calc(${offset} * (100% / 3 + 4px)))`,
        }}
      >
        {reordered.map((item, index) => {
          const rank = ranks[index];
          const isCenter = index === activeIndex;

          return (
            <div
              key={item?.id || index}
              onClick={() => setActiveIndex(index)}
              className="flex flex-col items-center flex-1 shrink-0 cursor-pointer"
            >
              <div className="relative w-full flex flex-col items-center">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold mb-2 z-10 shadow-sm transition-colors duration-300 ${
                    isCenter
                      ? "bg-gray-800 text-white"
                      : "bg-[#D9D9D9] text-gray-700"
                  }`}
                >
                  {rank}
                </div>

                <div
                  className={`w-[135px] bg-[#D9D9D9] rounded-[20px] object-cover transition-all duration-500 ease-out h-[145px] ${isCenter ? "mb-2" : ""}`}
                />

                <div
                  className={`absolute top-full mt-4 w-[200%] text-center transition-all duration-500 ease-out ${
                    isCenter
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <h3 className="font-bold text-[16px] text-gray-900">
                    {item?.name}
                  </h3>
                  <p className="text-[12px] text-gray-500 mt-1">
                    {item?.subtitle}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRanking;
