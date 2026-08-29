import { Link, useNavigate } from "react-router-dom";
import iconBack from "../assets/icons/back.svg";
import iconHeartSolid from "../assets/icons/heart-solid.svg";
import iconProfileDefault from "../assets/icons/profile-default.svg";
import iconSettings from "../assets/icons/settings.svg";
import { logout } from "../api/authAPI";
import useAuthStore from "../stores/useAuthStore"; // Zustand 스토어 임포트

function MyPage() {
  const navigate = useNavigate();

  // Zustand 스토어에서 accessToken과 userInfo 가져오기
  const { accessToken, userInfo, clearAuth } = useAuthStore();
  const isLoggedIn = !!accessToken;

  const getSchoolName = (schoolCode?: string) => {
    if (!schoolCode) return "대학";

    switch (schoolCode.toUpperCase()) {
      case "EWHA":
        return "이화여자대학교";
      case "HONGIK":
        return "홍익대학교";
      case "MYONGJI":
      case "MYONGJIS":
        return "명지대학교";
      case "YONSEI":
        return "연세대학교";
      case "SOGANG":
        return "서강대학교";
      default:
        return schoolCode; // 코드가 아니라 한글 이름 자체로 들어온다면 그대로 출력
    }
  };

  const notifyNotImplemented = () => {
    alert("아직 준비 중인 기능이에요.");
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    const isConfirmed = window.confirm("정말 로그아웃 하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await logout();
    } catch (error) {
      console.error("로그아웃 API 호출 실패:", error);
    } finally {
      // Zustand 스토어 초기화 및 로컬스토리지 토큰 정리
      clearAuth();
      localStorage.removeItem("auth-storage");

      alert("로그아웃 되었습니다.");
      navigate("/login", { replace: true });
    }
  };

  // 프로필 클릭
  const handleProfileClick = () => {
    if (isLoggedIn) {
      handleLogout();
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative h-full w-full bg-white">
      <h1 className="absolute left-1/2 top-[68px] -translate-x-1/2 text-[20px] font-bold">
        마이페이지
      </h1>

      <button
        type="button"
        onClick={handleProfileClick}
        className="absolute left-[23px] top-[133px] flex h-[97px] w-[346px] cursor-pointer items-center gap-4 rounded-[10px] border border-[#d2d2d1] px-5"
      >
        <div className="flex size-[66px] shrink-0 items-center justify-center rounded-full border border-[#f74651] bg-white">
          <img src={iconProfileDefault} alt="" className="size-6" />
        </div>

        <div className="flex-1 text-left">
          {isLoggedIn ? (
            <>
              {/* 스토어에 저장된 name 출력 (없으면 기본값) */}
              <p className="text-[18px] font-bold text-[#1f1c1a]">
                {userInfo?.name || "아기사자"}
              </p>
              {/* 스토어에 저장된 school 명칭에 따라 동적으로 출력 */}
              <p className="mt-1 text-xs text-[#bcbbba]">
                {getSchoolName(userInfo?.school)} 인증
              </p>
            </>
          ) : (
            <p className="text-[18px] font-bold text-[#1f1c1a]">로그인하세요</p>
          )}
        </div>

        <img src={iconBack} alt="" className="size-6 -scale-x-100" />
      </button>

      <div className="absolute left-[24px] top-[265px] w-[346px]">
        <Link
          to="/mypage/activity"
          className="flex h-[66px] w-full items-center gap-3 rounded-[10px] border border-[#d2d2d1] px-4"
        >
          <img src={iconHeartSolid} alt="" className="size-9 shrink-0 p-1.5" />
          <span className="flex-1 text-[16px] font-bold text-[#1f1c1a]">
            내 활동
          </span>
          <img src={iconBack} alt="" className="size-6 -scale-x-100" />
        </Link>

        <button
          type="button"
          onClick={notifyNotImplemented}
          className="mt-4 flex h-[66px] w-full cursor-pointer items-center gap-3 rounded-[10px] border border-[#d2d2d1] px-4"
        >
          <img
            src={iconSettings}
            alt=""
            className="size-9 shrink-0 items-center justify-center p-1.5"
          />
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
