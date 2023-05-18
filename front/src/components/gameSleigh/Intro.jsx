import React, { useState } from "react";
import SleighTutorial from "./SleighTutorial";

const Intro = (props) => {
  const [isTutorial, setIstutorial] = useState(true);
  const closeTutorial = () => {
    setIstutorial(false);
  };
  return (
    <>
      {isTutorial && <SleighTutorial closeTutorial={closeTutorial} />}
      <div
        className="absolute top-0 flex flex-col justify-between w-screen h-screen animate-scale-up-center"
        onClick={() => {
          props.setIsStart(true);
        }}
      >
        {/* <ul className="bg-white border-[2px] mt-[10vh] mx-[15vw] tracking-[0.1vw] text-[2.5vw] font-MaplestoryBold rounded-[16px] py-[1.5vw] ">
        <h1 className="mb-[2vh]">단어에 맞는 그림으로 이동시켜주세요!</h1>
        <li>기기를 기울이거나, 버튼을 눌러 이동시킬 수 있어요!</li>
      </ul> */}
        <ul className="mt-[5vh] mx-[15vw] tracking-[0.3vw] text-[min(5vw,10vh)] font-MaplestoryBold rounded-[16px] py-[1.5vw] text-mainYellow-300 text-shadow-loading shadow-mainBlack">
          <h1 className="mb-[2vh]">여울이가 무사히 심부름을</h1>
          <li>다녀올 수 있도록 도와주세요!</li>
        </ul>
        <div className="mb-[40vh] animate-bounce text-mainAmber-700 font-MaplestoryBold text-[min(10vw,20vh)] text-shadow-loading shadow-white ">
          시 작!
        </div>
      </div>
    </>
  );
};

export default Intro;
