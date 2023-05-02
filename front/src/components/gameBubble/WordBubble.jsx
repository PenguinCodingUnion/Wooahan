import React, { useState } from "react";
import { connect } from "react-redux";

import bgBubble from "assets/images/structure_bubble.png";
import classNames from "classnames";

export const WordBubble = (props) => {
  const [styleStr, setStyleStr] = useState({
    backgroundImage: `url(${bgBubble})`,
    backgroundSize: `cover`,
  });
  const classStr = classNames(
    "absolute grid items-center text-3xl font-extrabold justify-items-center font-MaplestoryBold",
    props.positionX,
    props.positionY,
    props.size,
    props.animation
  );

  const clickAnswer = () => {
    if (props.clickAnswer) {
      setStyleStr({
        backgroundImage: `url(${bgBubble})`,
        backgroundSize: `cover`,
        transition: `.4s ease-out`,
        transform: `scale(3) `,
        opacity: 0,
      });
      setTimeout(() => {
        props.clickAnswer(props.number);
        setStyleStr({
          backgroundImage: `url(${bgBubble})`,
          backgroundSize: `cover`,
          transform: `scale(1)`,
          opacity: 1,
        });
      }, 500);
    }
  };
  return (
    <>
      {props.display && (
        <div className={classStr} style={styleStr} onClick={clickAnswer}>
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
