import PropTypes from "prop-types";
import React, { useState } from "react";
import { connect } from "react-redux";
import TrainAnswerCard from "./TrainAnswerCard";
import train from "assets/images/train/structure_train.png";

export const TrainWordCard = (props) => {
  const [word, setWord] = useState();
  const [trainclass, setTrainClass] = useState(
    "absolute w-[45rem] h-[10.5rem] -right-14 bottom-0"
  );
  const [wordclass, setWordClass] = useState(
    "grid grid-cols-2 whitespace-nowrap items-center w-[21rem] h-[10.5rem] right-2 bottom-0 text-[3.3rem]  absolute font-netmarbleB"
  );

  const changeTrainClass = () => {
    setTrainClass(
      "absolute w-[45rem] h-[10.5rem] -right-14 bottom-0 animate-oneTrain"
    );
    setWordClass(
      "grid grid-cols-2 items-center  whitespace-nowrap w-[21rem] h-[10.5rem] right-2 bottom-0 text-[3.3rem]  absolute font-netmarbleB animate-oneTrain"
    );
  };

  const resetClass = () => {
    setTrainClass("absolute w-[45rem] h-[10.5rem] -right-14 bottom-0");
    setWordClass(
      "grid grid-cols-2 items-center w-[21rem] h-[10.5rem] right-2 bottom-0 text-[3.3rem]  absolute font-netmarbleB"
    );
  };
  const goAnswer = (props) => {
    setWord(props);
  };

  const cleanWord = (pick) => {
    setWord("");
  };
  return (
    <div>
      <div className={trainclass}>
        <img src={train} alt="train" />
      </div>
      <div className={wordclass}>
        <div
          onClick={() => {
            goAnswer(props.data.word1);
          }}
        >
          {props.data.word1.name}
        </div>
        <div
          onClick={() => {
            goAnswer(props.data.word2);
          }}
        >
          {props.data.word2.name}
        </div>
      </div>
      {word && (
        <TrainAnswerCard
          word={word}
          ans={props.data.ans}
          cleanWord={cleanWord}
          nextGame={props.nextGame}
          changeTrainClass={changeTrainClass}
          resetClass={resetClass}
        />
      )}
    </div>
  );
};

TrainWordCard.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainWordCard);
