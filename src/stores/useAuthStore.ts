//src/stores/useAuthStore.ts

//전역 변수를 모두 저장하는 쥬스텐드 기본!!

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  // 로그인 성공 시 호출할 함수
  setAuth: (accessToken: string, refreshToken: string) => void;

  // 로그아웃 시 호출할 함수
  clearAuth: () => void;
}

//로컬 스토리지 저장 자동화
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      userInfo: null,

      setAuth: (accessToken, refreshToken) =>
        set({ accessToken, refreshToken }),

      clearAuth: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
