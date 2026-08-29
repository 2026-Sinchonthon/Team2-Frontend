import { useState } from "react";
import RankingFilter from "../../components/Rank/RankingFilter";
import TopRanking from "../../components/Rank/TopRanking";
import RankingListItem from "../../components/Rank/RankingListItem";

const CATEGORIES = ["전체", "연세대", "서강대", "이화여대", "명지대"];

// 임시 데이터
const MOCK_TOP3 = [
  {
    id: 1,
    name: "모미지식당",
    subtitle: "이대생이 인정한 육회덮밥 맛집",
    imageUrl: "",
  },
  { id: 2, name: "가야가야", subtitle: "돈코츠 라멘", imageUrl: "" },
  { id: 3, name: "포포나무", subtitle: "양식 맛집", imageUrl: "" },
];

const MOCK_LIST = [
  {
    id: 4,
    name: "모미지식당",
    address: "서울특별시 서대문구 이화여대7길 41",
    imageUrl: "",
  },
  {
    id: 5,
    name: "모미지식당",
    address: "서울특별시 서대문구 이화여대7길 41",
    imageUrl: "",
  },
  {
    id: 6,
    name: "모미지식당",
    address: "서울특별시 서대문구 이화여대7길 41",
    imageUrl: "",
  },
];

const RankingPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 헤더 */}
      <header className="pt-12 pb-4 text-center">
        <h1 className="text-[18px] font-bold text-gray-900">랭킹</h1>
      </header>

      {/* 카테고리 필터 */}
      <RankingFilter
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* 1, 2, 3위 포디움 */}
      <div className="mt-20">
        <TopRanking top3={MOCK_TOP3} />
      </div>

      {/* 4위 이하 리스트 */}
      <div className="mt-8">
        {MOCK_LIST.map((item, index) => (
          <RankingListItem
            key={item.id}
            rank={index + 4}
            name={item.name}
            address={item.address}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default RankingPage;
