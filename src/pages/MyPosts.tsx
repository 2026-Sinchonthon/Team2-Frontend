import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";
import RestaurantDetailModal from "../components/RestaurantDetailModal";
import useMyPostsStore, { type MyPost } from "../stores/useMyPostsStore";
import iconBack from "../assets/icons/back.svg";

function MyPosts() {
  const navigate = useNavigate();
  const posts = useMyPostsStore((state) => state.posts);
  const [selectedPost, setSelectedPost] = useState<MyPost | null>(null);

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
        내가 추가한 맛집
      </h1>

      <ul className="no-scrollbar absolute bottom-0 left-0 right-0 top-[122px] flex flex-col gap-6 overflow-y-auto px-6 pb-6">
        {posts.map((post) => (
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
          <li className="py-6 text-center text-sm text-gray-400">
            작성한 글이 없습니다.
          </li>
        )}
      </ul>

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

export default MyPosts;
