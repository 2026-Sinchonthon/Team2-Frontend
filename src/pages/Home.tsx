import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import LikeButton from "../components/LikeButton";
import RestaurantMap from "../components/RestaurantMap";
import { mockRestaurants } from "../mocks/restaurants";
import type { Restaurant } from "../types/restaurant";
import iconBack from "../assets/icons/back.svg";
import iconPlus from "../assets/icons/plus.svg";
import iconSearch from "../assets/icons/search.svg";

const UNIVERSITIES = [
  "명지대학교",
  "서강대학교",
  "이화여자대학교",
  "연세대학교",
  "홍익대학교",
];

const MAP_CENTER = { lat: 37.5595, lng: 126.9385 };

const BOTTOM_NAV_HEIGHT = 64;
const DEFAULT_SHEET_HEIGHT = 387;
const MIN_SHEET_HEIGHT = 160;
const MAX_SHEET_HEIGHT = 640;
// 디자인상 + 버튼 하단과 시트 상단 사이의 간격
const ADD_BUTTON_GAP = 19;

function Home() {
  const [keyword, setKeyword] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(UNIVERSITIES[0]);
  const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [sheetHeight, setSheetHeight] = useState(DEFAULT_SHEET_HEIGHT);
  const dragRef = useRef<{ startY: number; startHeight: number } | null>(null);

  const handleSheetDragStart = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startY: e.clientY, startHeight: sheetHeight };
  };

  const handleSheetDragMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const deltaY = e.clientY - dragRef.current.startY;
    const nextHeight = dragRef.current.startHeight - deltaY;
    setSheetHeight(
      Math.min(MAX_SHEET_HEIGHT, Math.max(MIN_SHEET_HEIGHT, nextHeight)),
    );
  };

  const handleSheetDragEnd = () => {
    dragRef.current = null;
  };

  const chipScrollRef = useRef<HTMLDivElement>(null);

  const handleChipWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = chipScrollRef.current;
    if (!el) return;
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
    }
  };

  const toggleLike = (id: number) => {
    setLikedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const mapRestaurants = useMemo(() => {
    const trimmed = keyword.trim();
    if (!trimmed) return mockRestaurants;

    return mockRestaurants.filter(
      (restaurant) =>
        restaurant.name.includes(trimmed) ||
        restaurant.category.includes(trimmed),
    );
  }, [keyword]);

  const listRestaurants = useMemo(
    () =>
      mapRestaurants.filter(
        (restaurant) => restaurant.university === selectedUniversity,
      ),
    [mapRestaurants, selectedUniversity],
  );

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <div className="absolute inset-0">
        <RestaurantMap restaurants={mapRestaurants} center={MAP_CENTER} />
      </div>

      <div className="absolute left-1/2 top-[82px] z-10 h-[56px] w-[345px] -translate-x-1/2">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색"
          className="h-full w-full rounded-full border-2 border-[#bcbbba] bg-white pl-5 pr-12 text-base outline-none placeholder:text-gray-400"
        />
        <img
          src={iconSearch}
          alt=""
          className="pointer-events-none absolute right-4 top-1/2 size-[24px] -translate-y-1/2"
        />
      </div>

      <div
        ref={chipScrollRef}
        className="absolute left-0 right-0 top-[148px] z-10 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onWheel={handleChipWheel}
      >
        {UNIVERSITIES.map((university) => (
          <button
            key={university}
            type="button"
            onClick={() => {
              setSelectedUniversity(university);
              setSelectedRestaurant(null);
            }}
            className={`shrink-0 select-none whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold shadow-md ${
              selectedUniversity === university
                ? "bg-[#f74651] text-white"
                : "bg-white text-black"
            }`}
          >
            {university}
          </button>
        ))}
      </div>

      <Link
        to="/add"
        className="absolute right-6 z-10 flex size-[50px] items-center justify-center rounded-full bg-white shadow-md"
        style={{
          bottom: BOTTOM_NAV_HEIGHT + sheetHeight + ADD_BUTTON_GAP,
        }}
        aria-label="맛집 추가"
      >
        <img src={iconPlus} alt="" className="size-[24px]" />
      </Link>

      <div
        className="absolute bottom-[64px] left-0 right-0 z-10 flex flex-col overflow-hidden rounded-t-[20px] bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)]"
        style={{ height: sheetHeight, maxHeight: "80vh" }}
      >
        <div
          className="flex shrink-0 cursor-grab touch-none justify-center py-3 active:cursor-grabbing"
          onPointerDown={handleSheetDragStart}
          onPointerMove={handleSheetDragMove}
          onPointerUp={handleSheetDragEnd}
          onPointerCancel={handleSheetDragEnd}
        >
          <div className="h-[5px] w-[79px] rounded-full bg-[#d2d2d1]" />
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          {selectedRestaurant ? (
            <div className="relative px-4 pt-[28px]">
              <button
                type="button"
                onClick={() => setSelectedRestaurant(null)}
                aria-label="뒤로 가기"
                className="absolute left-2 top-[29px]"
              >
                <img src={iconBack} alt="" className="size-[24px]" />
              </button>

              <div className="relative flex justify-center">
                <span className="inline-block rounded-full bg-[#f74651] px-2.5 py-1 text-xs font-semibold text-white">
                  {selectedRestaurant.category}
                </span>
                <div className="absolute right-0 top-0">
                  <LikeButton
                    liked={likedIds.has(selectedRestaurant.id)}
                    onToggle={() => toggleLike(selectedRestaurant.id)}
                  />
                </div>
              </div>
              <p className="mt-1 text-center text-[18px] font-bold text-[#1f1c1a]">
                {selectedRestaurant.name}
              </p>
              <p className="mt-1 text-center text-sm text-[#8f8e8d]">
                {selectedRestaurant.description}
              </p>
              <p className="mt-1 text-center text-xs text-[#bcbbba]">
                📍 {selectedRestaurant.address}
              </p>
              <p className="mt-5 text-center text-sm text-[#353331]">
                {selectedRestaurant.detail}
              </p>

              <div className="mt-6 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-[104px] w-[142px] shrink-0 rounded-[10px] bg-gray-200"
                  />
                ))}
              </div>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-7 px-4 pt-2">
                {listRestaurants.map((restaurant) => (
                  <li
                    key={restaurant.id}
                    onClick={() => setSelectedRestaurant(restaurant)}
                    className="flex cursor-pointer gap-5"
                  >
                    <div className="relative h-[104px] w-[142px] shrink-0 rounded-[10px] bg-gray-200">
                      <div className="absolute left-3 top-3">
                        <LikeButton
                          liked={likedIds.has(restaurant.id)}
                          onToggle={() => toggleLike(restaurant.id)}
                        />
                      </div>
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-[#f74651] px-2.5 py-1 text-xs font-semibold text-white">
                        {restaurant.category}
                      </span>
                      <p className="mt-1.5 text-[18px] font-bold text-[#1f1c1a]">
                        {restaurant.name}
                      </p>
                      <p className="mt-1 text-sm text-[#8f8e8d]">
                        {restaurant.description}
                      </p>
                      <p className="mt-2 text-xs text-[#bcbbba]">
                        📍 {restaurant.address}
                      </p>
                    </div>
                  </li>
                ))}
                {listRestaurants.length === 0 && (
                  <li className="py-6 text-center text-sm text-gray-400">
                    검색 결과가 없습니다.
                  </li>
                )}
              </ul>
            </>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Home;
