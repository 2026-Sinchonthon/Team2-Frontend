import axios from "axios";
import useAuthStore from "../stores/useAuthStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터 (리프레시 토큰 제거 버전)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const status = error.response.status;

      switch (status) {
        case 401:
          // 인증이 만료되었거나 유효하지 않은 경우 -> 바로 로그아웃 및 로그인 페이지로 이동
          console.warn("인증이 만료되었습니다. 다시 로그인해주세요.");
          useAuthStore.getState().clearAuth();
          window.location.href = "/login";
          break;

        case 400:
          console.warn("잘못된 요청입니다 : ", error.response.data);
          break;

        case 403:
          console.warn(
            "해당 기능에 접근 권한이 없습니다 : ",
            error.response.data,
          );
          break;

        case 404:
          console.error(
            "요청하신 데이터를 찾을 수 없습니다 : ",
            error.response.data,
          );
          break;

        case 500:
          console.warn(
            "서버에 일시적인 문제가 발생했습니다. : ",
            error.response.data,
          );
          break;

        default:
          console.error(`서버 오류 발생 (${status})`, error.response.data);
      }
    } else {
      alert("네트워크 연결이 불안정합니다. 인터넷 상태를 확인해주세요.");
    }

    return Promise.reject(error);
  },
);

export default apiClient;
