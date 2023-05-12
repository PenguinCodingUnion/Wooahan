import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { GameStatus } from "util/Enums.ts";
import { useDispatch, useSelector } from "react-redux";
import CommonOverlay from "components/common/CommonOverlay";
import { jumpActions } from "store/features/jump/jumpSlice";
import { Navigate } from "react-router-dom";

const GameJumpOverlay = ({ startGame, ...props }) => {
  const gameStatus = useSelector((state) => state.gameStatus.status);
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
  const [exit, setExit] = useState(false);
  const [warning, setWarning] = useState(<></>);
  const close = () => {
    setExit(true);
  };
  const back = () => {
    setWarning(<></>);
  };
  const warn = () => {
    setWarning(
      <CommonOverlay>
        <div
          className={`absolute top-1/2 left-1/2 bg-white -mt-[5.5rem] -ml-[9rem] h-44 w-72  rounded-lg z-[99999998] `}
        >
          <div className="font-MaplestoryBold">
            <p className="mt-8 text-4xl text-center">홈으로 나갈까요?</p>
            <div className="mt-5 flex col-span-2">
              <div
                onClick={() => {
                  close();
                }}
                className="bg-lightGray rounded-xl w-16 text-3xl h-12 leading-[3rem] mx-auto "
              >
                <p className="text-center">네</p>
              </div>
              <div
                onClick={() => {
                  back();
                }}
                className="bg-mainYellow-300 rounded-xl w-28 text-3xl h-12 leading-[3rem] mx-auto"
              >
                <p className="text-center">아니요</p>
              </div>
            </div>
          </div>
        </div>
      </CommonOverlay>
    );
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
        {warning}
        {exit && <Navigate to={`/main`} />}
      </div>
    </CommonOverlay>
  );
};

const GameReadyContainer = ({ startGame, ...props }) => {
  return (
    // <>
    //   <CommonOverlay>
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
  );
};

GameJumpOverlay.propTypes = {
  startGame: PropTypes.func.isRequired,
};

export default GameJumpOverlay;
