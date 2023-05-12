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

const coverImages = [
  image_iceburg,
  image_forest,
  image_underwater,
  image_dessert,
  image_iceburg,
  image_forest,
  image_underwater,
  image_dessert,
];

export const Main = () => {
  const page = useSelector((state) => state.backGround.page);
  const showModal = useSelector((state) => state.modal.modalIsVisible);
  const [cookies, setCookie, removeCookie] = useCookies(['test']);

  useSound(bgm, 1, 2000);

  useEffect(() => {
    console.log(cookies.id)
  }, [])
  
  return (
    <div className="relative w-screen h-screen overflow-x-scroll">
        <FallingAnimate falling={page}/>
        {showModal && <Modal config={"setting"}/>}
        <img className="absolute z-0 w-screen h-screen opacity-50" src={coverImages[page]} alt="" />
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
