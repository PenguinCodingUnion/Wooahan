import React, { useEffect } from "react";
import { connect } from "react-redux";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";
import fox from "assets/images/animal/fox.png";
import effectSound from "util/effectSound";

export const TrainAnswerCard = (props) => {
  const es_correct = effectSound(correct, 1);
  const es_wrong = effectSound(wrong, 1);

  useEffect(() => {
    if (props.word.name === props.ans) {
      es_correct.play();
      setTimeout(() => {
        props.cleanWord(props.word.name);
        props.nextGame();
        props.resetClass();
      }, 1500);
      props.changeTrainClass();
    } else {
      es_wrong.play();
      // setTimeout(() => props.cleanWord(props.word.word), 1500);
    }
  }, []);
  return (
    <div>
      <div className="absolute top-0 w-screen h-screen bg-opacity-40 bg-mainGray-300"></div>
      <div>
        <img
          className="absolute w-96 h-72 left-3 top-1/4"
          src={fox}
          alt="fox"
        />
        <div className="absolute top-1/3 right-0 h-[30rem] w-[30rem] -mt-36 bg-[url('assets/images/woodsign.png')]">
          <div className="w-64 h-64 mt-8 ml-24 shadow-lg bg-mainOrange-100 shadow-mainSlate-900 rounded-xl">
            <div className="h-5"></div>
            <div className="w-48 h-40 mx-auto bg-white">
              <img
                className="w-48 h-40 mx-auto"
                src={props.word.imgUrl}
                alt="단어사진"
              ></img>
            </div>
            <p className=" h-20 leading-[4.5rem] text-[3.3rem] text-center font-netmarbleB">
              {props.word.name}
            </p>
          </div>
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
