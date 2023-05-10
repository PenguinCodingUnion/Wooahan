import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";
import openedSeashell from "assets/images/bubble/opened_seashell.png";
import closedSeashell from "assets/images/bubble/closed_seashell.png";

export const AnswerCard = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const correct = document.getElementById("correct");
    const wrong = document.getElementById("wrong");
    setTimeout(() => {
      setIsOpened(true);
    }, 500);
    if (props.name === props.answer) {
      setTimeout(() => {
        props.closeCard();
        props.changeQuiz();
      }, 2500);
      correct.play();
    } else if (props.name !== props.answer) {
      setTimeout(() => {
        props.closeCard();
      }, 2500);
      wrong.play();
    }
  }, [props]);

  return (
    <div className="grid w-screen h-screen">
      <ReactAudioPlayer src={correct} volume={1} id="correct" />
      <ReactAudioPlayer src={wrong} volume={1} id="wrong" />
      <div className="relative grid items-center self-center h-3/4">
        {!isOpened && (
          <img
            className="absolute w-[36rem] left-1/2 -ml-[18rem] top-1/4"
            src={closedSeashell}
            alt="img"
          />
        )}
        {isOpened && (
          <>
            <img
              className="absolute w-[42rem] left-1/2 -ml-[21rem] mt-2"
              src={openedSeashell}
              alt="img"
            />
            <div className="absolute grid grid-rows-4 -ml-40 overflow-hidden shadow-lg bg-mainPink-200 justify-items-center h-80 rounded-3xl w-80 shadow-mainBlack left-1/2">
              <div className="grid self-end row-span-3">
                <div
                  className="overflow-hidden h-52 w-60"
                  style={{
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                ></div>
              </div>
              <div className="grid self-center row-span-1 text-5xl font-bold font-netmarbleB">
                <div className="">{props.name}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

AnswerCard.propTypes = {
  //   second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerCard);
