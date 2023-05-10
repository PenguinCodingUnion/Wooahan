import React, { useEffect, useState } from "react";
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
import instance from "util/Axios";
import LoadingComponent from "components/common/LoadingComponent";

export const GameBubble = (props) => {
  // 백에 요청할 자리
  const sampleQuiz = [
    {
      answer: "비행기",
      answerImg: airplane,
      cards: [
        { name: "개미", imgUrl: ant },
        { name: "나비", imgUrl: butterfly },
        { name: "비행기", imgUrl: airplane },
        { name: "닭", imgUrl: chicken },
      ],
    },
    {
      answer: "개미",
      answerImg: ant,
      cards: [
        { name: "강아지", imgUrl: dog },
        { name: "개미", imgUrl: ant },
        { name: "나비", imgUrl: butterfly },
        { name: "닭", imgUrl: chicken },
      ],
    },
    {
      answer: "나비",
      answerImg: butterfly,
      cards: [
        { name: "닭", imgUrl: chicken },
        { name: "강아지", imgUrl: dog },
        { name: "비행기", imgUrl: airplane },
        { name: "나비", imgUrl: butterfly },
      ],
    },
    {
      answer: "닭",
      answerImg: chicken,
      cards: [
        { name: "닭", imgUrl: chicken },
        { name: "비행기", imgUrl: airplane },
        { name: "나비", imgUrl: butterfly },
        { name: "강아지", imgUrl: dog },
      ],
    },
    {
      answer: "강아지",
      answerImg: dog,
      cards: [
        { name: "개미", imgUrl: ant },
        { name: "강아지", imgUrl: dog },
        { name: "나비", imgUrl: butterfly },
        { name: "닭", imgUrl: chicken },
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
  const [isLoading, setIsLoading] = useState(true);
  const [round, setRound] = useState(0);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [clickedNumber, setClickedNumber] = useState(0);
  const [isBubbleOpen, setIsbubbleOpen] = useState([true, true, true, true]);
  const [isGameEnd, setIsGameEnd] = useState(false);
  const [quizData, setQuizData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      await instance
        .get("/game/bubble/0")
        .then((response) => { 
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          setQuizData(response);
        })
        .catch((error) => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          setQuizData(sampleQuiz);
        });
    };
    loadData();
  }, []);

  const closeIntro = () => {
    if (quizData.length !== 0) {
      setIsIntro(false);
    }
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
      {isLoading && <LoadingComponent />}
      {!isLoading && isIntro && !isGameEnd && (
        <BubbleIntro closeIntro={closeIntro} pos={pos} />
      )}

      {!isLoading && !isIntro && !isGameEnd && (
        <div
          className="fixed w-screen h-screen mx-auto"
          style={{
            background: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <QuizCard
            name={quizData[round].answer}
            image={quizData[round].answerImg}
          />

          {quizData[round].cards.map((card, index) => (
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
              answer={quizData[round].answer}
              name={quizData[round].cards[clickedNumber].name}
              image={quizData[round].cards[clickedNumber].imgUrl}
              changeQuiz={changeQuiz}
              closeCard={closeCard}
            />
          )}
        </div>
      )}
      {!isLoading && !isIntro && isGameEnd && <Navigate to={`/ending`} />}
    </>
  );
};

GameBubble.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameBubble);
