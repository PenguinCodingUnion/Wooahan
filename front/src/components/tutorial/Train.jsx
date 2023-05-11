import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import train from "assets/images/tutorials/train.png";
import { Navigate } from "react-router-dom";

export const Train = (props) => {
  const [end, setEnd] = useState(false);
  const mention = [
    "구름 글자와 끝 글자가 똑같은 단어를 찾아주세요",
    "끝 글자와 맞는 단어를 선택해주세요",
  ];
  const bntmention = ["다음", "홈으로"];
  const pointcss = [
    "rounded-full left-[6.5%] top-0 absolute h-[12em] w-[12em] shadow-[0_1000px_0_1000px_rgba(169,169,169,0.4)]",
    "rounded-full left-[55%] bottom-0 absolute h-[10em] w-[10em] shadow-[0_-1000px_0_1000px_rgba(169,169,169,0.4)]",
  ];
  const mentioncss = [
    "absolute bottom-7 w-full",
    "absolute top-7 -left-14 w-full",
  ];
  const [idx, setIdx] = useState(0);
  const next = () => {
    if (idx === 1) {
      setEnd(true);
    }
    setIdx(idx + 1);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div>
        <div className={pointcss[idx]}>
          <div className="rounded-full mx-auto m-12 h-[6em] w-[6em] bg-mainRed-200 animate-ping"></div>
        </div>
        <div className={mentioncss[idx]}>
          <div className=" flex justify-center">
            <p className="whitespace-nowrap  bg-white rounded-md border px-3  mx-auto font-netmarbleB text-[1.7em] leading-[1.7em]">
              {mention[idx]}
            </p>
          </div>
        </div>

        <div
          onClick={() => {
            next();
          }}
          className=" bg-mainYellow-300 shadow-xl rounded-lg top-5 right-0 w-28 h-12 mr-6 font-MaplestoryBold text-2xl absolute leading-[3rem]"
        >
          <p>{bntmention[idx]}</p>
        </div>
      </div>
      <div className="h-full w-full">
        <img className="h-full w-full" src={train} alt="기차설명1" />
      </div>
      <div>{end && <Navigate to={`/`} />}</div>
    </div>
  );
};

Train.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Train);
