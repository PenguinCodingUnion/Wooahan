import React, { useState } from "react";
import { connect } from "react-redux";
import bgImage from "assets/images/background-underwater.jpg";
import QuizCard from "components/gameBubble/QuizCard";
import WordBubble from "components/gameBubble/WordBubble";
import AnswerCard from "components/gameBubble/AnswerCard";

import airplane from "assets/images/sample/airplane.jpg";
import ant from "assets/images/sample/ant.jpg";
import butterfly from "assets/images/sample/butterfly.jpg";
import chicken from "assets/images/sample/chicken.jpg";
import dog from "assets/images/sample/dog.jpg";

export const GameBubble = (props) => {
  const sampleQuiz = [
    {
      name: "비행기",
      image: airplane,
    },
    {
      name: "개미",
      image: ant,
    },
    {
      name: "나비",
      image: butterfly,
    },
    {
      name: "닭",
      image: chicken,
    },
    {
      name: "강아지",
      image: dog,
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

  const [number, setNumber] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(0);
  const [isFirstCardOpen, setFirstCardOpen] = useState(true);
  const [isSecondCardOpen, setSecondCardOpen] = useState(true);
  const [isThirdCardOpen, setThirdCardOpen] = useState(true);
  const [isFourthCardOpen, setFourthCardOpen] = useState(true);

  const selected = [];
  const visited = new Array(4).fill(false);
  while (selected.length < 4) {
    const ranNum = Math.floor(Math.random() * (4 - 0));
    if (!visited[ranNum]) {
      selected.push(ranNum);
      visited[ranNum] = true;
    }
  }

  const changeQuiz = () => {
    setNumber((number + 1) % 5);
    setIsCardOpen(false);
    setFirstCardOpen(true);
    setSecondCardOpen(true);
    setThirdCardOpen(true);
    setFourthCardOpen(true);
  };

  const clickAnswer = (num) => {
    if (!isCardOpen) {
      if (num === number) {
        setFirstCardOpen(false);
      }
      if (num === (number + 1) % 5) {
        setSecondCardOpen(false);
      }
      if (num === (number + 2) % 5) {
        setThirdCardOpen(false);
      }
      if (num === (number + 3) % 5) {
        setFourthCardOpen(false);
      }
      setClickedNumber(num);
      setIsCardOpen(true);
    }
  };

  const closeCard = () => {
    setIsCardOpen(false);
  };

  return (
    <div
      className="w-screen h-screen mx-auto"
      style={{
        background: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <QuizCard
        name={sampleQuiz[number].name}
        image={sampleQuiz[number].image}
      />
      {isFirstCardOpen && (
        <WordBubble
          number={number}
          name={sampleQuiz[number].name}
          positionX={pos[selected[0]].posX}
          positionY={pos[selected[0]].posY}
          size={pos[selected[0]].size}
          clickAnswer={clickAnswer}
        />
      )}

      {isSecondCardOpen && (
        <WordBubble
          number={(number + 1) % 5}
          name={sampleQuiz[(number + 1) % 5].name}
          positionX={pos[selected[1]].posX}
          positionY={pos[selected[1]].posY}
          size={pos[selected[1]].size}
          clickAnswer={clickAnswer}
        />
      )}

      {isThirdCardOpen && (
        <WordBubble
          number={(number + 2) % 5}
          name={sampleQuiz[(number + 2) % 5].name}
          positionX={pos[selected[2]].posX}
          positionY={pos[selected[2]].posY}
          size={pos[selected[2]].size}
          clickAnswer={clickAnswer}
        />
      )}

      {isFourthCardOpen && (
        <WordBubble
          number={(number + 3) % 5}
          name={sampleQuiz[(number + 3) % 5].name}
          positionX={pos[selected[3]].posX}
          positionY={pos[selected[3]].posY}
          size={pos[selected[3]].size}
          clickAnswer={clickAnswer}
        />
      )}

      {isCardOpen && (
        <AnswerCard
          answer={number}
          number={clickedNumber}
          name={sampleQuiz[clickedNumber].name}
          image={sampleQuiz[clickedNumber].image}
          changeQuiz={changeQuiz}
          closeCard={closeCard}
        />
      )}
    </div>
  );
};

GameBubble.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameBubble);
