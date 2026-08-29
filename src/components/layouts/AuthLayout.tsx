import { Outlet } from "react-router-dom";

const AuthLayout = () => {
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
