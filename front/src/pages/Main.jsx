import { useEffect } from "react";
import Header from "../components/main/Header";
import Carousel from "../components/main/Carousel";
import Modal from "../components/main/modal/Modal";
import FallingAnimate from "../components/main/animate/FallingAnimate";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import useSound from "util/hooks/useSound";
import bgm from "assets/sounds/mainbgm.mp3";
import { useCookies } from "react-cookie";
import axiosRequest from "util/Axios";
import {loginActions} from 'store/features/login/loginSlice';

const coverImages = [
  "bg-gradient-to-b from-[#00fff0]/[0.16] from-0% to-[#347ed6]/[0.63] to-100%",
  "bg-gradient-to-b from-[#04c900]/[.38] from-0% to-[#fea800]/[.63] to-100%",
  "bg-gradient-to-b from-[#33ffc2]/[.54] from-0% to-[#90EBFF] to-100%",
  "bg-gradient-to-b from-[#fcff73]/[.53] from-0% to-[#FF7E7E] to-100%",
  "bg-gradient-to-b from-[#00fff0]/[0.16] from-0% to-[#347ed6]/[0.63] to-100%",
  "bg-gradient-to-b from-[#04c900]/[.38] from-0% to-[#fea800]/[.63] to-100%",
  "bg-gradient-to-b from-[#33ffc2]/[.54] from-0% to-[#90EBFF] to-100%",
  "bg-gradient-to-b from-[#fcff73]/[.53] from-0% to-[#FF7E7E] to-100%",
];

export const Main = () => {
  const page = useSelector((state) => state.backGround.page);
  const showModal = useSelector((state) => state.modal.modalIsVisible);
  const [cookies, setCookie, removeCookie] = useCookies();
  const location = useLocation();
  const dispatch = useDispatch();
  const socialLogin = useSelector(state => state.loginInfo.socialLogin)

  // useSound(bgm, 0.4, 2000);

  // 안드로이드 기기 id 받아오기
  const getAndroidId = () => {
    if (window.react_toast) {
      const id = window.react_toast.sendDeviceID();
      console.log(id);
      return window.react_toast.axiosCheck("asd");
      // return window.react_toast.sendDeviceID();
    }
  };


  // 카카오 로그인 -> 인가코드
  const code = new URL(window.location.href).searchParams.get("code");

  // 카카오 로그인 요청
  useEffect(() => {
    console.log(code);

    let data = {
      code,
      deviceId: "android_test_id_man",
    };

    if (code != null) {
      (async () => {
        try {
          const res = await axiosRequest.post("/login/oauth2/kakao", data);

          console.log(res);
          dispatch(loginActions.getEmail(res.email))
          dispatch(loginActions.getStarCount(res.starCount))
          dispatch(loginActions.getName(res.name))
          dispatch(loginActions.successSocialLogin())

        } catch (e) {
          console.log(e);
        }
      })();
    }
  });

  return (
    <div className="relative w-screen h-screen">
      <FallingAnimate falling={page} />
      {showModal && <Modal config={"setting"} current={"main"} />}
      <img
        className={`absolute z-0 w-screen h-screen opacity-90 ${coverImages[page]}`}
        alt=""
      />
      <Header titleIsVisible={true} topLeftButton={"books"} page={page} />
      <Carousel />
    </div>
  );
};

Main.propTypes = {
  // second: PropTypes.third
};

export default Main;
