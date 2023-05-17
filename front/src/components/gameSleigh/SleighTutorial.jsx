import React, { useState } from "react";
import { connect } from "react-redux";

export const Sleigh = (props) => {
  const mention = [
    "썰매에 튜토리얼을 붙여 보았어요",
    "게임화면을 캡쳐해서 넣을 예정이에요",
    "넘어가기를 누르면 시작화면이 나와요",
    "뛰지 않으면 펭글이가 기다려요",
    "폴짝!",
    "훌륭해요! 펭글이가 무사히 길을 건넜어요!",
  ];
  const bntmention = ["다음", "다음", "다음", "다음", "다음", "처음으로"];
  const pointcss = [
    "rounded-full left-[4%] top-[12%] absolute rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping ",
    "rounded-full left-[20%] bottom-[12%] absolute rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping",
    "rounded-full left-[40%] top-[12%] absolute rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping ",
    "rounded-full left-[45%] bottom-[3%] absolute rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping",
    "rounded-full left-[60%] bottom-[12%] absolute rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping",
    "rounded-full left-[60%] bottom-[12%] absolute rounded-full mx-auto m-12 h-[6em] w-[6em] ",
  ];
  const mentioncss = [
    "absolute top-[10%] left-5 w-full",
    "absolute top-[40%] left-14 w-full",
    "absolute top-[10%] left-14 w-full",
    "absolute top-[45%] left-[20%] w-full",
    "absolute top-[40%] left-[60%] w-full",
    "absolute top-[60%] left-[10%] w-full",
  ];
  const [idx, setIdx] = useState(0);
  const next = () => {
    console.log(idx);
    if (idx === 5) {
      setIdx(0);
    } else {
      setIdx(idx + 1);
    }
  };
  const close = () => {
    props.closeTutorial();
  };
  return (
    <div className="absolute top-0 z-40 w-screen h-screen bg-mainBlue-200">
      <div className="absolute z-50 w-5/6 overflow-hidden rounded-xl h-5/6 top-[8.333333%] left-[8.333333%] shadow-2xl">
        <div className={pointcss[idx]}></div>
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
          className=" bg-white bg-opacity-40 shadow-xl rounded-lg top-5 right-0 w-24 h-12 mr-6 font-MaplestoryBold text-2xl absolute leading-[3rem]"
        >
          <p>넘어가기</p>
        </div>
      </div>
      <div className="w-full h-full">
        {/* <img className="w-full h-full" src={filename[idx]} alt="뛰어쓰기설명" /> */}
      </div>
    </div>
  );
};

Sleigh.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Sleigh);
