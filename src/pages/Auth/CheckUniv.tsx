import { useState, useRef, ChangeEvent } from "react";

const UNIVERSITIES = ["홍익대", "이화여대", "서강대", "연세대", "명지대"];

const UNIV_MAP: Record<string, string> = {
  홍익대: "HONGIK",
  이화여대: "EWHA",
  서강대: "SOGANG",
  연세대: "YONSEI",
  명지대: "MYONGJI",
};

interface UnivAuthProps {
  onComplete: (selectedUniv: string) => void;
}

// 업로드 상태를 3가지로 관리합니다.
type UploadStatus = "idle" | "verifying" | "success";

const CheckUniv = ({ onComplete }: UnivAuthProps) => {
  const [selectedUniv, setSelectedUniv] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 1. 파일이 선택되면 '인증 중' 상태로 변경
      setUploadStatus("verifying");

      // 2. 1초 뒤에 '인증 완료(success)' 상태로 변경
      setTimeout(() => {
        setUploadStatus("success");
      }, 1000);
    }
  };

  const handleUploadClick = () => {
    // 이미 완료된 상태가 아닐 때만 파일 업로드 창 열기
    if (uploadStatus !== "success") {
      fileInputRef.current?.click();
    }
  };

  // 폼 유효성: 대학 선택 & 업로드 상태가 'success'일 때만 통과
  const isFormValid = selectedUniv !== "" && uploadStatus === "success";

  const handleSubmit = () => {
    if (isFormValid) {
      onComplete(UNIV_MAP[selectedUniv]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-5 pt-[125px] pb-8 max-w-md mx-auto relative ">
      <form className="flex flex-col flex-1">
        {/* 1. 대학교 선택 영역 */}
        <div className="mb-10">
          <label className="block font-bold text-gray-900 text-[18px] mb-4">
            1.소속 대학교 선택
          </label>
          <div className="flex flex-wrap gap-2.5">
            {UNIVERSITIES.map((univ) => (
              <button
                key={univ}
                type="button"
                onClick={() => setSelectedUniv(univ)}
                className={`px-5 py-2.5 rounded-full text-[15px] font-medium transition-all ${
                  selectedUniv === univ
                    ? "border border-main-red text-main-red"
                    : "bg-[#F5F5F5] text-black"
                }`}
              >
                {univ}
              </button>
            ))}
          </div>
        </div>

        {/* 2. 학생증/합격증 사진 첨부 영역 */}
        <div className="mb-8 flex-1">
          <label className="block font-bold text-gray-900 text-[18px] mb-4">
            2.학생증 또는 합격증 첨부
          </label>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />

          <div
            onClick={handleUploadClick}
            className={`flex flex-col items-center justify-center w-full aspect-[5/3] rounded-[20px] transition-all overflow-hidden bg-[#F5F5F5] ${
              uploadStatus === "success"
                ? "border-2 border-solid border-[#FF4E4E]" // 성공 시: 빨간색 실선
                : "border-[1px] border-dashed border-[#B0B0B0] cursor-pointer" // 대기 중: 회색 점선
            }`}
          >
            {/* 상태 1: 기본 (업로드 전) */}
            {uploadStatus === "idle" && (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <div className="w-10 h-10 mb-2 rounded-full flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
                      fill="#111111"
                    />
                  </svg>
                </div>
                <p className="text-[14px] font-medium text-gray-700">
                  클릭하여 사진을 업로드 하세요
                </p>
              </div>
            )}

            {/* 상태 2: 로딩 중 (1초) */}
            {uploadStatus === "verifying" && (
              <div className="flex flex-col items-center justify-center">
                {/* 간단한 로딩 스피너 */}
                <div className="w-8 h-8 border-4 border-gray-300 border-t-[#FF4E4E] rounded-full animate-spin mb-3"></div>
                <p className="text-[14px] font-medium text-gray-700">
                  사진 확인 중...
                </p>
              </div>
            )}

            {/* 상태 3: 인증 완료 (시안 반영) */}
            {uploadStatus === "success" && (
              <div className="flex flex-col items-center justify-center">
                {/* 빨간색 체크 아이콘 */}
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-2"
                >
                  <circle cx="12" cy="12" r="12" fill="#FF4E4E" />
                  <path
                    d="M7 12.5L10.5 16L17 8.5"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[15px] font-bold text-[#FF4E4E]">
                  인증 완료
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 하단 고정 완료 버튼 */}
        <div className="mb-[51px] flex items-center justify-center">
          <button
            type="button"
            disabled={!isFormValid}
            onClick={handleSubmit}
            className={`w-[318px] py-4 text-[16px] font-bold rounded-3xl transition-colors  ${
              isFormValid
                ? "bg-[#333333] text-white"
                : "bg-[#D9D9D9] text-white cursor-not-allowed"
            }`}
          >
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckUniv;
