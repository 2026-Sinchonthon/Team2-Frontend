import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserInfo {
  name: string;
  school: string;
}

interface AuthState {
  accessToken: string | null;
  userInfo: UserInfo | null;

  // 로그인 성공 시 토큰과 유저 정보를 함께 저장
  setAuth: (accessToken: string, userInfo: UserInfo) => void;

  // 로그아웃 시 초기화
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userInfo: null,

      setAuth: (accessToken, userInfo) => set({ accessToken, userInfo }),

      clearAuth: () => set({ accessToken: null, userInfo: null }),
    }),
    { name: "auth-storage" },
  ),
);

export default useAuthStore;
