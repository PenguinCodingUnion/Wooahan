import { Howl } from "howler";
import React, { useEffect, useRef, useState } from "react";
import correct from "assets/sounds/correct.wav";
import incorrect from "assets/sounds/wrong.wav";

const QuizResult = (props) => {
  const result = props.result;
  const ratio = window.innerWidth / window.innerHeight;

  const [visible, setVisible] = useState(false);
  const [soundload, setSoundload] = useState(false);
  const [imageLoadState, setImageLoadState] = useState(false);

  useEffect(() => {
    if (soundload) {
      setTimeout(() => {
        setVisible(true);
      }, 2000);
    }
  }, [soundload]);

  // useEffect(() => {
  //   if (visible) {
  //     setTimeout(() => {
  //       props.setQuizCount((count) => count + 1);
  //       props.setQuizStatus("nextQuiz");
  //     }, 2000);
  //   }
  // }, [visible]);

  useEffect(() => {
    if (!imageLoadState) return;

    const wordSound = new Howl({
      src: require(`assets/sounds/word/${result.word.name}.mp3`),
      autoplay: true,
      loop: false,
      volume: 1,
      preload: true,
      rate: 0.92,
      onend: () => {
        setTimeout(() => {
          props.setQuizCount((count) => count + 1);
          props.setQuizStatus("nextQuiz");
        }, 1000);
      },
    });
    // 음성파일 연결할때 setTimeout 시간부분을 음성파일 길이로 설정

    return () => {
      wordSound.unload();
    };
  }, [imageLoadState]);

  // 정답 오답 사운드
  useEffect(() => {
    const resSound = new Howl({
      src: result.answer ? correct : incorrect,
      volume: 1,
      preload: true,
      onload: () => {
        setSoundload(true);
        resSound.seek(result.answer ? 0.3 : 0.1);
        resSound.play();
      },
    });

    return () => {
      resSound.unload();
    };
  }, []);

  return (
    soundload && (
      <div className="absolute w-screen h-screen top-0 flex flex-col justify-center items-center z-[60]">
        {visible ? (
          <>
            <div
              className={`${
                imageLoadState ? "animate-scale-up-center" : "hidden"
              } border-[4px] rounded-[16px] bg-white`}
            >
              <img
                className="rounded-t-[12px]"
                style={{
                  width: ratio > 1 ? "min(40vw, 70vh)" : "min(40vh, 70vw)",
                  height: ratio > 1 ? "min(40vw, 70vh)" : "min(40vh, 70vw)",
                }}
                src={result.word.imgUrl}
                alt="#"
                onLoad={() => setImageLoadState(true)}
              />
              <p
                style={{
                  width: ratio > 1 ? "min(40vw, 70vh)" : "min(40vh, 70vw)",
                  height: ratio > 1 ? "min(12vw, 20vh)" : "min(12vh, 20vw)",
                  fontSize: ratio > 1 ? "min(6vw, 8vh)" : "min(6vh, 8vw)",
                }}
                className="h-[15vh] rounded-b-[12px] bg-white flex justify-center items-center font-MaplestoryBold tracking-[1vw] border-t-4"
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
    )
  );
};

export default QuizResult;
