import React from "react";
import { connect } from "react-redux";
import bgImage from "assets/images/background-underwater.jpg";
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
      <div
        className="absolute z-20 text-6xl font-extrabold -translate-x-1/2 top-1/3 left-1/2 font-MaplestoryBold"
        onClick={startGame}
      >
        시작
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
