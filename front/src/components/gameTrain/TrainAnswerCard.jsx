import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";

export const TrainAnswerCard = (props) => {
  const [sound, setsound] = useState(<></>);

  useEffect(() => {
    if (props.word.name === props.ans) {
      setTimeout(() => {
        props.cleanWord(props.word.name);
        props.nextGame();
        props.resetClass();
      }, 1500);
      props.changeTrainClass();
      setsound(<ReactAudioPlayer src={correct} autoPlay volume={1} />);
    } else {
      setTimeout(() => props.cleanWord(props.word.word), 1500);
      setsound(<ReactAudioPlayer src={wrong} autoPlay volume={1} />);
    }
  }, [props]);
  return (
    <div className="rounded-xl absolute top-1/2 left-1/2 h-72 w-72 -mt-36 -ml-36  bg-mainRed-200">
      <p className="h-20 leading-[5rem] text-[4rem] text-center top-0 font-netmarbleB">
        {props.word.name}
      </p>
      <img
        className="h-48 w-48 mx-auto"
        src={props.word.imgUrl}
        alt="사진"
      ></img>
      <div>{sound}</div>
    </div>
  );
};

TrainAnswerCard.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainAnswerCard);
