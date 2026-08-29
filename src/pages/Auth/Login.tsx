import { useState, ChangeEvent } from "react";

// 대학교 도메인 매핑 객체
const universityMap: Record<string, string> = {
  "hongik.ac.kr": "홍익대학교",
  "sogang.ac.kr": "서강대학교",
  "yonsei.ac.kr": "연세대학교",
  "snu.ac.kr": "서울대학교",
  "korea.ac.kr": "고려대학교",
  "hanyang.ac.kr": "한양대학교",
};

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [school, setSchool] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);

    if (inputEmail.includes("@")) {
      const domain = inputEmail.split("@")[1];

      if (universityMap[domain]) {
        setSchool(universityMap[domain]);
      } else if (domain.includes(".")) {
        setSchool("기타 (일반 이메일 또는 미등록 대학)");
      } else {
        setSchool("");
      }
    } else {
      setSchool("");
    }
  };

  return (
    <div className="max-w-[400px] mx-auto mt-12 p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
      <h2 className="text-center mb-6 text-2xl font-bold text-gray-800">
        로그인
      </h2>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="emailInput"
          className="font-semibold text-gray-700 text-sm"
        >
          학교 이메일
        </label>
        <input
          id="emailInput"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="example@hongik.ac.kr"
          className="p-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {school && (
        <div className="mt-4 p-3 bg-blue-50 rounded-md text-blue-700 text-sm">
          <span className="font-bold">소속 확인:</span> {school}
        </div>
      )}

      <button className="w-full p-3 mt-6 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">
        로그인
      </button>
    </div>
  );
};

export default Login;
