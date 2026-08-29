import { useNavigate } from "react-router-dom";
import LikeButton from "../components/LikeButton";
import { mockRestaurants } from "../mocks/restaurants";
import useLikedStore from "../stores/useLikedStore";
import iconBack from "../assets/icons/back.svg";

function LikedRestaurants() {
  const navigate = useNavigate();
  const likedIds = useLikedStore((state) => state.likedIds);
  const toggleLike = useLikedStore((state) => state.toggleLike);

  const likedRestaurants = mockRestaurants.filter((restaurant) =>
    likedIds.has(restaurant.id),
  );

  return (
    <div className="relative h-full w-full bg-white">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로 가기"
        className="absolute left-[17px] top-[70px] z-10"
      >
        <img src={iconBack} alt="" className="size-6" />
      </button>
      <h1 className="absolute left-1/2 top-[68px] -translate-x-1/2 text-[20px] font-bold">
        찜한 맛집
      </h1>

      <ul className="no-scrollbar absolute bottom-0 left-0 right-0 top-[122px] flex flex-col gap-6 overflow-y-auto px-6 pb-6">
        {likedRestaurants.map((restaurant) => (
          <li key={restaurant.id} className="flex gap-5">
            <div className="relative h-[83px] w-[142px] shrink-0 rounded-[10px] bg-gray-200">
              <div className="absolute left-3 top-3">
                <LikeButton
                  liked={likedIds.has(restaurant.id)}
                  onToggle={() => toggleLike(restaurant.id)}
                />
              </div>
            </div>
            <div className="min-w-0">
              <p className="text-[18px] font-bold text-[#1f1c1a]">
                {restaurant.name}
              </p>
              <p className="mt-1 text-xs text-[#bcbbba]">
                📍 {restaurant.address}
              </p>
            </div>
          </li>
        ))}
        {likedRestaurants.length === 0 && (
          <li className="py-6 text-center text-sm text-gray-400">
            찜한 맛집이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}

export default LikedRestaurants;
