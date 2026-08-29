import { create } from "zustand";

export interface MyPost {
  id: number;
  restaurantName: string;
  address: string;
  tag: string;
  review: string;
  date: string;
}

interface MyPostsState {
  posts: MyPost[];
  addPost: (post: Omit<MyPost, "id" | "date">) => void;
}

const formatToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const useMyPostsStore = create<MyPostsState>((set) => ({
  posts: [],
  addPost: (post) =>
    set((state) => ({
      posts: [{ ...post, id: Date.now(), date: formatToday() }, ...state.posts],
    })),
}));

export default useMyPostsStore;
