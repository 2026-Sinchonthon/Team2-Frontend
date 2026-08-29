import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");

  return (
    <div className="max-w-[400px] mx-auto mt-70 p-6  bg-white">
      <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">
        로그인
      </h2>

      <form className="flex flex-col gap-2">
        <div className="flex  justify-between">
          <label
            htmlFor="emailInput"
            className="font-semibold text-gray-700 text-sm"
          >
            이메일
          </label>
          <input
            id="emailInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@hongik.ac.kr"
            className="p-2.5  rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="flex justify-between">
          <label className="font-semibold text-gray-700 text-sm">
            비밀번호
          </label>
          <input
            id="emailInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="example@hongik.ac.kr"
            className="p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="w-full p-3 mt-6 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
