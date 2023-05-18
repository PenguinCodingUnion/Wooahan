import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";

const GoogleLoginSuccess = () => {
  const location = useLocation();

  console.log(location);
  return (
    <div className="w-screen h-screen absolute top-0 text-center justify-center items-center">
      <div className="font-MaplestoryBold text-[4vw]">
        로그인이 완료되었습니다.
      </div>
      <div className="font-MaplestoryBold text-[4vw]">
        창을 닫아 게임으로 돌아가주세요!
      </div>
      <button
        className="font-MaplestoryBold text-[2vw] border-2"
        onClick={() => {
          var ret = window.open("about:blank", "_self");
          ret.close();
        }}
      >
        나가기
      </button>
    </div>
  );
};

export default GoogleLoginSuccess;
