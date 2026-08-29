import { useState, useRef, ChangeEvent } from "react";

const UNIVERSITIES = ["홍익대", "이화여대", "서강대", "연세대", "명지대"];

const Signup = () => {
  const [selectedUniv, setSelectedUniv] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // input 태그에 대한 제네릭 타입 명시
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 핸들러 (미리보기 용도, ChangeEvent에 HTMLInputElement 타입 지정)
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // 파일을 읽어 base64 형태의 URL로 상태에 저장
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 업로드 영역 클릭 시 숨겨진 input을 대신 클릭하도록 처리
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-[500px] mx-auto mt-12 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-center mb-8 text-2xl font-bold text-gray-800">
        회원가입
      </h2>

      {/* 1. 대학교 선택 영역 */}
      <div className="mb-8">
        <label className="block font-semibold text-gray-700 text-sm mb-3">
          1. 소속 대학교 선택
        </label>
        <div className="flex flex-wrap gap-2">
          {UNIVERSITIES.map((univ) => (
            <button
              key={univ}
              type="button"
              onClick={() => setSelectedUniv(univ)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedUniv === univ
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {univ}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 학생증/합격증 사진 첨부 영역 */}
      <div className="mb-8">
        <label className="block font-semibold text-gray-700 text-sm mb-3">
          2. 학생증 또는 합격증 첨부
        </label>

        {/* 숨겨진 파일 입력 필드 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* 커스텀 업로드 UI */}
        <div
          onClick={handleUploadClick}
          className={`flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed rounded-lg cursor-pointer transition-colors overflow-hidden ${
            imagePreview
              ? "border-blue-300 bg-blue-50"
              : "border-gray-300 hover:bg-gray-50"
          }`}
        >
          {imagePreview ? (
            <div className="relative w-full h-full group">
              <img
                src={imagePreview}
                alt="학생증 미리보기"
                className="w-full h-48 object-contain bg-white"
              />
              {/* 이미지 위 마우스 호버 시 나타나는 변경 버튼 안내 */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">
                  클릭하여 사진 변경
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-8 text-gray-500">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-sm font-medium">
                클릭하여 사진을 업로드하세요
              </p>
              <p className="text-xs mt-1 text-gray-400">JPG, PNG 파일 지원</p>
            </div>
          )}
        </div>
      </div>

      {/* 가입 완료 버튼 */}
      <button
        type="button"
        className={`w-full p-3.5 font-semibold rounded-lg transition-colors ${
          selectedUniv && imagePreview
            ? "bg-gray-800 text-white hover:bg-gray-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        disabled={!selectedUniv || !imagePreview}
      >
        인증 요청 및 가입하기
      </button>
    </div>
  );
};

export default Signup;
