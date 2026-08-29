import { useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import type { Restaurant } from "../types/restaurant";
import pinEwha from "../assets/pins/ewha.svg";
import pinHongik from "../assets/pins/hongik.svg";
import pinMyongji from "../assets/pins/myongji.svg";
import pinSogang from "../assets/pins/sogang.svg";
import pinYonsei from "../assets/pins/yonsei.svg";

const PIN_SIZE = { width: 40, height: 48 };

const UNIVERSITY_PIN: Record<string, string> = {
  연세대학교: pinYonsei,
  이화여자대학교: pinEwha,
  서강대학교: pinSogang,
  명지대학교: pinMyongji,
  홍익대학교: pinHongik,
};

interface RestaurantMapProps {
  restaurants: Restaurant[];
  center?: { lat: number; lng: number };
  level?: number;
}

function RestaurantMap({ restaurants, center, level = 5 }: RestaurantMapProps) {
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_KEY,
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (loading) return <div>지도를 불러오는 중...</div>;
  if (error) return <div>지도를 불러오지 못했습니다.</div>;

  const resolvedCenter =
    center ??
    (restaurants[0]
      ? { lat: restaurants[0].latitude, lng: restaurants[0].longitude }
      : { lat: 37.5665, lng: 126.978 });

  return (
    <Map
      center={resolvedCenter}
      isPanto
      style={{ width: "100%", height: "100%" }}
      level={level}
    >
      {restaurants.map((restaurant) => (
        <MapMarker
          key={restaurant.id}
          position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
          image={
            UNIVERSITY_PIN[restaurant.university]
              ? {
                  src: UNIVERSITY_PIN[restaurant.university],
                  size: PIN_SIZE,
                  options: {
                    offset: { x: PIN_SIZE.width / 2, y: PIN_SIZE.height },
                  },
                }
              : undefined
          }
          onClick={() =>
            setSelectedId((prev) =>
              prev === restaurant.id ? null : restaurant.id,
            )
          }
        >
          {selectedId === restaurant.id && (
            <div style={{ padding: "6px 10px", minWidth: "140px" }}>
              <strong>{restaurant.name}</strong>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {restaurant.tag}
              </div>
              <div style={{ fontSize: "12px" }}>{restaurant.address}</div>
            </div>
          )}
        </MapMarker>
      ))}
    </Map>
  );
}

export default RestaurantMap;
