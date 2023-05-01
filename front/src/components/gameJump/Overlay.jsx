import React from "react";
import PropTypes from "prop-types";
import { GameStatus } from "util/Enums.ts";
import { useSelector } from "react-redux";

const Overlay = ({ startGame, ...props }) => {
  const gameStatus = useSelector((state) => state.gameStatus.status);

  return (
    <div className={`absolute h-full w-full`}>
      {(() => {
        switch (gameStatus) {
          case GameStatus.GAME_READY:
            return <GameReadyContainer startGame={startGame} />;

          case GameStatus.GAME_START:
            return <GameStartContainer startGame={startGame} />;

          default:
            return <div></div>;
        }
      })()}
    </div>
  );
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
    <>
      <div className={OVERLAY_CLASS}></div>

      <div className={`absolute flex flex-col justify-between h-full w-full`}>
        <div
          className={`border-4 border-indigo-600 rounded-2xl w-2/4 p-4 m-8 mx-auto bg-white z-50`}
        >
          <h2 className={`text-center font-bold`}>
            띄어쓰기에 맞게 점프하세요.
          </h2>
        </div>
        <div
          className={`w-2/4 p-4 m-8 mx-auto`}
          onClick={() => {
            startGame();
          }}
        >
          <h1 className={`text-6xl text-center font-bold text-indigo-600`}>
            시 작 !
          </h1>
        </div>
      </div>
    </>
  );
};

Overlay.propTypes = {
  startGame: PropTypes.func.isRequired,
};

const OVERLAY_CLASS = `absolute h-full w-full mix-blend-multiply bg-slate-300`;

export default Overlay;
