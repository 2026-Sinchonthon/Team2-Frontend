import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getUserInfo } from "../../api/authAPI"; // getUserInfo 추가 임포트
import logo from "../../assets/logo/logo.svg";
import useAuthStore from "../../stores/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || isLoading) return;

    try {
      setIsLoading(true);

      // 1. 로그인 요청으로 토큰 획득
      const tokenData = await login({ email, password });

      // 2. 토큰을 먼저 스토어에 저장해야 인증 헤더가 포함되어 내 정보 조회가 가능합니다.
      setAuth(tokenData.accessToken, { name: "", school: "" });

      // 3. 내 정보 조회 API 호출하여 유저 정보 가져오기
      const userInfo = await getUserInfo();

      // 4. 토큰과 함께 실제 유저 정보(name, school)를 스토어에 최종 저장
      setAuth(tokenData.accessToken, {
        name: userInfo.name,
        school: userInfo.school,
      });

      navigate("/");
    } catch (error) {
      alert("로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-[200px] p-6 bg-white flex flex-col items-center">
      <img src={logo} alt="로고" className="mb-10" />

      <form className="flex flex-col gap-2 w-full" onSubmit={handleLogin}>
        <div className="flex flex-col gap-1 ">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="p-3 rounded border border-gray-5 bg-gray-5 focus:outline-none focus:border-main-red rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded border border-gray-5 bg-gray-5 focus:outline-none focus:border-main-red rounded-2xl"
          />
        </div>
        <button
          disabled={isLoading}
          className="w-full p-3 mt-6 bg-gray-30 text-white rounded-2xl font-semibold hover:bg-black transition-colors"
        >
          {isLoading ? "로그인 중 ..." : "로그인"}
        </button>
      </form>
      <div className="flex items-center mt-3">
        <div
          onClick={() => {
            navigate("/signup");
          }}
          className="cursor-pointer text-gray-30 text-[14px]"
        >
          회원가입
        </div>
      </div>
    </div>
  );
};

export default Login;
