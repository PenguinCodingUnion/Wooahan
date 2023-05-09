import React, { useState } from "react";
import { connect } from "react-redux";

import bgBubble from "assets/images/structure_bubble.png";
import classNames from "classnames";
import ReactAudioPlayer from "react-audio-player";
import bubblepop from "assets/sounds/bubblepop.mp3";

export const WordBubble = (props) => {
  const [sound, setsound] = useState(<></>);
  const [styleStr, setStyleStr] = useState({
    backgroundImage: `url(${bgBubble})`,
    backgroundSize: `cover`,
  });
  const classStr = classNames(
    "absolute grid whitespace-nowrap items-center text-3xl font-extrabold justify-items-center font-MaplestoryBold",
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
      setsound(<ReactAudioPlayer src={bubblepop} autoPlay volume={1} />);
      setTimeout(() => {
        props.clickAnswer(props.number);
        setStyleStr({
          backgroundImage: `url(${bgBubble})`,
          backgroundSize: `cover`,
          transform: `scale(1)`,
          opacity: 1,
        });
        setsound(<></>);
      }, 500);
    }
  };
  return (
    <>
      <div>{sound}</div>
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
