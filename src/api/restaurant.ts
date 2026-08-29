import { apiClient } from "./client";

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error: {
    code: string;
    message: string;
  } | null;
}

function unwrap<T>(envelope: ApiEnvelope<T>, fallbackMessage: string): T {
  if (!envelope.success) {
    throw new Error(envelope.error?.message ?? fallbackMessage);
  }
  return envelope.data;
}

export interface RestaurantSummary {
  restaurantId: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  checkCount: number;
  universityCheckCount: number;
  imageUrl?: string;
}

interface RestaurantsData {
  university: string;
  restaurants: RestaurantSummary[];
}

export async function getRestaurants(
  university?: string,
): Promise<RestaurantsData> {
  const { data } = await apiClient.get<ApiEnvelope<RestaurantsData>>(
    "/api/restaurants",
    { params: university ? { university } : undefined },
  );

  return unwrap(data, "맛집 목록을 불러오지 못했습니다.");
}

export interface CreateRestaurantPayload {
  kakaoPlaceId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface RestaurantDetail {
  restaurantId: number;
  kakaoPlaceId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  checkCount: number;
  checkCountByUniversity: Record<string, number>;
}

export async function createRestaurant(
  payload: CreateRestaurantPayload,
): Promise<RestaurantDetail> {
  const { data } = await apiClient.post<ApiEnvelope<RestaurantDetail>>(
    "/api/restaurants",
    payload,
  );

  return unwrap(data, "맛집을 등록하지 못했습니다.");
}

export interface CheckRestaurantResult {
  restaurantId: number;
  checked: boolean;
  checkCount: number;
  checkCountByUniversity: Record<string, number>;
}

export async function checkRestaurant(
  restaurantId: number,
): Promise<CheckRestaurantResult> {
  const { data } = await apiClient.post<ApiEnvelope<CheckRestaurantResult>>(
    `/api/restaurants/${restaurantId}/checks`,
  );

  return unwrap(data, "완료 처리에 실패했습니다.");
}