import React, { useState } from "react";
import { connect } from "react-redux";
import bgImage from "assets/images/background_underwater.jpg";
import WordBubble from "./WordBubble";
import BubbleTutorial from "./BubbleTutorial";

export const BubbleIntro = (props) => {
  const [isTutorial, setIstutorial] = useState(true);
  const closeTutorial = () => {
    setIstutorial(false);
    props.closeTutorial();
  };
  const startGame = () => {
    props.closeIntro();
  };

  return (
    <div className="fixed w-screen h-screen">
      {isTutorial && <BubbleTutorial closeTutorial={closeTutorial} />}
      <div className="absolute z-20 w-screen h-10 text-4xl leading-10 -translate-x-1/2 top-16 font-netmarbleB left-1/2">
        펭글이가 조개를 주우러 바닷속에 왔어요!
      </div>
      <div
        className="absolute w-screen h-screen mx-auto"
        style={{
          background: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {props.pos.map((card, index) => (
          <WordBubble
            key={index}
            positionX={card.posX}
            positionY={card.posY}
            size={card.size}
            display={true}
            animation={"animate-intro"}
          />
        ))}
      </div>
      <div onClick={startGame}>
        <p className="absolute z-20 font-extrabold -translate-x-1/2 text-7xl top-1/3 left-1/2 font-MaplestoryBold">
          시작
        </p>
        <p className="absolute z-30 w-full animate-pulse font-MaplestoryBold text-7xl top-1/3 text-stroke-2 text-stroke-mainYellow-100">
          시작
        </p>
      </div>
    </div>
  );
};

BubbleIntro.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BubbleIntro);
