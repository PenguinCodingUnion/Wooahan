import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom/dist";
import axiosInstance from "util/Axios";
import Fox from "assets/images/animal/fox.png";

const GoogleLoginSuccess = () => {
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const code = query.get("code");
  const deviceId = query.get("state");

  useEffect(() => {
    axiosInstance.post("login/oauth2/google", {
      code,
      deviceId,
    });
  }, [location]);

  return (
    <div className="w-screen h-screen absolute top-0 text-center flex justify-center items-center flex-col bg-gradient-to-b from-[#33ffc2]/[.54] from-0% to-[#90EBFF] to-100%">
      <img src={Fox} alt="#" className="w-[50%]" />
      <div className="font-MaplestoryBold text-[5vw] text-shadow-loading shadow-white">
        구글 로그인이 완료되었습니다.
      </div>
      <div className="font-MaplestoryBold text-[5vw] text-shadow-loading shadow-white">
        창을 닫아 게임으로 돌아가주세요!
      </div>
      <button
        className="font-MaplestoryBold text-[4vw] border-2 p-[1vw] mt-[3vh] rounded-lg text-shadow-sm shadow-white"
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
