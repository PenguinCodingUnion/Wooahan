import React, { useState } from "react";
import { connect } from "react-redux";

import bgBubble from "assets/images/structure_bubble.png";
import classNames from "classnames";

export const WordBubble = (props) => {
  const [doBubblePop, setDoBubblePop] = useState("");
  const classStr = classNames(
    "absolute grid items-center text-3xl font-extrabold justify-items-center font-MaplestoryBold",
    props.positionX,
    props.positionY,
    props.size,
    props.animation,
    doBubblePop
  );

  const clickAnswer = () => {
    if (props.clickAnswer) {
      setDoBubblePop("animate-bubblePop");
      setTimeout(() => {
        props.clickAnswer(props.number);
      }, 500);
    }
  };
  return (
    <>
      {props.display && (
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
      )}
    </>
  );
};

WordBubble.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WordBubble);
