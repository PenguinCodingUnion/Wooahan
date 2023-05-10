import React, { useEffect, useRef, useState } from "react";

const QuizResult = (props) => {
  const result = props.result;
  const ratio = window.innerWidth / window.innerHeight;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        props.setQuizCount((count) => count + 1);
        props.setQuizStatus("nextQuiz");
      }, 2000);
    }
  }, [visible]);

  return (
    <div className="absolute w-screen h-screen top-0 flex flex-col justify-center items-center z-[60]">
      {visible ? (
        <>
          <div className="border-[4px] rounded-[16px] animate-scale-up-center bg-white">
            <img
              className="rounded-t-[12px]"
              style={{
                width: ratio > 1 ? 67.5 / ratio + "vw" : 67.5 * ratio + "vh",
                height: ratio > 1 ? 67.5 / ratio + "vw" : 67.5 * ratio + "vh",
              }}
              src={result.word.imgUrl}
              alt="#"
            />
            <p
              style={{
                width: ratio > 1 ? 67.5 / ratio + "vw" : 67.5 * ratio + "vh",
                height: ratio > 1 ? 20 / ratio + "vw" : 20 * ratio + "vh",
              }}
              className="h-[15vh] rounded-b-[12px] bg-white flex justify-center items-center font-MaplestoryBold text-[6vw] tracking-[1vw] border-t-4"
            >
              {result.word.name}
            </p>
          </div>
        </>
      ) : // </div>
      result.answer === true ? (
        <div
          className="font-MaplestoryBold text-mainIndigo-600 animate-scale-up-center"
          style={{
            fontSize: ratio > 1 ? 66 / ratio + "vw" : 75 * ratio + "vh",
          }}
        >
          O
        </div>
      ) : (
        <div
          className="font-MaplestoryBold text-red animate-scale-up-center"
          style={{
            fontSize: ratio > 1 ? 66 / ratio + "vw" : 75 * ratio + "vh",
          }}
        >
          X
        </div>
      )}
    </div>
  );
};

export default QuizResult;
