import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import correct from "assets/sounds/correct.wav";
import wrong from "assets/sounds/wrong.wav";
import openedSeashell from "assets/images/bubble/opened_seashell.png";
import closedSeashell from "assets/images/bubble/closed_seashell.png";
import effectSound from 'util/effectSound';

export const AnswerCard = (props) => {
  const [isOpened, setIsOpened] = useState(false);

  const es_correct = effectSound(correct, 1);
  const es_wrong = effectSound(wrong, 1);

  useEffect(() => {
    setTimeout(() => {
      setIsOpened(true);
    }, 500);
    if (props.name === props.answer) {
      es_correct.play();
      setTimeout(() => {
        props.closeCard();
        props.changeQuiz();
      }, 3000);
    } else if (props.name !== props.answer) {
      es_wrong.play();
      setTimeout(() => {
        props.closeCard();
      }, 3000);
    }
  }, [props]);

  return (
    <>
      <div className="grid w-screen h-screen">
        <div className="relative grid items-center self-center h-3/4">
          {!isOpened && (
            <img
              className="absolute w-[36rem] left-1/2 -ml-[18rem] top-1/4"
              src={closedSeashell}
              alt="img"
            />
          )}
          {isOpened && (
            <>
              <img
                className="absolute w-[42rem] left-1/2 -ml-[21rem] mt-2"
                src={openedSeashell}
                alt="img"
              />
              <div className="absolute grid grid-rows-4 -ml-40 overflow-hidden shadow-lg bg-mainPink-200 justify-items-center h-80 rounded-3xl w-80 shadow-mainBlack left-1/2">
                <div className="grid self-end row-span-3">
                  <div
                    className="overflow-hidden border h-52 w-60 bg-mainWhite border-mainWhite"
                    style={{
                      backgroundImage: `url(${props.image})`,
                      backgroundSize: "15rem 13rem",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
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
