import React from "react";
import { connect } from "react-redux";

import bgBubble from "assets/images/structure_bubble.png";
import classNames from "classnames";

export const WordBubble = (props) => {
  const classStr = classNames(
    "absolute grid items-center text-3xl font-extrabold justify-items-center",
    props.positionX,
    props.positionY,
    props.size
  );

  const clickAnswer = () => {
    props.clickAnswer(props.number);
  };
  return (
    <div
      className={classStr}
      style={{
        backgroundImage: `url(${bgBubble})`,
        backgroundSize: "cover",
      }}
      onClick={clickAnswer}
    >
      {props.name}
    </div>
  );
};

WordBubble.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBubble);
