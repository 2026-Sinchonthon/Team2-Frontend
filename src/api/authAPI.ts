import api from "./client";

// 백엔드 공통 응답 구조 작성필요!! 수정해야함
export interface ApiResponse<T> {
  success: boolean;
  data: T; // 실제 데이터
  error: {
    code: string;
    message: string;
  } | null;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  school: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

//로그인 시 받는 토큰 타입
export interface AuthTokens {
  accessToken: string;
}

// 내정보 조회
export interface UserInfo {
  userId: number;
  name: string;
  email: string;
  nickname: string;
  university: string;
}

//회원가입 API
//성공 여부 확인
export const signup = async (
  signupData: SignupRequest,
): Promise<AuthTokens> => {
  const response = await api.post<ApiResponse<AuthTokens>>(
    "/api/auth/signup",
    signupData,
  );
  // 회원가입 응답에도 accessToken이 내려오므로 반환 처리
  return response.data.data;
};

//로그인 API
export const login = async (data: LoginRequest): Promise<AuthTokens> => {
  const response = await api.post<ApiResponse<AuthTokens>>(
    "/api/auth/login",
    data,
  );

  return response.data.data;
};

//로그아웃 API
export const logout = async (): Promise<void> => {
  await api.post<ApiResponse<void>>("/api/v1/auth/logout");
};

//내 정보 조회 API
export const getMyInfo = async (): Promise<UserInfo> => {
  const response = await api.get<ApiResponse<UserInfo>>("/api/v1/users/me");

  return response.data.data;
};
