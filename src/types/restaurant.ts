export const RESTAURANT_TAGS = [
  "혼밥",
  "공강",
  "데이트",
  "해장",
  "밥약",
] as const;

export interface Restaurant {
  id: number;
  name: string;
  tag: string;
  description: string;
  address: string;
  thumbnail?: string;
  university: string;
  latitude: number;
  longitude: number;
}
