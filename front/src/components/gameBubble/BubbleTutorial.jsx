import React, { useState } from "react";
import { connect } from "react-redux";
import bubble from "assets/images/tutorials/bubble.png";

export const Bubble = (props) => {
  const pointcss = [
    "rounded-full left-[30%] top-[20%] absolute h-[15rem] w-[15rem] shadow-[0_-1000px_1000px_1000px_rgba(169,169,169,0.5)]",
    "rounded-full left-[68%] top-[13%] absolute h-[12em] w-[12em] shadow-[0_-1000px_1000px_1000px_rgba(169,169,169,0.5)]",
    "rounded-full mx-auto m-12 h-[8em] w-[8em] bg-mainRed-200 animate-ping",
    "rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping",
  ];
  const mention = ["그림과 맞는 단어를 찾아볼까요?", "한글방울을 선택해주세요"];
  const bntmention = ["다음", "처음으로"];
  const [idx, setIdx] = useState(0);
  const next = () => {
    if (idx === 1) {
      setIdx(0);
    } else {
      setIdx(idx + 1);
    }
  };
  const close = () => {
    props.closeTutorial();
  };
  return (
    <div className="relative z-40 w-screen h-screen bg-mainBlue-200">
      <div className="absolute z-50 w-5/6 overflow-hidden rounded-xl h-5/6 top-[8.333333%] left-[8.333333%] shadow-2xl">
        <div className={pointcss[idx]}>
          <div className={pointcss[idx + 2]}></div>
        </div>
        <div className="absolute w-full top-3 -left-14">
          <div className="flex justify-center ">
            <p className="whitespace-nowrap  bg-white rounded-md border px-3  mx-auto font-netmarbleB text-[1.7em] leading-[1.7em]">
              {mention[idx]}
            </p>
          </div>
        </div>
        <div
          onClick={() => {
            next();
          }}
          className="  bg-mainYellow-300 shadow-xl rounded-lg bottom-5 right-0 w-24 h-12 mr-6 font-MaplestoryBold text-2xl absolute leading-[3rem]"
        >
          <p>{bntmention[idx]}</p>
        </div>
        <div
          onClick={() => {
            close();
          }}
          className=" bg-white bg-opacity-90 shadow-xl rounded-lg top-5 right-0 w-24 h-12 mr-6 font-MaplestoryBold text-2xl absolute leading-[3rem]"
        >
          <p>넘어가기</p>
        </div>
        <div className="w-full h-full">
          <img className="w-full h-full" src={bubble} alt="한글방울" />
        </div>
      </div>
    </div>
  );
};

Bubble.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Bubble);
