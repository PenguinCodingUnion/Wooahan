import React from "react";

const QuizWord = (props) => {
  return (
    <div className="absolute z-20 top-[5vh] w-screen flex justify-center">
      <div className="font-MaplestoryBold bg-beige border-[2px] px-[2vw] rounded-[16px] pt-[1vw] pb-[0.6vw] text-[4.5vw] tracking-[0.5vw]">
        {props.word}
      </div>
    </div>
  );
};

export default QuizWord;
