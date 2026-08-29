import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="max-w-[400px] mx-auto mt-60 p-6  bg-white">
      <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">
        로그인
      </h2>

      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="p-3 rounded border border-gray-300 focus:outline-none  focus:border-main-1 rounded-2xl"
          />
        </div>

        <div className="flex flex-col gap-1">
          <input
            id="password"
            type="password"
            value={password}
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded border border-gray-300 focus:outline-none focus:border-main-1 rounded-2xl"
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
          className="cursor-pointer text-gray-30"
        >
          회원가입
        </div>
      </div>
    </div>
  );
};

export default Login;
