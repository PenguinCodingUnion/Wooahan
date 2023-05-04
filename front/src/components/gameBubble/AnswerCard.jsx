import React, { useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";

export const AnswerCard = (props) => {
  useEffect(() => {
    const correct = document.getElementById("correct");
    const wrong = document.getElementById("wrong");
    if (props.name === props.answer) {
      setTimeout(() => {
        props.closeCard();
        props.changeQuiz();
      }, 1500);
      correct.play();
    } else if (props.name !== props.answer) {
      setTimeout(() => props.closeCard(), 1500);
      wrong.play();
    }
  }, [props]);

  return (
    <div className="w-screen h-screen">
      <ReactAudioPlayer src={correct} volume={1} id="correct" />
      <ReactAudioPlayer src={wrong} volume={1} id="wrong" />
      <div className="absolute grid -mt-40 -ml-40 overflow-hidden border-4 border-mainBlack bg-mainWhite justify-items-center h-80 rounded-3xl top-1/2 left-1/2 w-80">
        <div
          className="h-64 overflow-hidden w-80"
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="h-16 text-5xl font-bold leading-16 font-netmarbleB">
          {props.name}
        </div>
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
