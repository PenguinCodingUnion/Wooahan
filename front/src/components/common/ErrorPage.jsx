import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigation = useNavigate();
  return (
    <div className="w-screen h-screen absolute top-0 text-center justify-center items-center">
      <div className="font-MaplestoryBold text-[4vw]">요청에 실패했습니다.</div>
      <button
        className="font-MaplestoryBold text-[2vw] border-2"
        onClick={() => {
          navigation("/");
        }}
      >
        홈으로
      </button>
    </div>
  );
};

export default ErrorPage;
