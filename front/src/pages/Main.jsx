import {useEffect} from "react"
import { connect } from "react-redux";
import Header from "../components/main/Header";
import Carousel from "../components/main/Carousel";
import Modal from "../components/main/modal/Modal";
import FallingAnimate from "../components/main/animate/FallingAnimate";
import { useSelector } from 'react-redux';

import image_iceburg from "assets/images/background_iceberg.jpg";
import image_dessert from "assets/images/background_desert.jpg";
import image_forest from "assets/images/background_forest.jpg";
import image_underwater from "assets/images/background_underwater.jpg";

import useSound from "util/hooks/useSound";
import bgm from "assets/sounds/mainbgm.mp3";
import { useCookies } from 'react-cookie';
import axiosRequest from "util/Axios";

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

  useSound(bgm, 0.4, 2000);

  // 안드로이드 기기 id 받아오기
  const getAndroidId = () => {
    if (window.react_toast) return window.react_toast.sendDeviceID();
  };

  const googleLoginrequest = async (cookies) => {
    let data = {
      androidId: "androidId",
      email: cookies.test.email,
      name: cookies.test.name,
      provider: cookies.test.provider,
    };

    await axiosRequest.post("/login/register", data).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    // console.log(cookies);
    if (cookies.test) googleLoginrequest(cookies);
  }, []);
  
  return (
    <div className="relative w-screen h-screen">
        <FallingAnimate falling={page}/>
        {showModal && <Modal config={"setting"} current={"main"}/>}
        <img className={`absolute z-0 w-screen h-screen opacity-50 ${coverImages[page]}`}  alt="" />
        <Header titleIsVisible={true} topLeftButton={"books"}/>  
        <Carousel />
    </div>
  );
};

Main.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
