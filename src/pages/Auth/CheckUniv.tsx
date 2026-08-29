import { useState, useRef, ChangeEvent } from "react";

const UNIVERSITIES = ["홍익대", "이화여대", "서강대", "연세대", "명지대"];

interface UnivAuthProps {
  onComplete: (selectedUniv: string) => void;
}

const CheckUniv = ({ onComplete }: UnivAuthProps) => {
  const [selectedUniv, setSelectedUniv] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const isFormValid = selectedUniv !== "" && imagePreview !== null;

  // 추가된 부분: 완료 버튼을 누르면 부모(Signup)에게 선택한 데이터를 넘겨줍니다.
  const handleSubmit = () => {
    if (isFormValid && imagePreview) {
      onComplete(selectedUniv);
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
            className={`flex flex-col items-center justify-center w-full aspect-[5/3] border-[1px] border-dashed rounded-[20px] cursor-pointer transition-colors overflow-hidden ${
              imagePreview ? "border-main-1" : "border-[#B0B0B0]"
            }`}
          >
            {imagePreview ? (
              <div className="relative w-full h-full group">
                <img
                  src={imagePreview}
                  alt="학생증 미리보기"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium">
                    클릭하여 사진 변경
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <div className="w-10 h-10 mb-2 rounded-full border-2 border-gray-900 flex items-center justify-center">
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
                <p className="text-[15px] font-medium text-gray-700">
                  클릭하여 사진을 업로드 하세요
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
            onClick={handleSubmit} // 추가된 부분: 클릭 이벤트 연결
            className={`w-[318px] py-4 text-[16px] font-bold rounded-3xl transition-colors  ${
              isFormValid
                ? "bg-black text-white"
                : "bg-gray-30 text-white cursor-not-allowed"
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
