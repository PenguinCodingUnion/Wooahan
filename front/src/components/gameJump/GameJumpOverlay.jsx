import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GameStatus } from "util/Enums.ts";
import { useDispatch, useSelector } from "react-redux";
import CommonOverlay from "components/common/CommonOverlay";
import { jumpActions } from "store/features/jump/jumpSlice";
import { Navigate } from "react-router-dom";
import { commonActions } from "store/features/common/commonSlice";
import WarningComponent from "components/common/WarningComponent";
import JumpTutorial from "./JumpTutorial";

const GameJumpOverlay = ({ startGame, ...props }) => {
  const gameStatus = useSelector((state) => state.jump.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameStatus === GameStatus.GAME_START) {
      dispatch(jumpActions.setAction(0));
    }
  }, [gameStatus, dispatch]);

  return (() => {
    switch (gameStatus) {
      case GameStatus.GAME_READY:
        return (
          <CommonOverlay>
            <GameReadyContainer startGame={startGame} />
          </CommonOverlay>
        );

      case GameStatus.GAME_START:
        return <GameStartContainer startGame={startGame} />;

      case GameStatus.GAME_END:
        return <CommonOverlay></CommonOverlay>;

      default:
        return <div></div>;
    }
  })();
};

const GameStartContainer = () => {
  const warning = useSelector((state) => state.common.warning);
  const dispatch = useDispatch();
  const warn = () => {
    dispatch(commonActions.setWarning());
  };
  return (
    <CommonOverlay type="parent">
      <div className={`absolute flex flex-col justify-between h-full w-full`}>
        {" "}
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
        {warning && <WarningComponent />}
      </div>
    </CommonOverlay>
  );
};

const GameReadyContainer = ({ startGame, ...props }) => {
  const [isTutorial, setIstutorial] = useState(true);
  const closeTutorial = () => {
    setIstutorial(false);
  };
  return (
    // <>
    //   <CommonOverlay>
    <>
    {isTutorial && <JumpTutorial closeTutorial={closeTutorial}/>}
    <div className={`absolute flex flex-col justify-between h-full w-full`}>
      <div
        className={`border-4 border-indigo-600 rounded-2xl w-3/4 p-4 m-8 mx-auto bg-mainWhite z-50`}
      >
        <h2 className={`text-center font-MaplestoryLight text-4xl`}>
          띄어쓰기에 맞게 점프하세요
        </h2>
      </div>
      <div
        className={`w-2/4 p-4 m-8 mx-auto`}
        onClick={() => {
          startGame();
        }}
      >
        <h1
          className={`text-6xl text-center font-MaplestoryBold text-mainIndigo-600`}
          style={{
            textShadow: `2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff`,
          }}
        >
          시 작 !
        </h1>
      </div>
    </div>
    </>
  );
};

GameJumpOverlay.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default GameJumpOverlay;
