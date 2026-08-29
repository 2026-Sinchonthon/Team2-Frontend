import { Link } from "react-router-dom";
import iconBack from "../assets/icons/back.svg";

function MyPage() {
  const notifyNotImplemented = () => {
    alert("아직 준비 중인 기능이에요.");
  };

  return (
    <div className="relative h-full w-full bg-white">
      <h1 className="absolute left-1/2 top-[68px] -translate-x-1/2 text-[20px] font-bold">
        마이페이지
      </h1>

      <button
        type="button"
        onClick={notifyNotImplemented}
        className="absolute left-[23px] top-[133px] flex h-[97px] w-[346px] items-center gap-4 rounded-[10px] border border-[#d2d2d1] px-5"
      >
        <div className="size-[66px] shrink-0 rounded-full bg-gray-200" />
        <div className="text-left">
          <p className="text-[18px] font-bold text-[#1f1c1a]">아기사자</p>
          <p className="mt-1 text-xs text-[#bcbbba]">이화여자대학교 인증</p>
        </div>
      </button>

      <div className="absolute left-[24px] top-[265px] w-[346px]">
        <Link
          to="/mypage/activity"
          className="flex h-[66px] w-full items-center gap-3 rounded-[10px] border border-[#d2d2d1] px-4"
        >
          <div className="size-9 shrink-0 rounded-full bg-gray-200" />
          <span className="flex-1 text-[16px] font-bold text-[#1f1c1a]">
            내 활동
          </span>
          <img src={iconBack} alt="" className="size-6 -scale-x-100" />
        </Link>

        <button
          type="button"
          onClick={notifyNotImplemented}
          className="mt-4 flex h-[66px] w-full items-center gap-3 rounded-[10px] border border-[#d2d2d1] px-4"
        >
          <div className="size-9 shrink-0 rounded-full bg-gray-200" />
          <span className="flex-1 text-left text-[16px] font-bold text-[#1f1c1a]">
            설정
          </span>
          <img src={iconBack} alt="" className="size-6 -scale-x-100" />
        </button>
      </div>
    </div>
  );
}

export default MyPage;
