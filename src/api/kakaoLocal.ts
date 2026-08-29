import axios from "axios";

const kakaoLocalClient = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local",
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

export interface KakaoPlace {
  id: string;
  placeName: string;
  addressName: string;
  roadAddressName: string;
  latitude: number;
  longitude: number;
}

interface KakaoKeywordSearchDocument {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string;
  y: string;
}

interface KakaoKeywordSearchResponse {
  documents: KakaoKeywordSearchDocument[];
}

export async function searchPlacesByKeyword(
  query: string,
): Promise<KakaoPlace[]> {
  const { data } = await kakaoLocalClient.get<KakaoKeywordSearchResponse>(
    "/search/keyword.json",
    { params: { query } },
  );

  return data.documents.map((doc) => ({
    id: doc.id,
    placeName: doc.place_name,
    addressName: doc.address_name,
    roadAddressName: doc.road_address_name,
    latitude: Number(doc.y),
    longitude: Number(doc.x),
  }));
}
