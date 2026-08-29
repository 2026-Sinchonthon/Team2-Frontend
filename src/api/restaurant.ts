import { apiClient } from "./client";
import type { Restaurant } from "../types/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  const { data } = await apiClient.get<Restaurant[]>("/api/v1/restaurants");
  return data;
}
