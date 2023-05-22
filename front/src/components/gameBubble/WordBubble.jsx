import React, { useState } from "react";
import { connect } from "react-redux";

import bgBubble from "assets/images/structure_bubble.png";
import classNames from "classnames";
import bubblepop from "assets/sounds/bubblepop.mp3";
import effectSound from 'util/effectSound';

export const WordBubble = (props) => {
  const [styleStr, setStyleStr] = useState({
    backgroundImage: `url(${bgBubble})`,
    backgroundSize: `cover`,
  });
  const classStr = classNames(
    "absolute grid whitespace-nowrap items-center text-4xl font-extrabold justify-items-center font-MaplestoryBold",
    props.positionX,
    props.positionY,
    props.size,
    props.animation
  );

  const es = effectSound(bubblepop, 1);

  const clickAnswer = () => {
    if (props.clickAnswer) {
      setStyleStr({
        backgroundImage: `url(${bgBubble})`,
        backgroundSize: `cover`,
        transition: `.4s ease-out`,
        transform: `scale(3) `,
        opacity: 0,
      });
      es.play();
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
