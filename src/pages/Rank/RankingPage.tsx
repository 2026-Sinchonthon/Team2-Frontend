import { useState } from "react";
import RankingFilter from "../../components/Rank/RankingFilter";
import TopRanking from "../../components/Rank/TopRanking";
import RankingListItem from "../../components/Rank/RankingListItem";
import momijiDish from "../../assets/images/momiji-dish.jpg";

const CATEGORIES = ["전체", "홍익대", "연세대", "서강대", "이화여대", "명지대"];

export const normalizeUnivName = (name: string): string => {
  const cleanName = name.replace(/\s+/g, "").toLowerCase();

  if (
    ["홍익대", "홍익대학교", "hongik", "hongikuniversity"].includes(cleanName)
  ) {
    return "홍익대";
  }
  if (
    ["연세대", "연세대학교", "yonsei", "yonseiuniversity"].includes(cleanName)
  ) {
    return "연세대";
  }
  if (
    ["서강대", "서강대학교", "sogang", "soganguniversity"].includes(cleanName)
  ) {
    return "서강대";
  }
  if (
    [
      "이화여대",
      "이화여자대학교",
      "이대",
      "ewha",
      "ewhawomansuniversity",
    ].includes(cleanName)
  ) {
    return "이화여대";
  }
  if (
    ["명지대", "명지대학교", "myongji", "myongjiuniversity"].includes(cleanName)
  ) {
    return "명지대";
  }

  return name;
};

// 서버에서 받아올 전체 랭킹 데이터라고 가정하고 하나로 합쳤습니다.
// 필터 테스트를 위해 학교 데이터를 골고루 섞어두었습니다.
const ALL_MOCK_DATA = [
  {
    id: 1,
    name: "모미지식당",
    subtitle: "이대생이 인정한 육회덮밥 맛집",
    address: "서울 서대문구 이화여대7길 41",
    school: "이화여대",
    imageUrl: momijiDish,
  },
  {
    id: 2,
    name: "가야가야",
    subtitle: "돈코츠 라멘",
    address: "서울 서대문구 이화여대5길",
    school: "이화여대",
    imageUrl: "",
  },
  {
    id: 3,
    name: "포포나무",
    subtitle: "양식 맛집",
    address: "서울 서대문구 이화여대길",
    school: "이화여대",
    imageUrl: "",
  },
  {
    id: 4,
    name: "카미야",
    subtitle: "홍대생의 소울푸드 돈까스",
    address: "서울 마포구 와우산로21길",
    school: "홍익대학교",
    imageUrl: "",
  }, // 정규화 테스트용
  {
    id: 5,
    name: "우동가조쿠",
    subtitle: "붓가케 우동",
    address: "서울 마포구 홍익로",
    school: "hongik",
    imageUrl: "",
  }, // 정규화 테스트용
  {
    id: 6,
    name: "삭",
    subtitle: "떡볶이 튀김 진리",
    address: "서울 마포구 와우산로",
    school: "홍익대",
    imageUrl: "",
  },
  {
    id: 7,
    name: "독수리다방",
    subtitle: "뷰 맛집 카페",
    address: "서울 서대문구 연세로",
    school: "연세대",
    imageUrl: "",
  },
];

const RankingPage = () => {
  const [selectedSchool, setSelectedSchool] = useState("전체");

  const filteredData = ALL_MOCK_DATA.filter((item) => {
    if (selectedSchool === "전체") return true;

    return normalizeUnivName(item.school) === selectedSchool;
  });

  // 2. 필터링된 데이터에서 1~3위는 포디움으로, 4위 이하는 리스트로 나눕니다.
  const displayTop3 = filteredData.slice(0, 3);
  const displayList = filteredData.slice(3);

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="pt-12 pb-4 text-center">
        <h1 className="text-[18px] font-bold text-gray-900">랭킹</h1>
      </header>

      <RankingFilter
        categories={CATEGORIES}
        selectedSchool={selectedSchool}
        onSelect={setSelectedSchool}
      />

      <div className="mt-9">
        {/* 선택한 학교의 데이터가 3개 미만일 때 UI가 깨지지 않도록 방어 코드 추가 */}
        {displayTop3.length >= 3 ? (
          <TopRanking top3={displayTop3} />
        ) : (
          <div className="h-[180px] flex items-center justify-center text-sm text-gray-400">
            {selectedSchool}의 상위 랭킹 데이터가 부족합니다.
          </div>
        )}
      </div>

      <div className="mt-8">
        {displayList.map((item, index) => (
          <RankingListItem
            key={item.id}
            rank={index + 4} // Top3 다음이므로 4등부터 시작
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
