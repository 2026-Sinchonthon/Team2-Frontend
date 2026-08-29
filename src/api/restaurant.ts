import { apiClient } from "./client";
import type { Restaurant } from "../types/restaurant";

export async function getRestaurants(): Promise<Restaurant[]> {
  const { data } = await apiClient.get<Restaurant[]>("/api/restaurants");
  return data;
}
