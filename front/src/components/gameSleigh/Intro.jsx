import React from "react";

const Intro = (props) => {
  return (
    <div
      className="absolute animate-scale-up-center flex flex-col justify-between top-0 w-screen h-screen"
      onClick={() => {
        props.setIsStart(true);
      }}
    >
      <ul className="bg-white border-[2px] mt-[10vh] mx-[15vw] tracking-[0.1vw] text-[2.5vw] font-MaplestoryBold rounded-[16px] py-[1.5vw] ">
        <h1 className="mb-[2vh]">단어에 맞는 그림으로 이동시켜주세요!</h1>
        <li>기기를 기울이거나, 버튼을 눌러 이동시킬 수 있어요!</li>
      </ul>
      <div className="mb-[15vh] animate-bounce text-mainAmber-700 font-MaplestoryBold text-[10vw] text-shadow-loading shadow-white">
        시 작!
      </div>
    </div>
  );
};

export default Intro;
