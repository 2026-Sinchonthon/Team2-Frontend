import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPlacesByKeyword, type KakaoPlace } from "../api/kakaoLocal";
import useMyPostsStore from "../stores/useMyPostsStore";
import { RESTAURANT_TAGS } from "../types/restaurant";
import iconBack from "../assets/icons/back.svg";
import iconSearch from "../assets/icons/search.svg";

const REVIEW_MAX_LENGTH = 30;

function AddRestaurant() {
  const navigate = useNavigate();
  const addPost = useMyPostsStore((state) => state.addPost);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<KakaoPlace | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [review, setReview] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const trimmedQuery = query.trim();
    const places = await searchPlacesByKeyword(trimmedQuery);
    setResults(
      places.filter(
        (place) =>
          place.addressName.startsWith("서울") &&
          place.placeName.includes(trimmedQuery),
      ),
    );
    setHasSearched(true);
  };

  const handleBack = () => {
    if (selectedPlace) {
      setSelectedPlace(null);
      return;
    }
    navigate(-1);
  };

  const handleRegister = () => {
    if (!selectedPlace || !selectedTag || !review.trim()) return;

    // TODO: 백엔드 등록 API 연동
    addPost({
      restaurantName: selectedPlace.placeName,
      address: selectedPlace.roadAddressName || selectedPlace.addressName,
      tag: selectedTag,
      review,
    });

    navigate("/");
  };

  return (
    <div className="relative h-full w-full bg-white">
      <button
        type="button"
        onClick={handleBack}
        aria-label="뒤로 가기"
        className="absolute left-[17px] top-[70px] z-10 cursor-pointer"
      >
        <img src={iconBack} alt="" className="size-[24px]" />
      </button>
      <h1 className="absolute left-1/2 top-[68px] -translate-x-1/2 text-[20px] font-bold">
        맛집 추가
      </h1>

      <div className="absolute left-1/2 top-[122px] h-[56px] w-[345px] -translate-x-1/2">
        {selectedPlace ? (
          <div className="flex h-full w-full items-center rounded-full border-2 border-[#bcbbba] bg-white px-5 text-base text-black">
            {selectedPlace.placeName}
          </div>
        ) : (
          <form onSubmit={handleSearch} className="h-full w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setHasSearched(false);
              }}
              placeholder="맛집 검색"
              className="h-full w-full rounded-full border-2 border-[#bcbbba] bg-white pl-5 pr-12 text-base outline-none placeholder:text-black/30"
            />
            <button
              type="submit"
              aria-label="검색"
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <img src={iconSearch} alt="" className="size-[24px]" />
            </button>
          </form>
        )}
      </div>

      {selectedPlace ? (
        <div className="absolute left-1/2 top-[214px] w-[345px] -translate-x-1/2">
          <h2 className="text-[16px] font-semibold">태그 선택</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {RESTAURANT_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`rounded-full border-2 px-4 py-2.5 text-sm font-medium ${
                  selectedTag === tag
                    ? "border-[#f74651] bg-white text-[#f74651]"
                    : "border-transparent bg-[#f5f5f5] text-black"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <h2 className="mt-8 text-[16px] font-semibold">한줄 리뷰</h2>
          <div className="relative mt-3 h-[149px] w-full rounded-[20px] border-2 border-[#bcbbba]">
            <textarea
              value={review}
              onChange={(e) =>
                setReview(e.target.value.slice(0, REVIEW_MAX_LENGTH))
              }
              placeholder="이 맛집을 한줄로 소개해주세요"
              maxLength={REVIEW_MAX_LENGTH}
              className="size-full resize-none rounded-[20px] p-5 pb-8 text-base outline-none placeholder:text-black/30"
            />
            <span className="absolute bottom-3 right-4 text-sm text-black/30">
              {review.length}/{REVIEW_MAX_LENGTH}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRegister}
            disabled={!selectedTag || !review.trim()}
            className="mt-10 h-[56px] w-full rounded-[20px] bg-[#353331] text-[15px] font-semibold text-white disabled:opacity-40"
          >
            등록
          </button>
        </div>
      ) : (
        <ul className="no-scrollbar absolute bottom-0 left-0 right-0 top-[198px] flex flex-col gap-4 overflow-y-auto px-6 pb-6">
          {results.map((place) => (
            <li
              key={place.id}
              onClick={() => setSelectedPlace(place)}
              className="flex cursor-pointer gap-5"
            >
              <div className="h-[83px] w-[142px] shrink-0 rounded-[10px] bg-gray-200" />
              <div className="min-w-0">
                <p className="text-[18px] font-bold text-[#1f1c1a]">
                  {place.placeName}
                </p>
                <p className="mt-1 text-xs text-[#bcbbba]">
                  📍 {place.roadAddressName || place.addressName}
                </p>
              </div>
            </li>
          ))}
          {hasSearched && results.length === 0 && (
            <li className="py-6 text-center text-sm text-gray-400">
              검색 결과가 없습니다.
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default AddRestaurant;
