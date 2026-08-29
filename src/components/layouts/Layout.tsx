import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    // 데스크탑 환경을 위해 전체 배경은 회색(gray-100)으로, 내용은 가운데 정렬
    <div className="min-h-screen bg-gray-5 flex justify-center">
      <div className="w-full m-10 max-w-[393px] h-[852px] bg-white shadow-xl relative overflow-hidden">
        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
