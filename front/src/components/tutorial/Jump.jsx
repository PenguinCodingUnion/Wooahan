import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import jump1 from "assets/images/tutorials/jump3.png";
import jump2 from "assets/images/tutorials/jump42.png";
import jump3 from "assets/images/tutorials/jump57.png";
import jump4 from "assets/images/tutorials/jump76.png";
import jump5 from "assets/images/tutorials/jump104.png";
import jump6 from "assets/images/tutorials/jump137.png";

export const Jump = (props) => {
  const [end, setEnd] = useState(false);
  const mention = [
    "소리에 맞추어 문장을 읽어봐요",
    "띄어쓰기를 할 부분에서 폴짝 뛰어봐요",
    "잘 했어요! 이제 다시 문장을 읽어봐요",
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
  const filename = [jump1, jump2, jump3, jump4, jump5, jump6];
  const [idx, setIdx] = useState(0);
  const next = () => {
    if (idx === 5) {
      setIdx(0);
    } else {
      setIdx(idx + 1);
    }
  };
  const close = () => {
    setEnd(true);
  };
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div>
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
          className=" bg-white bg-opacity-40 shadow-xl rounded-lg top-5 right-0 w-12 h-12 mr-6 font-MaplestoryBold text-2xl absolute leading-[3rem]"
        >
          <p>X</p>
          {end && <Navigate to={`/main`} />}
        </div>
      </div>
      <div className="w-full h-full">
        <img className="w-full h-full" src={filename[idx]} alt="뛰어쓰기설명" />
      </div>
    </div>
  );
};

Jump.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Jump);
