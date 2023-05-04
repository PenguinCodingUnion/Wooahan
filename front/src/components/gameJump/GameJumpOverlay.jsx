import React from "react";
import PropTypes from "prop-types";
import { GameStatus } from "util/Enums.ts";
import { useSelector } from "react-redux";
import CommonOverlay from "components/common/CommonOverlay";

const GameJumpOverlay = ({ startGame, ...props }) => {
  const gameStatus = useSelector((state) => state.gameStatus.status);

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

      default:
        return <div></div>;
    }
  })();
};

const GameStartContainer = () => {
  return (
    <div className={`absolute flex flex-col justify-between h-full w-full`}>
      {/* <div className={`w-4/4 p-4 mx-auto z-50`}>
        <h1 className={`text-center font-bold text-5xl`}>
          개구리가 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;폴짝폴짝
          &nbsp;&nbsp;&nbsp;뛰어요
        </h1>
      </div> */}
    </div>
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
