import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import train1 from "assets/images/tutorials/train1.png";
import pickhand from "assets/images/tutorials/pickHand.png";

export const Train = (props) => {
  return (
    <div>
      <div className="absolute bg-mint w-28 h-11 right-7 top-7 font-MaplestoryLight text-2xl leading-[2.75rem]">
        다음
      </div>
      <div className="grid justify-center h-screen items-center ">
        <img className="" src={train1} alt="기차설명1" />
        {/* <div className="absolute bg-mainSlate-300 top-1/4 left-1/2 rounded-xl bg-opacity-60 font-netmarbleM text-3xl ">
          <p>단어의 끝 글자에요</p>
        </div> */}
        <div className="absolute bg-mainSlate-300 top-2/4 left-1/2 rounded-xl bg-opacity-60 font-netmarbleM text-3xl ">
          <p>끝 글자와 맞는 단어를 선택해주세요</p>
        </div>
        <img
          className="absolute w-28 h-28 top-3/4 left-2/3"
          src={pickhand}
          alt="손"
        />
      </div>
    </div>
  );
};

Train.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
