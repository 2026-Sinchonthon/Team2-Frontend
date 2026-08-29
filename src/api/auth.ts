import apiClient from "./client";

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T; // 실제 데이터는 여기에 들어감
}

export interface LoginRequest {
  email: string;
  password: string;
}

//로그인 시 받는 토큰 타입
export interface AuthTokens {
  accessToken: string;
  tokenType: string;
}

//로그인 API
export const login = async (credentials: LoginRequest): Promise<AuthTokens> => {
  const response = await apiClient.post<ApiResponse<AuthTokens>>(
    "/api/v1/auth/login",
    credentials,
  );

  return response.data.result;
};
