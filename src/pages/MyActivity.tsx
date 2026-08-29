import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";
import LikeButton from "../components/LikeButton";
import { MOMIJI_ID } from "../components/RestaurantDetailContent";
import RestaurantDetailModal from "../components/RestaurantDetailModal";
import { mockRestaurants } from "../mocks/restaurants";
import useLikedStore from "../stores/useLikedStore";
import useMyPostsStore, { type MyPost } from "../stores/useMyPostsStore";
import type { Restaurant } from "../types/restaurant";
import iconBack from "../assets/icons/back.svg";

const PREVIEW_COUNT = 2;

function MyActivity() {
  const navigate = useNavigate();
  const likedIds = useLikedStore((state) => state.likedIds);
  const toggleLike = useLikedStore((state) => state.toggleLike);
  const posts = useMyPostsStore((state) => state.posts);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [selectedPost, setSelectedPost] = useState<MyPost | null>(null);

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
        내 활동
      </h1>

      <div className="absolute left-0 right-0 top-[122px] flex flex-col gap-8 px-[22px] pb-6">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">찜한 맛집</h2>
            <Link
              to="/mypage/liked"
              className="flex items-center gap-1 text-xs text-[#bcbbba]"
            >
              전체보기
              <img src={iconBack} alt="" className="size-4 -scale-x-100" />
            </Link>
          </div>

          <ul className="mt-4 flex flex-col gap-6">
            {likedRestaurants.slice(0, PREVIEW_COUNT).map((restaurant) => (
              <li
                key={restaurant.id}
                onClick={() => setSelectedRestaurant(restaurant)}
                className="flex cursor-pointer gap-5"
              >
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
              <li className="py-4 text-center text-sm text-gray-400">
                찜한 맛집이 없습니다.
              </li>
            )}
          </ul>
        </section>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">내가 추가한 맛집</h2>
            <Link
              to="/mypage/posts"
              className="flex items-center gap-1 text-xs text-[#bcbbba]"
            >
              전체보기
              <img src={iconBack} alt="" className="size-4 -scale-x-100" />
            </Link>
          </div>

          <ul className="mt-4 flex flex-col gap-6">
            {posts.slice(0, PREVIEW_COUNT).map((post) => (
              <li
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="flex cursor-pointer gap-5"
              >
                <div className="relative h-[83px] w-[142px] shrink-0 rounded-[10px] bg-gray-200">
                  <div className="absolute left-3 top-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
                    <HeartIcon filled={false} />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-[18px] font-bold text-[#1f1c1a]">
                    {post.restaurantName}
                  </p>
                  <p className="mt-1 text-xs text-[#bcbbba]">{post.date}</p>
                </div>
              </li>
            ))}
            {posts.length === 0 && (
              <li className="py-4 text-center text-sm text-gray-400">
                작성한 글이 없습니다.
              </li>
            )}
          </ul>
        </section>
      </div>

      {selectedRestaurant && (
        <RestaurantDetailModal
          name={selectedRestaurant.name}
          tag={selectedRestaurant.tag}
          description={selectedRestaurant.description}
          address={selectedRestaurant.address}
          showGallery={selectedRestaurant.id === MOMIJI_ID}
          liked={likedIds.has(selectedRestaurant.id)}
          onToggleLike={() => toggleLike(selectedRestaurant.id)}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}

      {selectedPost && (
        <RestaurantDetailModal
          name={selectedPost.restaurantName}
          tag={selectedPost.tag}
          description={selectedPost.review}
          address={selectedPost.address}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

export default MyActivity;
