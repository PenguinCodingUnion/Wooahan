import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";
import effectSound from "util/effectSound";
import BackgroundImageOnLoad from "background-image-on-load";

export const AnswerCard = (props) => {
  const [isOpened, setIsOpened] = useState(false);
  const [answerGif, setAnswerGif] = useState("");
  const [answerText, setAnswerText] = useState("");
  const [answeBoxStyle, setAnswerBoxStyle] = useState("");
  const [closedBoxSytle, setClosedBoxSytle] = useState("");
  const [closedBox, setClosedBox] = useState("");
  const [openedBox, setOpenedBox] = useState("");
  const [imageLoadState, setImageLoadState] = useState(false);

  const es_word = effectSound(
    require(`assets/sounds/word/${props.name}.mp3`),
    1
  );

  const es_correct = effectSound(correct, 1);
  const es_wrong = effectSound(wrong, 1);
  const gif = [
    require("assets/images/penguel_victory.gif"),
    require("assets/images/penguel_falldown.gif"),
  ];
  const text = ["맞았습니다", "틀렸습니다"];
  const boxStyle = [
    "px-5 py-3 text-2xl bg-mainGreen-600 border-4 border-mainYellow-200 font-netmarbleB rounded-xl text-mainWhite tracking-wider shadow-lg shadow-mainBlack",
    "px-5 py-3 text-2xl bg-mainRed-600 border-4 border-mainYellow-200 font-netmarbleB rounded-xl text-mainWhite tracking-wider shadow-lg shadow-mainBlack",
  ];
  const closedBoxStyleOption = [
    "absolute w-[36rem] left-1/2 -ml-[18rem] top-1/4",
    "absolute w-[26rem] left-1/2 -ml-[13rem] top-[35%]",
  ];

  const closedBoxOption = [
    require("assets/images/bubble/closed_seashell.png"),
    require("assets/images/bubble/closed_seabox.png"),
  ];

  const openedOption = [
    require("assets/images/bubble/opened_seashell.png"),
    require("assets/images/bubble/opened_seabox.png"),
  ];

  useEffect(() => {
    if (props.name === props.answer) {
      setClosedBox(closedBoxOption[0]);
      setOpenedBox(openedOption[0]);
      setClosedBoxSytle(closedBoxStyleOption[0]);
    } else {
      setClosedBox(closedBoxOption[1]);
      setOpenedBox(openedOption[1]);
      setClosedBoxSytle(closedBoxStyleOption[1]);
    }
    setIsOpened(true);

    if (!imageLoadState) {
      return;
    }

    setTimeout(() => {
      es_word.play();
    }, 700);
    if (props.name === props.answer) {
      es_correct.play();
      setAnswerGif(gif[0]);
      setAnswerText(text[0]);
      setAnswerBoxStyle(boxStyle[0]);
      setTimeout(() => {
        props.closeCard();
        props.changeQuiz();
        setAnswerGif("");
      }, 3000);
    } else if (props.name !== props.answer) {
      es_wrong.play();
      setAnswerGif(gif[1]);
      setAnswerText(text[1]);
      setAnswerBoxStyle(boxStyle[1]);
      setTimeout(() => {
        props.closeCard();
        setAnswerGif("");
      }, 3000);
    }
  }, [imageLoadState]);

  return (
    <>
      <div className="absolute top-0 grid w-screen h-screen">
        <div className="relative grid items-center self-center h-3/4">
          {!isOpened && (
            <img className={closedBoxSytle} src={closedBox} alt="img" />
          )}
          {isOpened && (
            <>
              <img
                className="absolute w-[42rem] left-1/2 -ml-[21rem] mt-2"
                src={openedBox}
                alt="img"
              />
              <div className="absolute bottom-0 z-10 w-1/2 -left-20">
                <img className="w-4/5 mx-auto -mb-5" src={answerGif} alt="" />
                <div className="text-center whitespace-nowrap">
                  <span className={answeBoxStyle}>{answerText}</span>
                </div>
              </div>
              <div
                className={`${
                  imageLoadState ? "animate-scale-up-center" : "hidden"
                } absolute grid grid-rows-4 -ml-40 overflow-hidden shadow-lg bg-mainPink-200 justify-items-center h-80 rounded-3xl w-80 shadow-mainBlack left-1/2`}
              >
                <div className="grid self-end row-span-3">
                  <div
                    className="overflow-hidden border h-52 w-60 bg-mainWhite border-mainWhite"
                    style={{
                      backgroundImage: `url(${props.image})`,
                      backgroundSize: "15rem 13rem",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <BackgroundImageOnLoad
                      src={`${props.image}`}
                      onLoadBg={() => setImageLoadState(true)}
                    />
                  </div>
                </div>
                <div className="grid self-center row-span-1 text-5xl font-bold font-netmarbleB">
                  <div className="">{props.name}</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

AnswerCard.propTypes = {
  //   second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerCard);
