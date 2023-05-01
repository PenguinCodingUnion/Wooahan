import React from "react";
import { connect } from "react-redux";

export const QuizCard = (props) => {
  return (
    <div
      className="absolute w-64 h-64 -mt-32 -ml-32 bg-white border-4 border-black rounded-3xl top-1/2 left-1/2"
      style={{
        backgroundImage: `url(${props.image})`,
        backgroundSize: "cover",
        width: "16rem",
        backgroundRepeat: "no-repeat",
      }}
      onClick={props.changeQuiz}
    ></div>
  );
};

QuizCard.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCard);
