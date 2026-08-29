import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;

  // 로그인 성공 시 호출할 함수
  setAuth: (accessToken: string) => void;

  // 로그아웃 시 호출할 함수
  clearAuth: () => void;
}

//로컬 스토리지 저장 자동화
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,

      userInfo: null,

      setAuth: (accessToken) => set({ accessToken }),

      clearAuth: () => set({ accessToken: null }),
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
