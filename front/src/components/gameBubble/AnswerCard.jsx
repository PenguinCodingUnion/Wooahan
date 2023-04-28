import React, { useEffect } from "react";
import { connect } from "react-redux";

export const AnswerCard = (props) => {
  useEffect(() => {
    if (props.name === props.answer) {
      console.log("정답");
      setTimeout(() => {
        props.closeCard();
        props.changeQuiz();
      }, 1500);
    } else {
      setTimeout(() => props.closeCard(), 1500);
    }
  }, [props]);

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
        ></div>
        <div className="h-8 text-5xl font-bold leading-8 font-netmarbleB">
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
