import React from "react";
import { connect } from "react-redux";

export const AnswerCard = (props) => {
  const changeQuiz = () => {
    if (props.number === props.answer) {
      props.changeQuiz();
    } else {
      props.closeCard();
    }
  };
  return (
    <div className="w-screen h-screen">
      <div className="absolute grid -mt-48 -ml-40 overflow-hidden bg-white border-4 border-black justify-items-center h-96 rounded-3xl top-1/2 left-1/2 w-80">
        <div
          className="border h-72 w-80"
          style={{
            backgroundImage: `url(${props.image})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={changeQuiz}
        ></div>
        <div className="h-8 text-5xl font-bold leading-8">{props.name}</div>
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
