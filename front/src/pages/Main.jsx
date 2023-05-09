import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Header from "../components/main/Header";
import Carousel from "../components/main/Carousel";
import Modal from "../components/main/modal/Modal";
import FallingAnimate from "../components/main/animate/FallingAnimate";

import { useSelector } from "react-redux";

import image_iceburg from "assets/images/background_iceberg.jpg";
import image_dessert from "assets/images/background_desert.jpg";
import image_forest from "assets/images/background_forest.jpg";
import image_underwater from "assets/images/background_underwater.jpg";

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

  return (
    <div className="relative overflow-x-scroll w-screen h-screen">
      <FallingAnimate falling={page}/>
      {showModal && <Modal config={"setting"}/>}
      <img className="absolute w-screen h-screen z-0 opacity-50" src={coverImages[page]} />
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
