import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import bgImage from "assets/images/background_underwater.jpg";
import QuizCard from "components/gameBubble/QuizCard";
import WordBubble from "components/gameBubble/WordBubble";
import AnswerCard from "components/gameBubble/AnswerCard";

import BubbleIntro from "components/gameBubble/BubbleIntro";
import { Navigate } from "react-router-dom";

import useSound from "util/hooks/useSound";
import bgm from "assets/sounds/bubblebgm.mp3";

import instance from "util/Axios";
import LoadingComponent from "components/common/LoadingComponent";
import { commonActions } from "store/features/common/commonSlice";
import WarningComponent from "components/common/WarningComponent";

export const GameBubble = (props) => {
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
  const [isQuizCardOpen, setIsQuizCardOpen] = useState(true);
  const [showXButton, setShowXButton] = useState(false);

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
        });
    };
    loadData();
  }, []);

  const closeIntro = () => {
    if (quizData.length !== 0) {
      setIsIntro(false);
    }
  };

  const closeTutorial = () => {
    setShowXButton(true);
  }

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
      setIsQuizCardOpen(false);
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
      setClickedNumber(num);
      setIsCardOpen(true);
    }
  };

  const closeCard = () => {
    setIsCardOpen(false);
    setIsQuizCardOpen(true);
  };

  useSound(bgm, 0.4, 2000);

  const warning = useSelector((state) => state.common.warning);
  const dispatch = useDispatch();
  const warn = () => {
    dispatch(commonActions.setWarning());
  };
  return (
    <>
      {isLoading && <LoadingComponent />}
      {!isLoading && isIntro && !isGameEnd && (
        <BubbleIntro closeIntro={closeIntro} pos={pos} closeTutorial={closeTutorial} />
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
          {isQuizCardOpen && (
            <QuizCard
              name={quizData[round].answer}
              image={quizData[round].answerImg}
            />
          )}

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
      {showXButton && (
        <div>
          <div
            onClick={() => {
              warn();
            }}
            className="absolute h-10 w-10 right-[3%] top-[3%] rounded-lg bg-white bg-opacity-40 font-MaplestoryLight text-4xl"
          >
            <p>X</p>
          </div>
        </div>
      )}

      {warning && <WarningComponent />}
      {!isLoading && !isIntro && isGameEnd && (
        <Navigate
          to={`/ending`}
          state={{ game: "bubble", character: "penguin" }}
        />
      )}
    </>
  );
};

GameBubble.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameBubble);
