import React, { useEffect } from "react";
import { connect } from "react-redux";

export const AnswerCard = (props) => {
  useEffect(() => {
    setTimeout(() => props.closeCard(), 1500);
  }, [props]);

  return (
    <div className="w-screen h-screen">
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
