import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckUniv from "./CheckUniv";

import { signup } from "../../api/authAPI";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [pwError, setPwError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  useEffect(() => {
    if (email.length > 0) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setEmailError("올바른 이메일 형식을 입력해주세요.");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  }, [email]);

  useEffect(() => {
    if (password.length > 0) {
      const hasEng = /[a-zA-Z]/.test(password);
      const hasNum = /[0-9]/.test(password);
      const hasSpec = /[.!@#&%]/.test(password);
      const isValidLength = password.length >= 8 && password.length <= 20;

      if (!hasEng || !hasNum || !hasSpec || !isValidLength) {
        setPwError(
          "비밀번호는 영문 대소문자, 숫자, 특수문자(.!@#&%)를 혼합하여 8~20자로 입력해주세요.",
        );
      } else {
        setPwError("");
      }
    } else {
      setPwError("");
    }
  }, [password]);

  useEffect(() => {
    if (passwordConfirm.length > 0 && password !== passwordConfirm) {
      setConfirmError("비밀번호가 일치하지 않아요.");
    } else {
      setConfirmError("");
    }
  }, [password, passwordConfirm]);

  const isBasicInfoValid =
    name.length > 0 &&
    email.length > 0 &&
    password.length > 0 &&
    passwordConfirm.length > 0 &&
    !confirmError &&
    !emailError &&
    !pwError;

  //연동
  const handleFinalSubmit = async (univ: string) => {
    if (!name || !email || !password || !passwordConfirm || isLoading) return;

    try {
      setIsLoading(true);
      console.log("전송할 데이터:", {
        name,
        email,
        password,
        passwordConfirm,
        school: univ,
      });
      await signup({ name, email, password, passwordConfirm, school: univ });

      alert("회원가입이 완료되었습니다! 로그인 후 이용해주세요.");
      navigate("/login");
    } catch (error) {
      alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 2) {
    return <CheckUniv onComplete={handleFinalSubmit} />;
  }

  return (
    // CheckUniv와 동일하게 min-h-screen과 여백(pt-[125px]) 적용
    <div className="flex flex-col min-h-screen bg-white px-5 pt-[125px] pb-8 max-w-md mx-auto relative">
      <h1 className="text-center mb-10 text-[24px] font-bold text-gray-900">
        반가워요!
        <br />
        회원가입을를 진행해볼까요?
      </h1>

      <form className="flex flex-col flex-1">
        <div className="mb-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            // 중복된 rounded 제거 및 일관된 스타일 적용
            className="w-full p-4 bg-gray-10 rounded-2xl focus:outline-none focus:border-gray-30 transition-all"
          />
        </div>

        <div className="mb-8">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일"
            className="w-full p-4 bg-gray-10 rounded-2xl focus:outline-none focus:border-gray-30 transition-all"
          />
          {emailError && (
            <span className="inline-block mt-2 text-[13px] text-gray-30">
              {emailError}
            </span>
          )}
        </div>

        <div className="mb-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full p-4 bg-gray-10 rounded-2xl focus:outline-none focus:border-gray-30 transition-all"
          />
          {pwError && (
            <span className="inline-block mt-2 text-[13px] text-gray-30">
              {pwError}
            </span>
          )}
        </div>

        <div>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="비밀번호 확인"
            className="w-full p-4 bg-gray-10 rounded-2xl focus:outline-none focus:border-gray-30 transition-all"
          />
          {confirmError && (
            <span className="inline-block mt-2 text-[13px] text-gray-30">
              {confirmError}
            </span>
          )}
        </div>

        {/* mt-auto를 주어 버튼을 화면 하단으로 밀어냄 */}
        <div className="mt-auto mb-[51px] flex items-center justify-center pt-8">
          <button
            type="button"
            onClick={() => setStep(2)}
            // CheckUniv의 하단 버튼 색상(bg-black / bg-gray-30)과 동일하게 맞춤
            className={`w-[318px] py-4 text-[16px] font-bold rounded-3xl transition-colors ${
              isBasicInfoValid
                ? "bg-black text-white"
                : "bg-gray-30 text-white cursor-not-allowed"
            }`}
            disabled={!isBasicInfoValid}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
