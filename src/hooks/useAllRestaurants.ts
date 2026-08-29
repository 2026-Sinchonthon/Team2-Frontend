import { useEffect, useState } from "react";
import { getRestaurants } from "../api/restaurant";
import { RESTAURANT_TAGS, type Restaurant } from "../types/restaurant";

// 백엔드가 아직 태그를 내려주지 않아 임시로 목 데이터를 붙입니다.
function mockTag(restaurantId: number): string {
  return RESTAURANT_TAGS[restaurantId % RESTAURANT_TAGS.length];
}

// 백엔드는 영문 코드로 학교를 구분합니다 (회원가입 화면과 동일한 코드).
const UNIVERSITY_CODES: Record<string, string> = {
  명지대: "MYONGJI",
  서강대: "SOGANG",
  이화여대: "EWHA",
  연세대: "YONSEI",
  홍익대: "HONGIK",
};

export function useAllRestaurants(): Restaurant[] {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      Object.entries(UNIVERSITY_CODES).map(async ([label, code]) => {
        const { restaurants } = await getRestaurants(code);
        return restaurants.map((restaurant): Restaurant => ({
          id: restaurant.restaurantId,
          name: restaurant.name,
          tag: mockTag(restaurant.restaurantId),
          description: "",
          address: restaurant.address,
          thumbnail: restaurant.imageUrl,
          university: label,
          latitude: restaurant.latitude,
          longitude: restaurant.longitude,
        }));
      }),
    )
      .then((results) => {
        if (!cancelled) setRestaurants(results.flat());
      })
      .catch((error) => {
        console.error("맛집 목록을 불러오지 못했습니다.", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return restaurants;
}
