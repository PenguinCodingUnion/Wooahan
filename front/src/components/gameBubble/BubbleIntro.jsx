import React from "react";
import { connect } from "react-redux";
import bgImage from "assets/images/background_underwater.jpg";
import WordBubble from "./WordBubble";

export const BubbleIntro = (props) => {
  const startGame = () => {
    props.closeIntro();
  };

  return (
    <div className="fixed w-screen h-screen">
      <div className="absolute z-20 w-screen h-10 text-4xl leading-10 -translate-x-1/2 top-16 font-netmarbleB left-1/2">
        그림에 맞는 단어 방울을 터트리세요!
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
        <p className="absolute z-20 text-7xl font-extrabold -translate-x-1/2 top-1/3 left-1/2 font-MaplestoryBold">
          시작
        </p>
        <p className=" absolute z-30 w-full animate-pulse font-MaplestoryBold text-7xl top-1/3 text-stroke-2 text-stroke-mainYellow-100">
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
