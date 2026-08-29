import { useState } from "react";
import { searchPlacesByKeyword, type KakaoPlace } from "../api/kakaoLocal";

function AddRestaurant() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<KakaoPlace[]>([]);
  const [selected, setSelected] = useState<KakaoPlace | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      const places = await searchPlacesByKeyword(query);
      setResults(places);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1.5rem", maxWidth: "480px" }}>
      <h1>맛집 추가</h1>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: "8px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="장소명을 검색하세요"
          style={{ flex: 1, padding: "8px" }}
        />
        <button type="submit" disabled={loading}>
          {loading ? "검색 중..." : "검색"}
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
        {results.map((place) => (
          <li
            key={place.id}
            onClick={() => setSelected(place)}
            style={{
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              marginBottom: "6px",
              cursor: "pointer",
              background: selected?.id === place.id ? "#eef6ff" : "white",
            }}
          >
            <strong>{place.placeName}</strong>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {place.roadAddressName || place.addressName}
            </div>
          </li>
        ))}
      </ul>

      {selected && (
        <div
          style={{ marginTop: "1rem", padding: "12px", background: "#f5f5f5" }}
        >
          <p>선택된 장소: {selected.placeName}</p>
          <p>주소: {selected.roadAddressName || selected.addressName}</p>
          <p>
            좌표: {selected.latitude}, {selected.longitude}
          </p>
        </div>
      )}
    </div>
  );
}

export default AddRestaurant;
