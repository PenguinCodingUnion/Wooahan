import React, { useState } from "react";
import { connect } from "react-redux";
import sleigh1 from "assets/images/tutorials/sleigh1.png";
import sleigh2 from "assets/images/tutorials/sleigh2.png";

export const Sleigh = (props) => {
  const mention = [
    "단어에 맞는 그림으로 움직여봐요",
    "기기를 기울이거나 버튼을 눌러 움직일 수 있어요",
  ];
  const bntmention = ["다음", "처음으로"];
  const pointcss = [
    "rounded-full top-[6%] absolute rounded-full h-[min(10vw,20vh)] w-[min(10vw,20vh)] bg-mainRed-300 animate-ping ",
    "rounded-full left-[8vw] bottom-[7vh] absolute rounded-full h-[min(7vw,20vh)] w-[min(7vw,20vh)] bg-mainRed-300 animate-ping",
  ];
  const mentioncss = [
    "absolute top-[60%] justify-center flex w-full",
    "absolute top-[30%] justify-center flex w-full",
  ];

  const filename = [sleigh1, sleigh2];

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
    <div className="absolute top-0 z-[100] w-screen h-screen bg-mainBlue-200">
      <div className="absolute z-[100] w-5/6 flex justify-center overflow-hidden rounded-xl h-5/6 top-[8.333333%] left-[8.333333%] shadow-2xl">
        <div className={pointcss[idx]} />
        <div className={mentioncss[idx]}>
          <div className="relative flex justify-normal">
            <p className="whitespace-nowrap  bg-white rounded-md border px-3 font-netmarbleB text-[1.7em] leading-[1.7em]">
              {mention[idx]}
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            next();
          }}
          className=" bg-mainYellow-300 shadow-xl rounded-lg bottom-5 right-0 w-24 h-12 mr-6 font-MaplestoryBold text-2xl absolute leading-[3rem]"
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
        <img className="w-full h-full" src={filename[idx]} alt="뛰어쓰기설명" />
      </div>
      <div className="w-full h-full"></div>
    </div>
  );
};

Sleigh.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sleigh);
