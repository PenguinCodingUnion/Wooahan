import React from "react";
import { connect } from "react-redux";
import bgImage from "assets/images/background-underwater.jpg";
import QuizCard from "./QuizCard";
import WordBubble from "./WordBubble";
import airplane from "assets/images/sample/airplane.jpg";

export const BubbleIntro = (props) => {
  const sampleQuiz = [
    {
      name: "비행기",
      image: airplane,
    },
  ];
  const pos = [
    {
      posX: "top-12",
      posY: "left-36",
      size: "w-24 h-24",
    },
    {
      posX: "top-16",
      posY: "right-12",
      size: "w-36 h-36",
    },
    {
      posX: "bottom-12",
      posY: "left-16",
      size: "w-28 h-28",
    },
    {
      posX: "bottom-12",
      posY: "right-24",
      size: "w-32 h-32",
    },
  ];

  const startGame = () => {
    props.closeIntro();
  };

  return (
    <>
      <div className="absolute z-20 h-10 -ml-48 text-xl leading-10 bg-white border border-black left-1/2 rounded-xl w-96 top-10">
        그림에 맞는 단어 방울을 터트리세요.
      </div>
      <div className="absolute z-10 w-screen h-screen bg-black bg-opacity-50"></div>
      <div
        className="absolute w-screen h-screen mx-auto"
        style={{
          background: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <QuizCard name={sampleQuiz[0].name} image={sampleQuiz[0].image} />
        <WordBubble
          positionX={pos[0].posX}
          positionY={pos[0].posY}
          size={pos[0].size}
        />
        <WordBubble
          positionX={pos[1].posX}
          positionY={pos[1].posY}
          size={pos[1].size}
        />
        <WordBubble
          positionX={pos[2].posX}
          positionY={pos[2].posY}
          size={pos[2].size}
        />
        <WordBubble
          positionX={pos[3].posX}
          positionY={pos[3].posY}
          size={pos[3].size}
        />
      </div>
      <div
        className="absolute text-6xl text-[#6937A1] z-20 font-extrabold bottom-10  w-56 left-1/2 -ml-28"
        onClick={startGame}
      >
        시작!
      </div>
    </>
  );
};

BubbleIntro.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BubbleIntro);
