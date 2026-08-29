import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";

const AuthLayout = () => {
  const accessToken = useAuthStore((state) => state.accessToken);

  // 만약 토큰이 존재한다면(이미 로그인된 상태라면) 홈으로 튕겨냅니다.
  if (accessToken) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-5 flex justify-center">
      <div className="w-full m-10 max-w-[393px] h-[852px] bg-white shadow-xl relative overflow-hidden flex flex-col">
        <main className="w-full flex-1 overflow-y-auto no-scrollbar relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
