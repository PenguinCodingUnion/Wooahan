import React, { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { connect } from "react-redux";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";

export const AnswerCard = (props) => {
  const [sound, setsound] = useState(<></>);

  useEffect(() => {
    if (props.name === props.answer) {
      setTimeout(() => {
        props.closeCard();
        props.changeQuiz();
      }, 1500);
      setsound(<ReactAudioPlayer src={correct} autoPlay volume={1} loop />);
    } else if (props.name !== props.answer) {
      setTimeout(() => props.closeCard(), 1500);
      setsound(<ReactAudioPlayer src={wrong} autoPlay volume={1} />);
    }
  }, [props]);

  return (
    <div className="w-screen h-screen">
      <div>{sound}</div>
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
