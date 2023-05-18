import React from "react";

const QuizWord = (props) => {
  return (
    <div className="absolute z-20 top-[5vh] w-screen flex box-shadow justify-center">
      <div className="font-MaplestoryBold bg-[#d9d9d9] bg-opacity-60 px-[3vw] text-shadow-sm shadow-mainBlack text-mainOrange-600 rounded-[16px] pt-[0.4vw] text-[min(6vw,20vh)] tracking-[0.5vw]">
        {props.word}
      </div>
    </div>
  );
};

export default QuizWord;
