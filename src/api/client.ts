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

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          throw new Error("리프레쉬 토큰이 없습니다.");
        }

        // 인터셉터가 붙지 않은 axios 사용
        const refreshResponse = await axios.post(
          `${baseURL}/api/v1/auth/refresh`,
          { refreshToken },
        );

        // 새 액세스 토큰
        const newAccessToken = refreshResponse.data.result.accessToken;

        if (newAccessToken) {
          useAuthStore.setState({
            accessToken: newAccessToken,
          });

          // 새 리프레쉬 토큰이 있다면 교체
          if (refreshResponse.data.result?.refreshToken) {
            useAuthStore.setState({
              refreshToken: refreshResponse.data.result.refreshToken,
            });
          }

          // 실패했던 요청에 새 토큰 넣기
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // 원래 요청 다시 보내기
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error("토큰 재발급 실패, 로그아웃", refreshError);

        useAuthStore.getState().clearAuth();
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    if (error.response) {
      const status = error.response.status;

      switch (status) {
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
