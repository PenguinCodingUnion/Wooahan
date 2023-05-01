import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";

export const TrainAnswerCard = (props) => {
  useEffect(() => {
    if (props.word.word === props.ans) {
      setTimeout(() => {
        props.cleanWord(props.word.word);
        props.nextGame();
        props.resetClass();
      }, 1500);
      props.changeTrainClass();
    } else {
      setTimeout(() => props.cleanWord(props.word.word), 1500);
    }
  }, [props]);
  return (
    <div className="rounded-xl absolute top-1/2 left-1/2 h-72 w-72 -mt-36 -ml-36  bg-mainRed-200">
      <p className="h-20 leading-[5rem] text-[4rem] text-center top-0 font-netmarbleB">
        {props.word.word}
      </p>
      <img className="h-48 w-48 mx-auto" src={props.word.img} alt="사진"></img>
    </div>
  );
};

TrainAnswerCard.propTypes = {
  // second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainAnswerCard);
