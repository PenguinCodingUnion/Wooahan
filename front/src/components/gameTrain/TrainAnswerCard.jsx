import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactAudioPlayer from "react-audio-player";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";
import fox from "assets/images/animal/fox.png";

export const TrainAnswerCard = (props) => {
  useEffect(() => {
    const correctSound = document.getElementById("correct");
    const wrongSound = document.getElementById("wrong");
    if (props.word.name === props.ans) {
      setTimeout(() => {
        props.cleanWord(props.word.name);
        props.nextGame();
        props.resetClass();
      }, 1500);
      props.changeTrainClass();
      correctSound.play();
    } else {
      setTimeout(() => props.cleanWord(props.word.word), 1500);
      wrongSound.play();
    }
  }, []);
  return (
    <div>
      <div className="absolute top-0 w-screen h-screen bg-opacity-40 bg-mainGray-300"></div>
      <div>
        <img
          className=" w-96 h-72 absolute left-3 top-1/4"
          src={fox}
          alt="fox"
        />
        <div className="absolute top-1/3 right-0 h-[30rem] w-[30rem] -mt-36 bg-[url('assets/images/woodsign.png')]">
          <div className="bg-mainOrange-100 shadow-lg shadow-sharkGray rounded-xl h-64 w-64 mt-8 ml-24">
            <div className="h-5"></div>
            <img
              className="h-40 w-40 mx-auto "
              src={props.word.imgUrl}
              alt="사진"
            ></img>
            <p className=" h-20 leading-[4.5rem] text-[3.3rem] text-center font-netmarbleB">
              {props.word.name}
            </p>
          </div>
          <ReactAudioPlayer src={correct} volume={1} id="correct" />
          <ReactAudioPlayer src={wrong} volume={1} id="wrong" />
        </div>
      </div>
    </div>
  );
};

TrainAnswerCard.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainAnswerCard);
