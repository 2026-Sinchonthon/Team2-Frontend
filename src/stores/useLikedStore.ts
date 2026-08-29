import { create } from "zustand";

interface LikedState {
  likedIds: Set<number>;
  toggleLike: (id: number) => void;
}

const useLikedStore = create<LikedState>((set) => ({
  likedIds: new Set(),
  toggleLike: (id) =>
    set((state) => {
      const next = new Set(state.likedIds);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return { likedIds: next };
    }),
}));

export default useLikedStore;
