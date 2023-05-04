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
import BubbleIntro from "components/gameBubble/BubbleIntro";
import { Navigate } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

import bgm from "assets/sounds/bubblebgm.mp3";

export const GameBubble = (props) => {
  // 백에 요청할 자리
  const sampleQuiz = [
    {
      answer: "비행기",
      image: airplane,
      cards: [
        { name: "개미", image: ant },
        { name: "나비", image: butterfly },
        { name: "비행기", image: airplane },
        { name: "닭", image: chicken },
      ],
    },
    {
      answer: "개미",
      image: ant,
      cards: [
        { name: "강아지", image: dog },
        { name: "개미", image: ant },
        { name: "나비", image: butterfly },
        { name: "닭", image: chicken },
      ],
    },
    {
      answer: "나비",
      image: butterfly,
      cards: [
        { name: "닭", image: chicken },
        { name: "강아지", image: dog },
        { name: "비행기", image: airplane },
        { name: "나비", image: butterfly },
      ],
    },
    {
      answer: "닭",
      image: chicken,
      cards: [
        { name: "닭", image: chicken },
        { name: "비행기", image: airplane },
        { name: "나비", image: butterfly },
        { name: "강아지", image: dog },
      ],
    },
    {
      answer: "강아지",
      image: dog,
      cards: [
        { name: "개미", image: ant },
        { name: "강아지", image: dog },
        { name: "나비", image: butterfly },
        { name: "닭", image: chicken },
      ],
    },
  ];

  const pos = [
    {
      posX: "top-12",
      posY: "left-24",
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
      posX: "bottom-4",
      posY: "right-24",
      size: "w-32 h-32",
    },
  ];

  const [isIntro, setIsIntro] = useState(true);
  const [round, setRound] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(0);
  const [isBubbleOpen, setIsbubbleOpen] = useState([true, true, true, true]);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const closeIntro = () => {
    setIsIntro(false);
  };

  const changeQuiz = () => {
    if (round === 4) {
      setIsGameEnd(true);
      return;
    }
    setRound(round + 1);
    setIsCardOpen(false);
    setIsbubbleOpen([true, true, true, true]);
  };

  const clickAnswer = (num) => {
    if (!isCardOpen) {
      // eslint-disable-next-line default-case
      switch (num) {
        case 0:
          setIsbubbleOpen([
            false,
            isBubbleOpen[1],
            isBubbleOpen[2],
            isBubbleOpen[3],
          ]);
          break;
        case 1:
          setIsbubbleOpen([
            isBubbleOpen[0],
            false,
            isBubbleOpen[2],
            isBubbleOpen[3],
          ]);
          break;
        case 2:
          setIsbubbleOpen([
            isBubbleOpen[0],
            isBubbleOpen[1],
            false,
            isBubbleOpen[3],
          ]);
          break;
        case 3:
          setIsbubbleOpen([
            isBubbleOpen[0],
            isBubbleOpen[1],
            isBubbleOpen[2],
            false,
          ]);
          break;
      }
      if (sampleQuiz[round].cards[num].name === sampleQuiz[round].answer) {
      }

      setClickedNumber(num);
      setIsCardOpen(true);
    }
  };

  const closeCard = () => {
    setIsCardOpen(false);
  };

  return (
    <>
      <ReactAudioPlayer src={bgm} autoPlay={true} volume={1} loop />
      {isIntro && !isGameEnd && (
        <BubbleIntro
          closeIntro={closeIntro}
          name={sampleQuiz[0].answer}
          image={sampleQuiz[0].image}
          pos={pos}
        />
      )}
      {!isIntro && !isGameEnd && (
        <div
          className="fixed w-screen h-screen mx-auto"
          style={{
            background: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <QuizCard
            name={sampleQuiz[round].answer}
            image={sampleQuiz[round].image}
          />

          {sampleQuiz[round].cards.map((card, index) => (
            <WordBubble
              key={card.name}
              number={index}
              name={card.name}
              positionX={pos[index].posX}
              display={isBubbleOpen[index]}
              positionY={pos[index].posY}
              size={pos[index].size}
              clickAnswer={clickAnswer}
            />
          ))}
          {isCardOpen && (
            <AnswerCard
              answer={sampleQuiz[round].answer}
              name={sampleQuiz[round].cards[clickedNumber].name}
              image={sampleQuiz[round].cards[clickedNumber].image}
              changeQuiz={changeQuiz}
              closeCard={closeCard}
            />
          )}
        </div>
      )}
      {!isIntro && isGameEnd && <Navigate to={`/ending`} />}
    </>
  );
};

GameBubble.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameBubble);
