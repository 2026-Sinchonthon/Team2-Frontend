import { Outlet } from "react-router-dom";
import BottomNav from "../BottomNav"; // 컴포넌트 경로에 맞게 수정하세요.

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-5 flex justify-center">
      {/* 1. overflow-hidden으로 틀을 고정하고 flex-col로 상하 배치 */}
      <div className="w-full m-10 max-w-[393px] h-[852px] bg-white shadow-xl relative overflow-hidden flex flex-col">
        {/* 2. flex-1을 주어 남는 높이를 꽉 채우고, 이 부분만 스크롤되도록 설정 */}
        <main className="w-full flex-1 overflow-y-auto no-scrollbar relative">
          <Outlet />
        </main>

        {/* 3. 하단 네비게이션 바 고정 */}
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
